import { Reveal } from '@/components/reveal'

export function Positioning() {
  return (
    <section id="trust" className="border-y border-border">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Built in India.
              <br />
              <span className="text-muted-foreground">Designed for the world.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              We engineer systems that hold up under real scale — resilient,
              secure and fast. The same infrastructure standards that power global
              platforms, built from the ground up for teams everywhere.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {[
            { k: 'Multi-region', v: 'Global by default' },
            { k: 'API-first', v: 'Programmable everything' },
            { k: 'Secure', v: 'Encryption end to end' },
            { k: 'Reliable', v: 'Engineered to endure' },
          ].map((item) => (
            <div key={item.k} className="bg-background p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-brand">
                {item.k}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{item.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
