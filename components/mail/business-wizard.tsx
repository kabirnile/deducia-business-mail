'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  RefreshCw,
  Rocket,
  ShieldCheck,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type DnsRecord = {
  type: string
  host: string
  value: string
  priority?: number
}

const STEPS = [
  { id: 1, label: 'Organization & Domain' },
  { id: 2, label: 'Configure DNS Records' },
  { id: 3, label: 'Verify & Authenticate' },
  { id: 4, label: 'Create First Mailbox' },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1400)
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
      aria-label={`Copy ${value}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

function CheckRow({
  label,
  state,
}: {
  label: string
  state: 'idle' | 'checking' | 'ok' | 'fail'
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
      <span className="text-sm text-foreground">{label}</span>
      {state === 'checking' && <Loader2 className="h-4 w-4 animate-spin text-brand" />}
      {state === 'idle' && (
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Pending</span>
      )}
      {state === 'ok' && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand">
          <Check className="h-4 w-4" /> Verified
        </span>
      )}
      {state === 'fail' && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
          <X className="h-4 w-4" /> Not found
        </span>
      )}
    </div>
  )
}

export function BusinessWizard() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Step 1
  const [orgName, setOrgName] = useState('')
  const [domain, setDomain] = useState('')
  const [adminName, setAdminName] = useState('')

  // Result of registration
  const [cleanDomain, setCleanDomain] = useState('')
  const [domainId, setDomainId] = useState('')
  const [records, setRecords] = useState<DnsRecord[]>([])

  // Step 3
  const [mxState, setMxState] = useState<'idle' | 'checking' | 'ok' | 'fail'>('idle')
  const [spfState, setSpfState] = useState<'idle' | 'checking' | 'ok' | 'fail'>('idle')
  const [routeState, setRouteState] = useState<'idle' | 'checking' | 'ok' | 'fail'>('idle')
  const [verified, setVerified] = useState(false)

  // Step 4
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [createdEmail, setCreatedEmail] = useState('')

  const teamLink = cleanDomain ? `https://deducia.com/mail/signup/${cleanDomain}` : ''

  async function connectDomain() {
    setError('')
    if (!orgName.trim() || !domain.trim() || !adminName.trim()) {
      setError('Please complete every field to continue.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/business/domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, orgName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to register domain.')
      setCleanDomain(data.domain)
      setDomainId(data.domainId)
      setRecords(data.records || [])
      setStep(2)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function verifyDns() {
    setError('')
    setVerified(false)
    setMxState('checking')
    setSpfState('checking')
    setRouteState('checking')
    setLoading(true)
    try {
      const res = await fetch('/api/business/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: cleanDomain }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'DNS check failed.')
      const mxOk = !!data.checks?.mx
      const spfOk = !!data.checks?.spf
      setMxState(mxOk ? 'ok' : 'fail')
      setSpfState(spfOk ? 'ok' : 'fail')
      setRouteState(mxOk && spfOk ? 'ok' : 'fail')
      setVerified(!!data.verified)
      if (!data.verified) setError(data.message)
    } catch (err: any) {
      setMxState('fail')
      setSpfState('fail')
      setRouteState('fail')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function createMailbox() {
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/business/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, domain: cleanDomain, domainId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create account.')
      setCreatedEmail(data.email)
      setDone(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Progress bar */}
      <ol className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STEPS.map((s) => {
          const active = step === s.id
          const complete = step > s.id
          return (
            <li key={s.id} className="flex flex-col gap-2">
              <div
                className={cn(
                  'h-1 rounded-full transition-colors duration-500',
                  active || complete ? 'bg-brand' : 'bg-border',
                )}
              />
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold',
                    complete
                      ? 'bg-brand text-brand-foreground'
                      : active
                        ? 'bg-brand/15 text-brand ring-1 ring-brand'
                        : 'bg-muted text-muted-foreground',
                  )}
                >
                  {complete ? <Check className="h-3 w-3" /> : s.id}
                </span>
                <span
                  className={cn(
                    'text-xs leading-tight',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {s.label}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-medium text-foreground">Organization & domain</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us who you are and the domain you want to send and receive mail from.
              </p>
            </div>
            <div className="grid gap-4">
              <Field label="Company name">
                <input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Acme Inc."
                  className={inputClass}
                />
              </Field>
              <Field label="Desired custom domain">
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="mycompany.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Admin full name">
                <input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Jordan Lee"
                  className={inputClass}
                />
              </Field>
            </div>
            {error && <ErrorNote message={error} />}
            <PrimaryButton onClick={connectDomain} loading={loading}>
              Connect domain
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-medium text-foreground">Configure DNS records</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add these 4 DNS records at your domain registrar (Cloudflare, GoDaddy, Namecheap,
                Hostinger). Then check status.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="hidden grid-cols-[64px_72px_1fr_auto] gap-3 border-b border-border bg-muted/40 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:grid">
                <span>Type</span>
                <span>Host</span>
                <span>Value</span>
                <span>Copy</span>
              </div>
              {records.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 gap-2 border-b border-border px-4 py-3 last:border-0 sm:grid-cols-[64px_72px_1fr_auto] sm:items-center sm:gap-3"
                >
                  <span className="inline-flex w-fit items-center rounded-md bg-brand/10 px-2 py-0.5 font-mono text-xs text-brand">
                    {r.type}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{r.host}</span>
                  <span className="flex items-center gap-2 break-all font-mono text-xs text-foreground">
                    {r.value}
                    {r.priority !== undefined && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        prio {r.priority}
                      </span>
                    )}
                  </span>
                  <div className="flex justify-start sm:justify-end">
                    <CopyButton value={r.value} />
                  </div>
                </div>
              ))}
            </div>

            {error && <ErrorNote message={error} />}
            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <PrimaryButton onClick={() => setStep(3)} loading={false}>
                I&apos;ve added these records
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton onClick={() => setStep(1)}>Back</GhostButton>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-medium text-foreground">Verify & authenticate</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We run live DNS lookups against{' '}
                <span className="font-mono text-foreground">{cleanDomain}</span> to confirm
                propagation.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <CheckRow label="MX record routing" state={mxState} />
              <CheckRow label="SPF authentication" state={spfState} />
              <CheckRow label="Mail delivery path" state={routeState} />
            </div>

            {verified && (
              <div className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
                <ShieldCheck className="h-4 w-4" />
                Domain DNS successfully authenticated!
              </div>
            )}
            {error && !verified && <ErrorNote message={error} />}

            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              {verified ? (
                <PrimaryButton onClick={() => setStep(4)} loading={false}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={verifyDns} loading={loading}>
                  <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
                  Verify DNS now
                </PrimaryButton>
              )}
              <GhostButton onClick={() => setStep(2)}>Back</GhostButton>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && !done && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-medium text-foreground">Create your first mailbox</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                This becomes your admin account on{' '}
                <span className="font-mono text-foreground">{cleanDomain}</span>.
              </p>
            </div>

            <Field label="Email address">
              <div className="flex items-stretch overflow-hidden rounded-lg border border-border focus-within:border-brand">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <span className="flex items-center border-l border-border bg-muted/50 px-3 font-mono text-sm text-muted-foreground">
                  @{cleanDomain}
                </span>
              </div>
            </Field>
            <Field label="Set account password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className={inputClass}
              />
            </Field>
            <Field label="Confirm password">
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                className={inputClass}
              />
            </Field>

            {error && <ErrorNote message={error} />}
            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <PrimaryButton onClick={createMailbox} loading={loading}>
                Launch my custom webmail
                <Rocket className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton onClick={() => setStep(3)}>Back</GhostButton>
            </div>
          </div>
        )}

        {/* Success */}
        {done && (
          <div className="flex flex-col items-center gap-5 py-4 text-center">
            <div className="flex h-16 w-16 animate-[pulse_1.2s_ease-in-out_infinite] items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/40">
              <Check className="h-8 w-8 text-brand" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground">Your workspace is live</h2>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                <span className="font-mono text-foreground">{createdEmail}</span> is ready. Share
                the link below so your team can self-provision their own mailboxes.
              </p>
            </div>

            {/* Shareable team registration link */}
            <div className="w-full max-w-md text-left">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Team registration link
              </span>
              <div className="flex items-stretch gap-2">
                <div className="flex min-w-0 flex-1 items-center rounded-lg border border-border bg-muted/40 px-3.5 py-2.5">
                  <span className="truncate font-mono text-xs text-foreground">{teamLink}</span>
                </div>
                <CopyButton value={teamLink} />
              </div>
            </div>

            <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <a
                href="https://mail.deducia.com"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:-translate-y-px"
              >
                Launch webmail
                <Rocket className="h-4 w-4" />
              </a>
              <a
                href={teamLink}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                Open signup portal
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
      {message}
    </p>
  )
}

function PrimaryButton({
  children,
  onClick,
  loading,
}: {
  children: React.ReactNode
  onClick: () => void
  loading: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  )
}

function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {children}
    </button>
  )
}
