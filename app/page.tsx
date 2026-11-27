import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { Positioning } from '@/components/home/positioning'
import { Products } from '@/components/home/products'
import { MailFeature } from '@/components/home/mail-feature'
import { Engineering } from '@/components/home/engineering'
import { GlobalSection } from '@/components/home/global'
import { Vision } from '@/components/home/vision'
import { HomeCta } from '@/components/home/cta'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Positioning />
        <Products />
        <MailFeature />
        <Engineering />
        <GlobalSection />
        <Vision />
        <HomeCta />
      </main>
      <SiteFooter />
    </>
  )
}
