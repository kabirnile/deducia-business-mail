import Link from 'next/link'
import { LogoMark } from './logo'

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#vision' },
      { label: 'Careers', href: '/#contact' },
      { label: 'Blog', href: '/#technology' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Mail', href: '/mail' },
      { label: 'AI', href: '/#products' },
      { label: 'Cloud', href: '/#products' },
      { label: 'Business', href: '/#products' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '/#technology' },
      { label: 'API reference', href: '/#technology' },
      { label: 'Status', href: '/#technology' },
      { label: 'Changelog', href: '/#technology' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Guides', href: '/#technology' },
      { label: 'Support', href: '/#contact' },
      { label: 'Security', href: '/mail#security' },
      { label: 'Trust', href: '/#trust' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/#contact' },
      { label: 'Terms', href: '/#contact' },
      { label: 'DPA', href: '/#contact' },
      { label: 'Cookies', href: '/#contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Deducia home">
              <LogoMark />
              <span className="text-[15px] font-semibold tracking-tight">Deducia</span>
            </Link>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
              Intelligent software infrastructure. Built in India, designed for the world.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Deducia Technologies. All rights reserved.</p>
          <p className="font-mono text-xs tracking-tight">Bengaluru · Global</p>
        </div>
      </div>
    </footer>
  )
}
