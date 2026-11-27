import { Reveal } from '@/components/reveal'
import { Fingerprint, KeyRound, Lock, ShieldCheck } from 'lucide-react'

const items = [
  {
    title: 'TLS encryption',
    desc: 'Mail is encrypted in transit with modern TLS between servers and clients.',
    icon: Lock,
  },
  {
    title: 'SPF · DKIM · DMARC',
    desc: 'Sender authentication configured and verified to protect your domain.',
    icon: ShieldCheck,
  },
  {
    title: 'Secure access',
    desc: 'Authenticated access to every mailbox with granular administrative control.',
    icon: KeyRound,
  },
  {
    title: 'Domain verification',
    desc: 'Ownership verified before any mail is sent or received on your behalf.',
    icon: Fingerprint,
  },
]

export function MailSecurity() {
  return (
    <section id="security" className="container-page py-24 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            Security
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Built with security in mind.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Authentication, encryption and domain verification are part of the
            foundation — not an add-on. The defaults are the secure ones.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={(i % 2) * 90}>
                <div className="h-full bg-background p-7 md:p-8">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
