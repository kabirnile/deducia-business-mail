import { Reveal } from '@/components/reveal'
import { MailFlow } from '@/components/visuals/mail-flow'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function MailFeature() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container-page py-24 md:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-brand">
              Featured · Deducia Mail
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Email infrastructure, without the infrastructure headache.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Modern business email for your own domain. Connect a domain, create
              branded mailboxes, and manage every message from one calm,
              well-engineered place — deliverability handled for you.
            </p>
            <Link
              href="/mail"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Explore Mail
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <MailFlow />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
