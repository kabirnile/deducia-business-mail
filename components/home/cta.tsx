import { Reveal } from '@/components/reveal'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function HomeCta() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="container-page py-24 md:py-36">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card/50 px-8 py-16 md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-20 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="relative max-w-2xl">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Build what&apos;s next.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Explore the products we&apos;re building, or start a conversation with
              the team about what you&apos;re trying to ship.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="https://signup.mail.deducia.com"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px"
              >
                Explore products
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/mail"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
