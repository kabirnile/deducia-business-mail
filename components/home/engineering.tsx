import { Reveal } from '@/components/reveal'
import { Check } from 'lucide-react'

const capabilities = [
  'APIs',
  'Automation',
  'AI',
  'Cloud infrastructure',
  'Developer tools',
  'Secure systems',
  'Scalable architecture',
  'Observability',
]

export function Engineering() {
  return (
    <section id="technology" className="container-page py-24 md:py-36">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            Engineering
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Built for the way software works now.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything is an API. Systems are composable, automated and
            observable by default — designed so teams ship faster without
            trading away reliability or security.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
              >
                {cap}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-xl border border-border bg-card/60 font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-2 text-xs text-muted-foreground">deducia · deploy</span>
            </div>
            <div className="space-y-2 p-5 leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-brand">$</span> deducia deploy --region global
              </p>
              <p className="text-muted-foreground/70">→ building infrastructure graph</p>
              <p className="text-muted-foreground/70">→ provisioning 6 regions</p>
              <p className="text-muted-foreground/70">→ routing traffic · TLS attached</p>
              <p className="flex items-center gap-1.5 text-foreground">
                <Check className="h-3.5 w-3.5 text-brand" />
                live in 2.4s · 0 downtime
              </p>
              <p className="pt-2 text-muted-foreground">
                <span className="text-brand">$</span>{' '}
                <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground/70" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
