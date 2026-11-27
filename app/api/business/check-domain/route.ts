import { NextResponse } from 'next/server'

function normalizeDomain(value: unknown) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '')
}

export async function POST(req: Request) {
  try {
    const { domain } = await req.json()
    const cleanDomain = normalizeDomain(domain)

    if (!cleanDomain || !cleanDomain.includes('.') || cleanDomain.length > 253) {
      return NextResponse.json(
        { error: 'Please enter a valid domain name (e.g. acme.com).' },
        { status: 400 },
      )
    }

    const STALWART_URL = (process.env.STALWART_URL || 'https://email.deducia.com').replace(/\/$/, '')
    const ADMIN_USER = process.env.STALWART_ADMIN_USER || 'admin@deducia.com'
    const ADMIN_PASS = process.env.STALWART_ADMIN_PASS || ''
    const authHeader = `Basic ${Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64')}`
    const lookupBody = {
      using: ['urn:ietf:params:jmap:core', 'urn:stalwart:jmap'],
      methodCalls: [['x:Domain/get', { ids: null }, 'get_all_domains']],
    }

    let domainList: Array<{ name?: string }> = []
    let querySuccess = false

    for (const endpoint of [`${STALWART_URL}/jmap`, `${STALWART_URL}/api`]) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: authHeader },
          body: JSON.stringify(lookupBody),
          cache: 'no-store',
        })
        if (response.status === 404) continue
        if (response.status === 401) {
          return NextResponse.json({ error: 'Mail server authentication failed.' }, { status: 401 })
        }
        const data = await response.json()
        const result = data?.methodResponses?.find((method: unknown[]) => method[2] === 'get_all_domains')?.[1]
        if (Array.isArray(result?.list)) {
          domainList = result.list
          querySuccess = true
          break
        }
      } catch {
        continue
      }
    }

    if (!querySuccess) {
      return NextResponse.json({ error: 'Mail server unreachable.' }, { status: 502 })
    }

    const exists = domainList.some((item) => String(item.name || '').toLowerCase() === cleanDomain)
    return NextResponse.json({
      exists,
      domain: cleanDomain,
      ...(exists
        ? { signupUrl: `/mail/signup/${cleanDomain}` }
        : { message: 'This domain is not registered on Deducia Mail yet.' }),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 },
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
