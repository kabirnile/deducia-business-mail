import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password, domain } = await req.json();

    const cleanUser = String(username || '').toLowerCase().trim().replace(/[^a-z0-9._-]/g, '');
    const cleanDomain = String(domain || '').toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
    const rawPass = String(password || '');

    if (!cleanUser || cleanUser.length < 3) {
      return NextResponse.json({ error: 'Username must be at least 3 characters long.' }, { status: 400 });
    }
    if (!rawPass || rawPass.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const STALWART_URL = (process.env.STALWART_URL || 'https://email.deducia.com').replace(/\/$/, '');
    const ADMIN_USER = process.env.STALWART_ADMIN_USER || 'admin@deducia.com';
    const ADMIN_PASS = process.env.STALWART_ADMIN_PASS || 'XtgwS10iiltTYVam';
    const authHeader = 'Basic ' + Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');
    const endpoints = [`${STALWART_URL}/jmap`, `${STALWART_URL}/api`];

    // Step 1: Query Stalwart to find the internal domainId for this domain name
    const lookupBody = {
      using: ['urn:ietf:params:jmap:core', 'urn:stalwart:jmap'],
      methodCalls: [
        ['x:Domain/get', { ids: null }, 'get_domains'],
      ],
    };

    let domainList: any[] = [];
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: authHeader },
          body: JSON.stringify(lookupBody),
          cache: 'no-store',
        });
        if (res.status === 404) continue;
        const data = await res.json();
        const getRes = data?.methodResponses?.find((m: any) => m[2] === 'get_domains')?.[1];
        if (getRes?.list) {
          domainList = getRes.list;
          break;
        }
      } catch {
        continue;
      }
    }

    const matchedDomain = domainList.find(
      (d: any) => String(d.name || '').toLowerCase() === cleanDomain
    );

    if (!matchedDomain?.id) {
      return NextResponse.json(
        { error: `Domain "${cleanDomain}" not found in Stalwart. Please register it in Step 1 first.` },
        { status: 400 }
      );
    }

    const realDomainId = matchedDomain.id;

    // Step 2: Provision user with the verified internal domainId
    const createUserBody = {
      using: ['urn:ietf:params:jmap:core', 'urn:stalwart:jmap'],
      methodCalls: [
        [
          'x:Account/set',
          {
            create: {
              new_user: {
                '@type': 'User',
                name: cleanUser,
                domainId: realDomainId,
                credentials: {
                  '0': { '@type': 'Password', secret: rawPass },
                },
                roles: { '@type': 'User' },
                permissions: { '@type': 'Inherit' },
                quotas: {},
                aliases: {},
                memberGroupIds: {},
                encryptionAtRest: { '@type': 'Disabled' },
              },
            },
          },
          'u1',
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
          body: JSON.stringify(createUserBody),
          cache: 'no-store',
        });
        if (res.status === 404) continue;
        responseData = await res.json();
        successfulCall = true;
        break;
      } catch {
        continue;
      }
    }

    if (!successfulCall || !responseData) {
      return NextResponse.json({ error: 'Mail server unreachable.' }, { status: 502 });
    }

    const result = responseData?.methodResponses?.find((m: any) => m[2] === 'u1')?.[1];

    if (result?.created?.new_user) {
      return NextResponse.json({
        success: true,
        email: `${cleanUser}@${cleanDomain}`,
        webmailUrl: 'https://mail.deducia.com',
      });
    }

    const failure = result?.notCreated?.new_user;
    const type = String(failure?.type || '');
    const desc = String(failure?.description || failure?.details || '');
    const lower = `${type} ${desc}`.toLowerCase();

    if (type === 'alreadyExists' || lower.includes('primarykey') || lower.includes('duplicate')) {
      return NextResponse.json({ error: 'This username is already taken on this domain.' }, { status: 409 });
    }
    if (lower.includes('password') || lower.includes('weak') || lower.includes('complexity')) {
      return NextResponse.json({ error: 'Password does not meet complexity requirements.' }, { status: 400 });
    }

    return NextResponse.json({ error: desc || 'Failed to create mailbox.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
