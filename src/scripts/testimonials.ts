import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

const section = document.querySelector<HTMLElement>('#voices')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

if (section && !reducedMotion.matches) {
  const toggle = section.querySelector<HTMLButtonElement>('[data-testimonial-toggle]')
  let inView = false
  let userPaused = false
  const sliders = Array.from(section.querySelectorAll<HTMLElement>('[data-testimonial-slider]')).map((element) => {
    const slide = element.querySelector<HTMLElement>('.splide__slide')
    const originalCount = element.querySelectorAll('.splide__slide').length
    const cloneCount = () => Math.ceil(element.clientWidth / ((slide?.getBoundingClientRect().width || 410) + 16)) + originalCount
    const slider = new Splide(element, {
      type: 'loop',
      autoWidth: true,
      gap: 16,
      clones: cloneCount(),
      drag: 'free',
      arrows: false,
      pagination: false,
      updateOnMove: true,
      autoScroll: {
        speed: element.dataset.direction === 'backward' ? -0.45 : 0.45,
        autoStart: false,
        pauseOnHover: true,
        pauseOnFocus: true,
      },
    })
    slider.mount({ AutoScroll })
    const track = element.querySelector<HTMLElement>('.splide__track')
    if (track) track.scrollLeft = 0
    const hideClones = () => element.querySelectorAll<HTMLElement>('.splide__slide--clone').forEach((clone) => {
      clone.setAttribute('aria-hidden', 'true')
      clone.inert = true
    })
    hideClones()
    new MutationObserver(hideClones).observe(element, { childList: true, subtree: true })
    window.addEventListener('resize', () => {
      const clones = cloneCount()
      if (slider.options.clones !== clones) slider.options = { clones }
    })
    return slider
  })
  if (toggle) toggle.hidden = false

  const setActive = (active: boolean) => {
    sliders.forEach((slider) => {
      const scroller = slider.Components.AutoScroll
      if (active && !userPaused) scroller?.play()
      else scroller?.pause()
    })
  }

  toggle?.addEventListener('click', () => {
    userPaused = !userPaused
    toggle.setAttribute('aria-pressed', String(userPaused))
    toggle.textContent = userPaused ? toggle.dataset.playLabel || '' : toggle.dataset.pauseLabel || ''
    setActive(inView && !document.hidden)
  })

  const observer = new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting)
    setActive(inView && !document.hidden)
  }, { threshold: 0.1 })
  observer.observe(section)
  document.addEventListener('visibilitychange', () => setActive(inView && !document.hidden))
}
