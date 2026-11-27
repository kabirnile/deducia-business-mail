import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MailHero } from '@/components/mail/mail-hero'
import { MailDashboard } from '@/components/mail/mail-dashboard'
import { MailFeatures } from '@/components/mail/mail-features'
import { HowItWorks } from '@/components/mail/how-it-works'
import { MailInfra } from '@/components/mail/mail-infra'
import { MailSecurity } from '@/components/mail/mail-security'
import { MailPricingCta, MailFinalCta } from '@/components/mail/mail-cta'

export const metadata: Metadata = {
  title: 'Mail — Business email, built differently',
  description:
    'Deducia Mail is professional email infrastructure for modern businesses. Connect your domain, create branded mailboxes, and manage communication from one place.',
  openGraph: {
    title: 'Deducia Mail — Business email, built differently',
    description:
      'Professional email infrastructure for modern businesses. Connect your domain, create branded mailboxes, and manage communication from one place.',
    url: 'https://deducia.com/mail',
  },
}

export default function MailPage() {
  return (
    <>
      <SiteNav />
      <main>
        <MailHero />
        <MailDashboard />
        <MailFeatures />
        <HowItWorks />
        <MailInfra />
        <MailSecurity />
        <MailPricingCta />
        <MailFinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
