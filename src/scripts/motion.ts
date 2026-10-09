import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const media = gsap.matchMedia()
media.add('(prefers-reduced-motion: no-preference)', () => {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (hero) {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .from(hero.querySelector('.chapter-label'), { autoAlpha: 0, y: 12, duration: .65 }, .05)
      .from(hero.querySelectorAll('.hero-title-line'), { autoAlpha: 0, yPercent: 16, duration: 1.08, stagger: .12 }, .14)
      .from(hero.querySelector('.hero-intro'), { autoAlpha: 0, y: 20, duration: .75 }, .56)
      .from(hero.querySelector('.hero-actions'), { autoAlpha: 0, y: 14, duration: .65 }, .74)
      .fromTo(hero.querySelector('.hero-image-mask'),
        { clipPath: 'inset(0 12% 0 12%)', scale: 1.04 },
        { clipPath: 'inset(0 0% 0 0%)', scale: 1, duration: 1.35, ease: 'power2.inOut' }, .18)
  }

  if (window.matchMedia('(min-width: 781px)').matches) {
    gsap.utils.toArray<HTMLElement>('[data-float-photo]').forEach((element) => {
      gsap.fromTo(element.querySelector('img'), { scale: 1.08, yPercent: -3 }, {
        scale: 1.08, yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: .8 },
      })
    })
  }

  const refresh = () => ScrollTrigger.refresh()
  requestAnimationFrame(refresh)
  window.addEventListener('load', refresh, { once: true })
  return () => window.removeEventListener('load', refresh)
})
