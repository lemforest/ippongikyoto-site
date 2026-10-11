import assert from 'node:assert/strict'
import { handleContact } from '../functions/api/contact.js'
import { handleTrack } from '../functions/api/track.js'

const url = 'https://preview.example/api/contact'
const form = { name: 'Alice', email: 'alice@example.com', message: 'Is this available?', consent: 'on', website: '', startedAt: Date.now() - 5000 }
const request = (data) => new Request(url, { method: 'POST', headers: { origin: 'https://preview.example', 'content-type': 'application/json' }, body: JSON.stringify(data) })
const env = { CF_ACCOUNT_ID: 'account', CF_EMAIL_API_TOKEN: 'test', CF_EMAIL_FROM: 'verified@example.com', CONTACT_TO: 'support@example.com' }
let delivered
const send = async (_endpoint, options) => { delivered = JSON.parse(options.body); return new Response(JSON.stringify({ success: true, result: { queued: ['support@example.com'], permanent_bounces: [] } }), { status: 200 }) }

assert.equal((await handleContact(request(form), env, send)).status, 200)
assert.equal(delivered.to, 'support@example.com')
assert.match(delivered.text, /Alice[\s\S]*alice@example.com[\s\S]*Is this available/)
assert.equal((await handleContact(request({ ...form, consent: '' }), env, send)).status, 400)
assert.equal((await handleContact(request({ ...form, startedAt: Date.now() }), env, send)).status, 400)
assert.equal((await handleContact(request(form), {}, send)).status, 503)
assert.equal((await handleContact(request(form), env, async () => new Response('{"success":false}', { status: 401 }))).status, 502)
assert.equal((await handleContact(request({ ...form, website: 'bot.example' }), env, send)).status, 200)

const events = []
const track = (data) => new Request('https://preview.example/api/track', { method: 'POST', headers: { origin: 'https://preview.example', 'content-type': 'application/json' }, body: JSON.stringify(data) })
const dataset = { writeDataPoint: (value) => events.push(value) }
assert.equal((await handleTrack(track({ kind: 'purchase', locale: 'ja', path: '/ja/product/protai-eye-skin-care-mist/' }), { ANALYTICS_ENGINE: dataset })).status, 204)
assert.deepEqual(events[0].blobs, ['purchase', 'ja', '/ja/product/protai-eye-skin-care-mist/'])
assert.equal((await handleTrack(track({ kind: 'bogus', locale: 'ja', path: '/' }), { ANALYTICS_ENGINE: dataset })).status, 400)
assert.equal((await handleTrack(track({ kind: 'webinar', locale: 'fr', path: '/fr/webinar/' }), {})).status, 503)
console.log('Contact delivery, anti-spam, failure states and external-click events checked with mock services.')
