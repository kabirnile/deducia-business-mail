import type { Metadata } from 'next'
import { SignupPortal } from '@/components/mail/signup-portal'

type PageProps = {
  params: Promise<{ domain: string }>
}

function normalize(raw: string) {
  return decodeURIComponent(raw || '')
    .toLowerCase()
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { domain } = await params
  const clean = normalize(domain)
  return {
    title: `Join ${clean} on Deducia Mail`,
    description: `Create your official @${clean} company email address on Deducia Mail.`,
  }
}

export default async function SignupPage({ params }: PageProps) {
  const { domain } = await params
  const clean = normalize(domain)

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* subtle backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--brand) 14%, transparent), transparent 70%)',
        }}
      />
      <SignupPortal domain={clean} />
    </main>
  )
}
