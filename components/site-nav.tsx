'use client'

import { cn } from '@/lib/utils'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Wordmark } from './logo'

const LOGIN_URL = 'https://mail.deducia.com/en/login'

const navLinks = [
  { label: 'Products', href: '/#products' },
  { label: 'Solutions', href: '/#technology' },
  { label: 'Developers', href: '/#technology' },
  { label: 'Company', href: '/#vision' },
]

export function SiteNav() {
  const pathname = usePathname()
  const isMail = pathname?.startsWith('/mail')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-colors duration-300',
          scrolled || open
            ? 'border-border bg-background/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="transition-opacity hover:opacity-80"
              aria-label="Deducia home"
              onClick={() => setOpen(false)}
            >
              <Wordmark active={isMail ? 'Mail' : undefined} />
            </Link>
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href="/#technology"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
            <Link
              href="/#contact"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <a
              href={LOGIN_URL}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </a>
            <a
              href="https://signup.mail.deducia.com/"
              className="group ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-px"
            >
              Get started
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container-page flex flex-col gap-1 py-6">
          {[...navLinks, { label: 'Documentation', href: '/#technology' }, { label: 'Contact', href: '/#contact' }].map(
            (link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href={LOGIN_URL}
            onClick={() => setOpen(false)}
            className="rounded-md px-3 py-3 text-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </a>
          <a
            href="/mail/business"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
          >
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
