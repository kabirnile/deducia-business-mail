'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2, Rocket } from 'lucide-react'
import { LogoMark } from '@/components/logo'

export function SignupPortal({ domain }: { domain: string }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [createdEmail, setCreatedEmail] = useState('')

  async function createMailbox() {
    setError('')
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long.')
      return
    }
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
        body: JSON.stringify({ username, password, domain, domainId: domain }),
      })
      const data = await res.json()
      if (res.status === 409) {
        throw new Error(`This username is already taken on ${domain}.`)
      }
      if (!res.ok) throw new Error(data.error || 'Failed to create mailbox.')
      setCreatedEmail(data.email)
      setDone(true)
      setTimeout(() => {
        window.location.href = data.webmailUrl || 'https://mail.deducia.com'
      }, 2400)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 animate-[pulse_1.2s_ease-in-out_infinite] items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/40">
              <Check className="h-8 w-8 text-brand" />
            </div>
            <h1 className="text-xl font-medium text-foreground">Welcome aboard</h1>
            <p className="max-w-xs text-sm text-muted-foreground">
              <span className="font-mono text-foreground">{createdEmail}</span> is live. Taking you
              to your webmail&hellip;
            </p>
            <Loader2 className="h-5 w-5 animate-spin text-brand" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <LogoMark className="h-9 w-9" />
              <div>
                <h1 className="text-xl font-medium text-balance text-foreground">
                  Join {domain} on Deducia Mail
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create your official company email address
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Desired username</span>
                <div className="flex items-stretch overflow-hidden rounded-lg border border-border focus-within:border-brand">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="firstname"
                    autoComplete="username"
                    className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <span className="flex items-center border-l border-border bg-muted/50 px-3 font-mono text-sm text-muted-foreground">
                    @{domain}
                  </span>
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Confirm password</span>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
                />
              </label>
            </div>

            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={createMailbox}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create mailbox
                  <Rocket className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{' '}
              <a
                href="https://mail.deducia.com/en/login"
                className="inline-flex items-center gap-0.5 text-foreground underline-offset-4 hover:underline"
              >
                Sign in
                <ArrowRight className="h-3 w-3" />
              </a>
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Powered by Deducia Mail · Secured with SPF, DKIM &amp; DMARC
      </p>
    </div>
  )
}
