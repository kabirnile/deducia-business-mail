import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HeroField } from '@/components/visuals/hero-field'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle background field */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <HeroField className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </div>

      <div className="container-page relative">
        <div className="flex min-h-[92vh] flex-col justify-center pt-28 pb-24">
          <div className="max-w-4xl">
            <span className="reveal is-visible inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Infrastructure company · Est. in India
            </span>

            <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Building the infrastructure for what comes next.
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Deducia builds intelligent software infrastructure that helps
              businesses, developers and creators build, communicate and operate
              at global scale.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="https://signup.mail.deducia.com"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px"
              >
                Explore our products
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
