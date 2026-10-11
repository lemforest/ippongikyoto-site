export async function handleTrack(request, env) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return new Response(null, { status: 403 })
  if (!request.headers.get('content-type')?.startsWith('application/json')) return new Response(null, { status: 415 })
  let input
  try { input = await request.json() } catch { return new Response(null, { status: 400 }) }
  const { kind, locale, path } = input || {}
  if (!['purchase', 'webinar'].includes(kind) || !['en', 'ja', 'fr', 'th', 'zh-TW'].includes(locale) || typeof path !== 'string' || path.length > 200 || !/^\/(?:[a-z0-9-]+\/)*$/.test(path)) return new Response(null, { status: 400 })
  if (!env.ANALYTICS_ENGINE) return new Response(null, { status: 503 })
  env.ANALYTICS_ENGINE.writeDataPoint({ indexes: [kind], blobs: [kind, locale, path], doubles: [1] })
  return new Response(null, { status: 204 })
}

export const onRequestPost = ({ request, env }) => handleTrack(request, env)
