import { Reveal } from '@/components/reveal'
import {
  AtSign,
  FileText,
  Inbox,
  Search,
  Send,
  Settings,
  Star,
  Users,
} from 'lucide-react'

const folders = [
  { label: 'Inbox', icon: Inbox, count: 12, active: true },
  { label: 'Sent', icon: Send },
  { label: 'Drafts', icon: FileText, count: 2 },
  { label: 'Contacts', icon: Users },
]

const admin = [
  { label: 'Domains', icon: AtSign },
  { label: 'Mailboxes', icon: Users },
  { label: 'Settings', icon: Settings },
]

const messages = [
  {
    from: 'Priya Menon',
    initials: 'PM',
    subject: 'Q3 infrastructure review',
    preview: 'Sharing the deck ahead of tomorrow — the migration numbers look…',
    time: '9:41',
    unread: true,
    starred: true,
  },
  {
    from: 'Deducia Mail',
    initials: 'DM',
    subject: 'Domain acme.com is verified',
    preview: 'Your MX, SPF, DKIM and DMARC records are aligned. You can now…',
    time: '8:12',
    unread: true,
  },
  {
    from: 'Arjun Rao',
    initials: 'AR',
    subject: 'Re: Onboarding the design team',
    preview: 'Added five new mailboxes under the studio group. Let me know if…',
    time: 'Yesterday',
  },
  {
    from: 'Billing',
    initials: 'B',
    subject: 'Your monthly usage summary',
    preview: '42,180 messages delivered · 100% inbox placement across regions.',
    time: 'Yesterday',
  },
  {
    from: 'Sana Kapoor',
    initials: 'SK',
    subject: 'Press list for launch',
    preview: 'Draft ready for review — sending from press@acme.com once you…',
    time: 'Mon',
  },
]

export function MailDashboard() {
  return (
    <section className="container-page py-24 md:py-32">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          The product
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          A calm, modern inbox for your whole company.
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card/50 shadow-2xl shadow-black/40">
          {/* top bar */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
            </div>
            <div className="ml-2 flex max-w-md flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span>Search mail</span>
            </div>
            <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-medium text-brand-foreground">
              AC
            </div>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[220px_340px_1fr]">
            {/* sidebar */}
            <aside className="hidden border-r border-border p-4 md:block">
              <button className="mb-5 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                Compose
              </button>
              <nav className="space-y-1">
                {folders.map((f) => {
                  const Icon = f.icon
                  return (
                    <div
                      key={f.label}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                        f.active
                          ? 'bg-accent text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{f.label}</span>
                      {f.count ? (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {f.count}
                        </span>
                      ) : null}
                    </div>
                  )
                })}
              </nav>
              <p className="mt-6 px-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Administration
              </p>
              <nav className="mt-2 space-y-1">
                {admin.map((f) => {
                  const Icon = f.icon
                  return (
                    <div
                      key={f.label}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{f.label}</span>
                    </div>
                  )
                })}
              </nav>
            </aside>

            {/* message list */}
            <div className="min-w-0 border-r border-border">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <h3 className="text-sm font-medium">Inbox</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  acme.com
                </span>
              </div>
              <ul>
                {messages.map((m, i) => (
                  <li
                    key={i}
                    className={`flex gap-3 border-b border-border px-5 py-4 ${
                      i === 0 ? 'bg-accent/40' : ''
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-[11px] font-medium text-muted-foreground">
                      {m.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`truncate text-sm ${
                            m.unread ? 'font-semibold text-foreground' : 'text-foreground/80'
                          }`}
                        >
                          {m.from}
                        </span>
                        {m.starred ? (
                          <Star className="h-3 w-3 shrink-0 fill-brand text-brand" />
                        ) : null}
                        <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                          {m.time}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-foreground/80">
                        {m.subject}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {m.preview}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* reading pane */}
            <div className="hidden flex-col p-8 lg:flex">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-medium text-brand-foreground">
                  PM
                </div>
                <div>
                  <p className="text-sm font-medium">Priya Menon</p>
                  <p className="text-xs text-muted-foreground">
                    priya@acme.com · to me
                  </p>
                </div>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-brand">
                  DKIM pass
                </span>
              </div>
              <h4 className="mt-6 text-xl font-semibold tracking-tight">
                Q3 infrastructure review
              </h4>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Hi team,</p>
                <p>
                  Sharing the deck ahead of tomorrow. The migration numbers look
                  strong — inbox placement held at 100% across all six regions and
                  median delivery dropped to 240ms.
                </p>
                <p>
                  I&apos;ve moved the remaining mailboxes to the new domain. Let&apos;s
                  review the deliverability dashboard together in the morning.
                </p>
                <p>Best,<br />Priya</p>
              </div>
              <div className="mt-auto flex gap-2 pt-8">
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Reply
                </button>
                <button className="rounded-md border border-border px-4 py-2 text-sm text-foreground">
                  Forward
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
