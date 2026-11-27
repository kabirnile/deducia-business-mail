import { Reveal } from '@/components/reveal'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function MailPricingCta() {
  return (
    <section id="get-started" className="border-y border-border bg-card/30">
      <div className="container-page py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            Get started
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Start building your business inbox.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Bring your domain and set up branded email for your whole team. Talk
            to us about a plan that fits how you work.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="/mail/business"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Contact sales
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function MailFinalCta() {
  return (
    <section className="container-page py-32 md:py-48">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl">
          Your domain deserves a better inbox.
        </h2>
        <div className="mt-12 flex justify-center">
          <a
            href="/mail/business"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
