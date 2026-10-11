const section = document.querySelector<HTMLElement>('#voices')
export {}

if (section) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const toggle = section.querySelector<HTMLButtonElement>('[data-testimonial-toggle]')
  const rails = Array.from(section.querySelectorAll<HTMLElement>('[data-testimonial-slider]'))
  let inView = false
  let userPaused = false

  const rebuild = (rail: HTMLElement) => {
    const track = rail.querySelector<HTMLElement>('.splide__track')
    const list = rail.querySelector<HTMLElement>('.splide__list')
    if (!track || !list) return
    list.querySelectorAll('.testimonial-clone').forEach((clone) => clone.remove())
    const originals = Array.from(list.children) as HTMLElement[]
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0
    const setWidth = originals.reduce((width, slide) => width + slide.getBoundingClientRect().width + gap, 0)
    if (!setWidth) return
    const copies = Math.max(1, Math.ceil((track.clientWidth + gap) / setWidth))
    for (let copy = 0; copy < copies; copy += 1) {
      for (const original of originals) {
        const clone = original.cloneNode(true) as HTMLElement
        clone.classList.add('testimonial-clone')
        clone.setAttribute('aria-hidden', 'true')
        clone.inert = true
        list.append(clone)
      }
    }
    list.style.setProperty('--marquee-distance', `${setWidth}px`)
    list.style.animationDuration = `${setWidth / 27}s`
    rail.classList.add('is-initialized')
  }

  rails.forEach((rail) => {
    rebuild(rail)
    new ResizeObserver(() => rebuild(rail)).observe(rail)
  })

  const sync = () => {
    section.classList.toggle('is-playing', inView && !document.hidden && !userPaused && !reducedMotion.matches)
    if (toggle) {
      toggle.hidden = reducedMotion.matches
      toggle.textContent = userPaused ? toggle.dataset.playLabel || '' : toggle.dataset.pauseLabel || ''
      toggle.setAttribute('aria-pressed', String(userPaused))
    }
  }

  toggle?.addEventListener('click', () => {
    userPaused = !userPaused
    sync()
  })
  new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting)
    sync()
  }, { threshold: 0.1 }).observe(section)
  document.addEventListener('visibilitychange', sync)
  reducedMotion.addEventListener('change', sync)
  document.fonts.ready.then(() => rails.forEach(rebuild))
  sync()
}
