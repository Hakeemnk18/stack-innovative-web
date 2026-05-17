import type { Variants, Transition } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const VIEWPORT = { once: true, margin: '-60px' } as const

export function inViewProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.65, delay, ease: EASE } satisfies Transition,
  } as const
}

export function inViewLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -28 },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.65, delay, ease: EASE } satisfies Transition,
  } as const
}

export function inViewRight(delay = 0) {
  return {
    initial: { opacity: 0, x: 28 },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.65, delay, ease: EASE } satisfies Transition,
  } as const
}

export function inViewScale(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: VIEWPORT,
    transition: { duration: 0.55, delay, ease: EASE } satisfies Transition,
  } as const
}
