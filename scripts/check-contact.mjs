import assert from 'node:assert/strict'
import { handleContact } from '../functions/api/contact.js'

const url = 'https://preview.example/api/contact'
const form = { name: 'Alice', email: 'alice@example.com', message: 'Is this available?', consent: 'on', website: '', startedAt: Date.now() - 5000, 'cf-turnstile-response': 'verified-token' }
const request = (data) => new Request(url, { method: 'POST', headers: { origin: 'https://preview.example', 'content-type': 'application/json' }, body: JSON.stringify(data) })
const env = { RESEND_API_KEY: 'test', RESEND_FROM: 'IPPONGI Kyoto <website@notify.example.com>', CONTACT_TO: 'support@example.com', TURNSTILE_SECRET_KEY: 'secret' }
let delivered
const send = async (endpoint, options) => {
  if (endpoint.includes('/siteverify')) {
    assert.equal(options.body.get('response'), 'verified-token')
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  }
  assert.equal(endpoint, 'https://api.resend.com/emails')
  assert.equal(options.headers.authorization, 'Bearer test')
  delivered = JSON.parse(options.body)
  return new Response(JSON.stringify({ id: 'email-accepted-id' }), { status: 200 })
}

assert.equal((await handleContact(request(form), env, send)).status, 200)
assert.deepEqual(delivered.to, ['support@example.com'])
assert.equal(delivered.reply_to, 'alice@example.com')
assert.match(delivered.text, /Alice[\s\S]*alice@example.com[\s\S]*Is this available/)
assert.equal((await handleContact(request({ ...form, name: 'Alice\r\nBcc: attacker@example.com' }), env, send)).status, 400)
assert.equal((await handleContact(request({ ...form, email: 'alice@example.com,attacker@example.com' }), env, send)).status, 400)
assert.equal((await handleContact(request({ ...form, consent: '' }), env, send)).status, 400)
assert.equal((await handleContact(request({ ...form, startedAt: Date.now() }), env, send)).status, 400)
assert.equal((await handleContact(request({ ...form, 'cf-turnstile-response': '' }), env, send)).status, 400)
assert.equal((await handleContact(request(form), {}, send)).status, 503)
assert.equal((await handleContact(request(form), env, async () => new Response('{"success":false}', { status: 200 }))).status, 403)
assert.equal((await handleContact(request(form), env, async (endpoint, options) => endpoint.includes('/siteverify') ? send(endpoint, options) : new Response('{"success":false}', { status: 401 }))).status, 502)
assert.equal((await handleContact(request(form), env, async (endpoint, options) => endpoint.includes('/siteverify') ? send(endpoint, options) : new Response('{"unexpected":true}', { status: 200 }))).status, 502)
assert.equal((await handleContact(request({ ...form, website: 'bot.example' }), env, send)).status, 200)

console.log('Contact delivery, anti-spam and failure states checked with mock services.')
