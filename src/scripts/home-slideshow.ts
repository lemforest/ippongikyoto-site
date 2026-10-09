import Splide from '@splidejs/splide'

const section = document.querySelector<HTMLElement>('[data-home-slideshow]')
const element = section?.querySelector<HTMLElement>('.home-slideshow-slider')

if (section && element) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const previous = section.querySelector<HTMLButtonElement>('[data-slide-previous]')
  const next = section.querySelector<HTMLButtonElement>('[data-slide-next]')
  const toggle = section.querySelector<HTMLButtonElement>('[data-slide-toggle]')
  const count = section.querySelector<HTMLElement>('[data-slide-current]')
  let inView = false
  let userPaused = reducedMotion

  const slider = new Splide(element, {
    type: 'fade',
    rewind: true,
    speed: reducedMotion ? 0 : 500,
    arrows: false,
    pagination: false,
    drag: true,
    keyboard: 'focused',
    autoplay: 'pause',
    interval: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
  })

  const setPlayback = () => {
    if (inView && !document.hidden && !userPaused) slider.Components.Autoplay.play()
    else slider.Components.Autoplay.pause()
  }
  const updateToggle = () => {
    if (!toggle) return
    toggle.textContent = userPaused ? '▶' : 'Ⅱ'
    toggle.setAttribute('aria-label', userPaused ? section.dataset.playLabel || '' : section.dataset.pauseLabel || '')
    toggle.setAttribute('aria-pressed', String(userPaused))
  }
  const preloadNext = () => {
    const slides = Array.from(element.querySelectorAll<HTMLImageElement>('.splide__slide:not(.splide__slide--clone) img'))
    const following = slides[(slider.index + 1) % slides.length]
    if (following) following.loading = 'eager'
  }

  slider.on('mounted move', () => {
    if (count) count.textContent = String(slider.index + 1).padStart(2, '0')
    preloadNext()
  })
  slider.mount()
  for (const button of [previous, next, toggle]) if (button) button.hidden = false
  updateToggle()

  previous?.addEventListener('click', () => slider.go('<'))
  next?.addEventListener('click', () => slider.go('>'))
  toggle?.addEventListener('click', () => {
    userPaused = !userPaused
    updateToggle()
    setPlayback()
  })

  const observer = new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting)
    setPlayback()
  }, { threshold: 0.15 })
  observer.observe(section)
  document.addEventListener('visibilitychange', setPlayback)
}
