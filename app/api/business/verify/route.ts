import { NextResponse } from 'next/server'
import { promises as dns } from 'dns'

export async function POST(req: Request) {
  try {
    const { domain } = await req.json()
    const cleanDomain = String(domain || '')
      .toLowerCase()
      .trim()
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '')

    if (!cleanDomain || !cleanDomain.includes('.') || cleanDomain.length > 253) {
      return NextResponse.json({ error: 'Please provide a valid domain name.' }, { status: 400 })
    }

    let mxValid = false
    let spfValid = false

    // 1. Verify MX Record
    try {
      const mxRecords = await dns.resolveMx(cleanDomain)
      mxValid = mxRecords.some(
        (r) =>
          r.exchange.toLowerCase().includes('deducia.com') ||
          r.exchange.toLowerCase().includes('email'),
      )
    } catch {
      mxValid = false
    }

    // 2. Verify SPF TXT Record
    try {
      const txtRecords = await dns.resolveTxt(cleanDomain)
      const flattened = txtRecords.map((chunk) => chunk.join(''))
      spfValid = flattened.some(
        (txt) => txt.includes('v=spf1') && (txt.includes('deducia') || txt.includes('mx')),
      )
    } catch {
      spfValid = false
    }

    const allConfigured = mxValid && spfValid

    return NextResponse.json({
      domain: cleanDomain,
      verified: allConfigured,
      checks: {
        mx: mxValid,
        spf: spfValid,
      },
      message: allConfigured
        ? 'Domain DNS successfully authenticated!'
        : 'DNS records not fully detected yet. Please allow up to 5 minutes for propagation.',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'DNS check failed.' }, { status: 500 })
  }
}
