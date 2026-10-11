document.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const anchor = target.closest<HTMLAnchorElement>('a[data-track-external]')
  const kind = anchor?.dataset.trackExternal
  if (kind !== 'purchase' && kind !== 'webinar') return
  const body = JSON.stringify({ kind, locale: document.documentElement.lang, path: location.pathname })
  const blob = new Blob([body], { type: 'application/json' })
  if (!navigator.sendBeacon?.('/api/track', blob)) {
    void fetch('/api/track', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {})
  }
})

export {}
