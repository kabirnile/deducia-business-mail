import { Reveal } from '@/components/reveal'

const chain = [
  { label: 'Domain', note: 'your identity' },
  { label: 'DNS', note: 'records' },
  { label: 'MX', note: 'routing' },
  { label: 'Mail server', note: 'processing' },
  { label: 'Inbox', note: 'delivery' },
]

const protocols = ['SMTP', 'IMAP', 'DKIM', 'SPF', 'DMARC', 'TLS']

export function MailInfra() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container-page py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            Infrastructure
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Your domain. Your identity.
            <br />
            <span className="text-muted-foreground">Your infrastructure.</span>
          </h2>
        </Reveal>

        {/* pipeline */}
        <Reveal delay={100} className="mt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {chain.map((node, i) => (
              <div key={node.label} className="flex flex-1 items-center gap-3 md:flex-col md:gap-0">
                <div className="flex w-full flex-1 flex-col justify-center rounded-xl border border-border bg-background p-5">
                  <span className="text-base font-medium tracking-tight">
                    {node.label}
                  </span>
                  <span className="mt-1 font-mono text-xs text-muted-foreground">
                    {node.note}
                  </span>
                </div>
                {i < chain.length - 1 ? (
                  <span className="font-mono text-muted-foreground md:my-2 md:rotate-90">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        {/* for developers */}
        <Reveal delay={150} className="mt-14">
          <div className="grid gap-8 rounded-2xl border border-border bg-background p-8 md:grid-cols-[1fr_1.2fr] md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand">
                For developers
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                Standard protocols, no surprises.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Connect over the protocols you already know. Authentication and
                alignment are configured and verified for you — so mail lands in
                the inbox, not the spam folder.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {protocols.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card/60 font-mono text-xs">
              <div className="border-b border-border px-4 py-2.5 text-muted-foreground">
                smtp · send
              </div>
              <div className="space-y-1.5 p-5 leading-relaxed text-muted-foreground">
                <p><span className="text-brand">host</span> smtp.deducia.com</p>
                <p><span className="text-brand">port</span> 587 · STARTTLS</p>
                <p><span className="text-brand">auth</span> mailbox@acme.com</p>
                <p className="pt-2 text-foreground/80">→ 250 message queued</p>
                <p className="text-foreground/80">→ 250 delivered · dkim=pass</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
