import { cn } from '@/lib/utils'
import Image from 'next/image'

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-[6px] ring-1 ring-border',
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt=""
        width={48}
        height={48}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  )
}

export function Wordmark({
  className,
  active,
}: {
  className?: string
  active?: string
}) {
  return (
    <span
      className={cn(
        'flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      <LogoMark />
      <span className="flex items-baseline gap-1.5">
        Deducia
        {active ? (
          <span className="text-muted-foreground font-normal">{active}</span>
        ) : null}
      </span>
    </span>
  )
}
