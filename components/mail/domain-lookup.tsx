'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowRight, Building2, RefreshCw, Search } from 'lucide-react'

export function DomainLookup() {
  const router = useRouter()
  const [domainInput, setDomainInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setNotFound(null)
    const clean = domainInput.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')

    if (!clean || !clean.includes('.') || clean.length > 253) {
      setError('Please enter a valid domain (e.g. keens.cloud).')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/business/check-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: clean }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to find that organization.')
      if (data.exists && data.signupUrl) router.push(data.signupUrl)
      else setNotFound(clean)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to find that organization.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
          <Building2 className="h-3.5 w-3.5" aria-hidden="true" /> Team member portal
        </div>
        <h2 className="mt-6 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Already have a company domain connected?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          Enter your company domain to jump directly to your organization&apos;s custom mailbox registration portal.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-7 max-w-lg">
          <div className="flex overflow-hidden rounded-2xl border border-border bg-background/70 shadow-inner focus-within:border-brand">
            <div className="flex items-center pl-4 text-muted-foreground" aria-hidden="true"><Search className="h-4 w-4" /></div>
            <label htmlFor="domain-lookup" className="sr-only">Company domain</label>
            <input
              id="domain-lookup"
              type="text"
              required
              value={domainInput}
              onChange={(event) => setDomainInput(event.target.value)}
              placeholder="e.g. keens.cloud or yourcompany.com"
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> : <>Find portal <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
            </button>
          </div>
          {error && <p role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-left text-xs text-destructive">{error}</p>}
          {notFound && (
            <div role="status" className="mt-4 flex items-start gap-3 rounded-xl border border-brand/30 bg-brand/10 p-4 text-left text-xs text-muted-foreground">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <div><span className="font-semibold text-foreground">{notFound}</span> is not registered on Deducia Mail yet.{' '}<Link className="font-medium text-brand underline hover:opacity-80" href="/mail/business">Connect this domain as an admin →</Link></div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
