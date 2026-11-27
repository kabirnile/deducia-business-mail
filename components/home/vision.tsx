import { Reveal } from '@/components/reveal'

export function Vision() {
  return (
    <section id="vision" className="container-page py-32 md:py-48">
      <Reveal className="mx-auto max-w-4xl">
        <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          The internet is becoming more intelligent.
          <br />
          <span className="text-muted-foreground">
            We&apos;re building the systems behind it.
          </span>
        </h2>
      </Reveal>
    </section>
  )
}
