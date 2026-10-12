const json = (value, status) => new Response(JSON.stringify(value), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
})

export async function handleContact(request, env, send = fetch) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'forbidden' }, 403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'invalid' }, 415)
  if (Number(request.headers.get('content-length') || 0) > 12000) return json({ error: 'too_large' }, 413)
  let input
  try { input = await request.json() } catch { return json({ error: 'invalid' }, 400) }
  if (typeof input !== 'object' || input === null) return json({ error: 'invalid' }, 400)
  if (input.website) return json({ ok: true }, 200)
  const name = String(input.name || '').trim()
  const email = String(input.email || '').trim()
  const message = String(input.message || '').trim()
  const turnstileToken = String(input['cf-turnstile-response'] || '')
  const age = Date.now() - Number(input.startedAt)
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 5000 || input.consent !== 'on' || !Number.isFinite(age) || age < 3000 || age > 86400000 || !turnstileToken || turnstileToken.length > 2048) {
    return json({ error: 'invalid' }, 400)
  }
  const { CF_ACCOUNT_ID, CF_EMAIL_API_TOKEN, CF_EMAIL_FROM, CONTACT_TO, TURNSTILE_SECRET_KEY } = env
  if (!CF_ACCOUNT_ID || !CF_EMAIL_API_TOKEN || !CF_EMAIL_FROM || !CONTACT_TO || !TURNSTILE_SECRET_KEY) return json({ error: 'unavailable' }, 503)
  let challenge
  try {
    const body = new FormData()
    body.set('secret', TURNSTILE_SECRET_KEY)
    body.set('response', turnstileToken)
    challenge = await send('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  } catch { return json({ error: 'verification' }, 502) }
  const challengeResult = await challenge.json().catch(() => null)
  if (!challenge.ok || !challengeResult?.success) return json({ error: 'verification' }, 403)
  let upstream
  try {
    upstream = await send(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(CF_ACCOUNT_ID)}/email/sending/send`, {
      method: 'POST', headers: { authorization: `Bearer ${CF_EMAIL_API_TOKEN}`, 'content-type': 'application/json' },
      body: JSON.stringify({ to: CONTACT_TO, from: CF_EMAIL_FROM, subject: `IPPONGI website enquiry — ${name}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` }),
    })
  } catch { return json({ error: 'delivery' }, 502) }
  if (!upstream.ok) return json({ error: 'delivery' }, 502)
  const result = await upstream.json().catch(() => null)
  const accepted = [...(result?.result?.delivered || []), ...(result?.result?.queued || [])].includes(CONTACT_TO)
  if (!result?.success || !accepted || result.result?.permanent_bounces?.length) return json({ error: 'delivery' }, 502)
  return json({ ok: true }, 200)
}

export const onRequestPost = ({ request, env }) => handleContact(request, env)
