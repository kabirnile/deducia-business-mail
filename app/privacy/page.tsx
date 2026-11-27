import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export const metadata: Metadata = {
  title: 'Privacy Policy — Deducia AI',
  description:
    'Privacy policy for Deducia AI, the local-first Windows desktop application published by Deducia, Inc.',
  alternates: {
    canonical: 'https://deducia.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — Deducia AI',
    description:
      'Learn how Deducia AI handles information, local data, network access, and third-party AI providers.',
    url: 'https://deducia.com/privacy',
  },
}

const sections = [
  {
    number: '01',
    title: 'Overview & scope',
    content: (
      <>
        <p>
          This Privacy Policy applies to the <strong className="font-medium text-foreground">Deducia AI</strong> Windows desktop application
          (“Deducia AI” or the “Application”), developed and published by Deducia, Inc. (“Deducia,” “we,” “our,” or “us”), and made available
          through the Microsoft Store and at{' '}
          <a className="text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white" href="https://deducia.com">deducia.com</a>.
        </p>
        <p>
          Deducia AI is designed with a local-first, privacy-by-design architecture. It is engineered to run AI models directly on your Windows
          device and does not require a Deducia user account, cloud sign-in, or an external Deducia backend server to use its local features.
          Some optional features connect directly to services you choose, as described below.
        </p>
      </>
    ),
  },
  {
    number: '02',
    title: 'Information we do not collect (zero telemetry)',
    content: (
      <>
        <p>
          Deducia, Inc. does not collect, harvest, sell, rent, or transmit to Deducia servers your chat conversations, prompts, uploaded documents,
          local file indexes, model selections, or usage telemetry from Deducia AI. Upstream analytics and third-party tracking beacons are
          disabled in the Application.
        </p>
        <p>
          Deducia does not operate a remote service that receives your Application content. Information you choose to send directly to a third-party
          provider or public model repository is handled by that recipient under its own terms and privacy practices.
        </p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Local data storage on your device',
    content: (
      <>
        <p>The following information is stored on your Windows PC, in the local application data directory or a storage folder you configure:</p>
        <ul>
          <li>Chat threads, prompt history, and custom assistant configurations.</li>
          <li>Downloaded open-weights model files, including supported <code>.gguf</code> files, and local file-search or retrieval-augmented generation (RAG) vector embeddings.</li>
          <li>API keys you enter and local Application preferences.</li>
        </ul>
        <p>Deducia, Inc. has no remote access to files or other data stored on your local machine.</p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Bring Your Own Key (BYOK) & third-party cloud AI providers',
    content: (
      <>
        <p>
          You may optionally configure your own API credentials for third-party AI providers, including OpenAI, Google Gemini, Anthropic, Groq,
          Mistral, OpenRouter, or custom OpenAI-compatible endpoints. This is an optional feature; you can also use supported models locally.
        </p>
        <p>
          When you submit a prompt using a BYOK cloud provider, the request and the API key needed to authorize it are sent directly from your device
          to the provider&apos;s configured API endpoint over encrypted HTTPS. Your prompts and API keys do not pass through Deducia, Inc. servers.
          Your use of those services is governed by the provider&apos;s privacy policy and terms, including its data handling and retention practices.
          Review those terms before sending information to a provider.
        </p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Model Hub & Hugging Face downloads',
    content: (
      <p>
        When you browse or download open-weights models through the built-in Hub, Deducia AI connects directly to public model repositories, such as
        Hugging Face at{' '}
        <a className="text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white" href="https://huggingface.co">huggingface.co</a>,
        {' '}to retrieve model metadata and download model files directly onto your computer. Those repositories may receive ordinary connection
        information (such as your IP address) as part of serving the request and handle it under their own policies.
      </p>
    ),
  },
  {
    number: '06',
    title: 'Localhost API server & network permissions',
    content: (
      <>
        <p>Deducia AI uses Windows network capabilities only for the following optional functionality:</p>
        <ul>
          <li><strong className="font-medium text-foreground">Internet access (<code>internetClient</code>):</strong> used when you download models from the Model Hub or send requests to a BYOK cloud AI provider you configure.</li>
          <li><strong className="font-medium text-foreground">Private network / localhost access (<code>privateNetworkClientServer</code>):</strong> used to run the optional local OpenAI-compatible API server on loopback (<code>127.0.0.1</code>) or connect to local inference runtimes, such as Ollama or LM Studio, running on your own machine.</li>
        </ul>
        <p>
          The local API server is intended for local development and integrations on your device. If you change its binding or expose a local runtime
          to a network, other devices may be able to reach it; configure access controls and network exposure carefully.
        </p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Data retention, control & deletion',
    content: (
      <>
        <p>
          Application data is stored locally on your Windows device, so you retain control of it. You can delete individual chats, clear saved API
          keys, and remove downloaded models in the Application&apos;s settings or relevant screens at any time.
        </p>
        <p>
          To remove all local Application data, uninstall Deducia AI and, if you want the remaining data removed as well, delete its local application
          data folder and any user-configured storage folders. Deleting those folders is permanent; back up anything you want to keep first.
          Deducia does not retain a remote copy of this local data.
        </p>
      </>
    ),
  },
  {
    number: '08',
    title: 'Children’s privacy',
    content: (
      <p>
        Deducia AI is a general-purpose productivity and developer tool and is not directed to children under 13, or under the applicable age of
        digital consent in their jurisdiction. We do not knowingly collect personal information from children. Because the Application is local-first
        and does not require an account, Deducia does not receive information through the Application for this purpose. If you believe a child has
        provided personal information to Deducia directly, contact us so we can review the matter.
      </p>
    ),
  },
  {
    number: '09',
    title: 'Changes to this policy & contact us',
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. The revised version will be posted at{' '}
          <a className="text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white" href="https://deducia.com/privacy">https://deducia.com/privacy</a>{' '}
          with an updated Effective Date. Please review this page periodically for changes.
        </p>
        <address className="not-italic">
          <p><strong className="font-medium text-foreground">Publisher:</strong> Deducia, Inc.</p>
          <p><strong className="font-medium text-foreground">Support & privacy inquiries:</strong>{' '}
            <a className="text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white" href="mailto:support@deducia.com">support@deducia.com</a>
          </p>
          <p><strong className="font-medium text-foreground">Website:</strong>{' '}
            <a className="text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white" href="https://deducia.com">https://deducia.com</a>
          </p>
        </address>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background pb-24 pt-32 text-foreground sm:pt-36">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <header className="border-b border-white/10 pb-10 sm:pb-12">
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-wide text-zinc-300">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Legal <span className="mx-2 text-zinc-600" aria-hidden="true">·</span> Deducia AI Desktop
            </p>
            <h1 className="mt-7 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Privacy Policy <span className="text-zinc-500">—</span> Deducia AI
            </h1>
            <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-[15px]">
              <span className="text-zinc-200">Effective Date:</span> November 27, 2026
              <span className="mx-2 text-zinc-600">|</span>
              <span className="text-zinc-200">Publisher:</span> Deducia, Inc.
              <span className="mx-2 text-zinc-600">|</span>
              <span className="text-zinc-200">Website:</span>{' '}
              <a className="text-zinc-200 underline decoration-white/25 underline-offset-4 hover:decoration-white" href="https://deducia.com">https://deducia.com</a>
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              Your conversations and files stay on your device. This policy explains the Application&apos;s local storage, optional network connections,
              and the choices available to you.
            </p>
          </header>

          <div className="divide-y divide-white/10">
            {sections.map((section) => (
              <section key={section.number} className="grid gap-3 py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-5 sm:py-9">
                <p className="font-mono text-xs tracking-wider text-brand">{section.number}</p>
                <div>
                  <h2 className="text-lg font-medium tracking-tight text-white sm:text-xl">{section.title}</h2>
                  <div className="privacy-copy mt-4 space-y-4 text-sm leading-7 text-zinc-400 sm:text-[15px]">
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <p className="border-t border-white/10 pt-6 text-xs leading-6 text-zinc-500">
            This policy describes Deducia AI as designed and published. Optional features and third-party services may have separate terms and data
            practices, as described above.
          </p>
        </div>
        <style>{`
          .privacy-copy ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .65rem; }
          .privacy-copy li { position: relative; padding-left: 1.25rem; }
          .privacy-copy li::before { content: ''; position: absolute; left: 0; top: .82em; width: .35rem; height: 1px; background: rgb(113 113 122); }
          .privacy-copy code { border: 1px solid rgb(39 39 42); border-radius: .25rem; background: rgb(24 24 27 / .7); padding: .12rem .35rem; color: rgb(212 212 216); font-family: var(--font-geist-mono); font-size: .85em; }
          .privacy-copy address { display: grid; gap: .25rem; }
        `}</style>
      </main>
      <SiteFooter />
    </>
  )
}
