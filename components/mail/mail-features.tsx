import { Reveal } from '@/components/reveal'
import {
  AtSign,
  Boxes,
  Building2,
  Download,
  Globe,
  Inbox,
  Mail,
  Send,
  Server,
  Settings2,
  Shield,
  Zap,
} from 'lucide-react'

const features = [
  { name: 'Custom domain email', desc: 'Send and receive from your own domain in minutes.', icon: AtSign },
  { name: 'Branded mailboxes', desc: 'Professional addresses for every person and team.', icon: Mail },
  { name: 'Multiple mailboxes', desc: 'Provision and manage mailboxes at any scale.', icon: Boxes },
  { name: 'Modern webmail', desc: 'A fast, focused inbox that stays out of the way.', icon: Inbox },
  { name: 'Domain management', desc: 'DNS and records guided and verified for you.', icon: Globe },
  { name: 'SMTP support', desc: 'Standard SMTP for sending from any client or app.', icon: Send },
  { name: 'IMAP support', desc: 'Sync your mail across every device with IMAP.', icon: Download },
  { name: 'Reliable sending', desc: 'High-throughput delivery engineered for volume.', icon: Zap },
  { name: 'Message receiving', desc: 'Robust inbound routing with clean handling.', icon: Server },
  { name: 'Security built in', desc: 'Authentication and encryption on by default.', icon: Shield },
  { name: 'Deliverability', desc: 'Reputation and alignment managed for the inbox.', icon: Settings2 },
  { name: 'Business admin', desc: 'Roles, groups and controls for the whole org.', icon: Building2 },
]

export function MailFeatures() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="container-page py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            Capabilities
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Everything a business inbox needs.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.name} delay={(i % 3) * 80}>
                <div className="group">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-medium tracking-tight">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
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
