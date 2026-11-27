import { Reveal } from '@/components/reveal'
import { ArrowUpRight, Boxes, Cloud, Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    label: 'Artificial Intelligence',
    name: 'Intelligence',
    description:
      'Models, retrieval and agents wired into your product with a single, coherent interface.',
    icon: Sparkles,
    href: '#technology',
  },
  {
    label: 'Communication',
    name: 'Mail',
    description:
      'Business email infrastructure — connect a domain, spin up branded mailboxes, send and receive at scale.',
    icon: Mail,
    href: '/mail',
  },
  {
    label: 'Cloud Infrastructure',
    name: 'Cloud',
    description:
      'Compute, storage and networking primitives that scale from first commit to global traffic.',
    icon: Cloud,
    href: '#technology',
  },
  {
    label: 'Business Software',
    name: 'Operations',
    description:
      'The internal systems modern companies run on — automated, connected and observable.',
    icon: Boxes,
    href: '#technology',
  },
]

export function Products() {
  return (
    <section id="products" className="container-page py-24 md:py-36">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          The ecosystem
        </p>
        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          What we&apos;re building.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        {products.map((product, i) => {
          const Icon = product.icon
          return (
            <Reveal key={product.name} delay={i * 80}>
              <Link
                href={product.href}
                className="group relative flex h-full min-h-[280px] flex-col justify-between bg-background p-8 transition-colors duration-300 hover:bg-card md:p-12"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="mt-10">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {product.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                    {product.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
