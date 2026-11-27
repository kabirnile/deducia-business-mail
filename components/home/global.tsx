import { Reveal } from '@/components/reveal'

export function GlobalSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/30">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="container-page relative py-24 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-brand">
              Global footprint
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Built from India.
              <br />
              <span className="text-muted-foreground">Built for everywhere.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A network engineered to sit close to your users — routing intelligently
              across regions so the experience stays fast, wherever it&apos;s used.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-16">
          <ConnectionGraphic />
        </Reveal>
      </div>
    </section>
  )
}

function ConnectionGraphic() {
  // abstract network: an origin node radiating arcs to distributed nodes
  const nodes = [
    { x: 120, y: 70 },
    { x: 320, y: 40 },
    { x: 520, y: 90 },
    { x: 700, y: 55 },
    { x: 880, y: 110 },
    { x: 220, y: 190 },
    { x: 620, y: 200 },
    { x: 820, y: 210 },
  ]
  const origin = { x: 470, y: 150 }

  return (
    <div className="mx-auto max-w-4xl">
      <svg
        viewBox="0 0 1000 240"
        className="h-auto w-full"
        fill="none"
        aria-hidden="true"
      >
        {nodes.map((n, i) => {
          const midX = (origin.x + n.x) / 2
          const midY = Math.min(origin.y, n.y) - 40
          return (
            <path
              key={i}
              d={`M ${origin.x} ${origin.y} Q ${midX} ${midY} ${n.x} ${n.y}`}
              stroke="var(--brand)"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
          )
        })}
        {nodes.map((n, i) => (
          <circle key={`n-${i}`} cx={n.x} cy={n.y} r="3" fill="oklch(0.7 0.02 264)" />
        ))}
        <circle cx={origin.x} cy={origin.y} r="6" fill="var(--brand)" />
        <circle
          cx={origin.x}
          cy={origin.y}
          r="14"
          stroke="var(--brand)"
          strokeOpacity="0.4"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="8;22;8"
            dur="3.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.5;0;0.5"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
