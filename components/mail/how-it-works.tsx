

import { Reveal } from '@/components/reveal'

const steps = [
  {
    n: '01',
    title: 'Connect your domain',
    desc: 'Point a few DNS records — we guide you through it and verify MX, SPF, DKIM and DMARC automatically.',
  },
  {
    n: '02',
    title: 'Create your mailboxes',
    desc: 'Add branded mailboxes for people and teams, organized into groups with the roles you need.',
  },
  {
    n: '03',
    title: 'Start sending and receiving',
    desc: 'Use the modern webmail, or connect any client over SMTP and IMAP. Delivery is handled for you.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-page py-24 md:py-36">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          How it works
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          Live in three steps.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 100} className="h-full">
            <div className="flex h-full flex-col bg-background p-8 md:p-10">
              <span className="font-mono text-5xl font-semibold tracking-tight text-muted-foreground/40 md:text-6xl">
                {step.n}
              </span>
              <h3 className="mt-10 text-xl font-semibold tracking-tight md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
