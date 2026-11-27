import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { domain, orgName } = await req.json();
    const cleanDomain = String(domain || '')
      .toLowerCase()
      .trim()
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '');

    if (!cleanDomain || !cleanDomain.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid domain name.' }, { status: 400 });
    }

    const STALWART_URL = (process.env.STALWART_URL || 'https://email.deducia.com').replace(/\/$/, '');
    const ADMIN_USER = process.env.STALWART_ADMIN_USER || 'admin@deducia.com';
    const ADMIN_PASS = process.env.STALWART_ADMIN_PASS || 'XtgwS10iiltTYVam';
    const authHeader = 'Basic ' + Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');
    const endpoints = [`${STALWART_URL}/jmap`, `${STALWART_URL}/api`];

    const jmapBody = {
      using: ['urn:ietf:params:jmap:core', 'urn:stalwart:jmap'],
      methodCalls: [
        [
          'x:Domain/set',
          {
            create: {
              new_domain: {
                name: cleanDomain,
                description: orgName || cleanDomain,
              },
            },
          },
          'd1',
        ],
      ],
    };

    let responseData: any = null;
    let successfulCall = false;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: authHeader },
          body: JSON.stringify(jmapBody),
          cache: 'no-store',
        });

        if (res.status === 404) continue;
        if (res.status === 401) {
          return NextResponse.json({ error: 'Mail server authentication failed.' }, { status: 401 });
        }

        responseData = await res.json();
        successfulCall = true;
        break;
      } catch {
        continue;
      }
    }

    if (!successfulCall || !responseData) {
      return NextResponse.json({ error: 'Could not connect to Stalwart mail directory.' }, { status: 502 });
    }

    const result = responseData?.methodResponses?.find((m: any) => m[2] === 'd1')?.[1];
    let createdId = result?.created?.new_domain?.id;

    if (!createdId) {
      const failure = result?.notCreated?.new_domain;
      const desc = String(failure?.description || failure?.type || '');
      if (!desc.toLowerCase().includes('already') && failure?.type !== 'alreadyExists') {
        return NextResponse.json({ error: `Failed to register domain: ${desc || 'Server error'}` }, { status: 400 });
      }
    }

    const dnsRecords = [
      { type: 'MX', host: '@', value: 'email.deducia.com', priority: 10, purpose: 'Directs incoming mail to Deducia servers' },
      { type: 'TXT', host: '@', value: 'v=spf1 mx a:email.deducia.com ~all', purpose: 'SPF sender authorization' },
      { type: 'TXT', host: '_dmarc', value: 'v=DMARC1; p=quarantine;', purpose: 'DMARC policy protection' },
      { type: 'CNAME', host: 'mail', value: 'mail.deducia.com', purpose: 'Webmail portal CNAME (DNS Only / Grey Cloud)' },
    ];

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      domainId: createdId || cleanDomain,
      records: dnsRecords,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
