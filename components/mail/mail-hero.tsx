import { MailFlow } from '@/components/visuals/mail-flow'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function MailHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.3] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="container-page relative pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="reveal is-visible inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Deducia Mail
          </span>
          <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Business email, built differently.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Professional email infrastructure for modern businesses. Connect your
            domain, create branded mailboxes, and manage communication from one
            place.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="/mail/business"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              See how it works
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <MailFlow />
        </div>
      </div>
    </section>
  )
}
