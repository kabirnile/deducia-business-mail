import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { BusinessWizard } from '@/components/mail/business-wizard'

export const metadata: Metadata = {
  title: 'Set up business email',
  description:
    'Connect your custom domain to Deducia Mail. Register your domain, configure DNS, verify propagation, and create your first branded mailbox in minutes.',
  openGraph: {
    title: 'Deducia Mail Business — Set up your custom domain',
    description:
      'Register your domain, configure DNS, verify propagation, and create your first branded mailbox.',
    url: 'https://deducia.com/mail/business',
  },
}

export default function BusinessOnboardingPage() {
  return (
    <>
      <SiteNav />
      <main className="relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <section className="container-page relative py-20 md:py-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
              Deducia Mail Business
            </p>
            <h1 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Bring your domain. Launch company email in minutes.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Register your domain, add four DNS records, verify propagation live, and create your
              first branded mailbox — all in one guided flow.
            </p>
          </div>
          <BusinessWizard />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
