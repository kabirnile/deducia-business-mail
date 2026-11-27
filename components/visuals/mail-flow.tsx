import { cn } from '@/lib/utils'
import { AtSign, Inbox, Send, Server } from 'lucide-react'

const steps = [
  { label: 'Domain', icon: AtSign },
  { label: 'Mail infra', icon: Server },
  { label: 'Message', icon: Send },
  { label: 'Delivery', icon: Inbox },
]

/**
 * Abstract "domain -> mailbox -> message -> delivery" pipeline.
 * A signal pulse travels along the connecting spine.
 */
export function MailFlow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative w-full rounded-2xl border border-border bg-card/50 p-6 md:p-10',
        className,
      )}
    >
      <div className="grid grid-cols-4 items-center gap-2">
        {/* connecting line */}
        <div className="pointer-events-none absolute inset-x-10 top-1/2 hidden h-px -translate-y-[calc(50%+18px)] md:block">
          <div className="relative h-full w-full bg-border">
            <span className="absolute top-1/2 h-px w-16 -translate-y-1/2 animate-[mailpulse_3.4s_linear_infinite] bg-gradient-to-r from-transparent via-brand to-transparent" />
          </div>
        </div>

        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="relative flex flex-col items-center gap-3 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-brand md:h-14 md:w-14">
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-background p-4 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="text-foreground">MX · acme.com</span>
          <span className="ml-auto text-brand">verified</span>
        </div>
        <div className="mt-3 space-y-1.5 leading-relaxed">
          <p>SPF · DKIM · DMARC aligned</p>
          <p>TLS 1.3 · delivered in 240ms</p>
        </div>
      </div>

      <style>{`
        @keyframes mailpulse {
          0% { left: -4rem; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
