export const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94] as const

export const ACCENT_COLORS = {
  violet: '#7c3aed',
  cyan: '#06b6d4',
  pink: '#d946ef',
} as const

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  work: 'work',
  skills: 'skills',
  contact: 'contact',
} as const

export const ROUTES = {
  home: '#',
  hero: '#hero',
  about: '#about',
  work: '#work',
  skills: '#skills',
  contact: '#contact',
} as const

export const SOCIAL_URLS = {
  github: 'https://github.com/melihakarac',
  linkedin: 'https://linkedin.com/in/melihakarac/',
} as const

export const VIEWPORT = {
  inViewMarginSection: '-80px',
  inViewMarginCard: '-50px',
  navScrollThreshold: 24,
} as const

export const ANIMATION = {
  heroStaggerChildren: 0.11,
  heroDelayChildren: 0.3,
  heroItemDuration: 0.75,
  heroItemDistance: 28,
  scrollHintDelay: 1.6,
  scrollHintDuration: 0.6,
  scrollIndicatorDuration: 1.6,
  scrollIndicatorTravel: [0, 8, 0] as const,
  aboutStaggerChildren: 0.08,
  aboutItemDuration: 0.5,
  aboutItemDistance: 20,
  sectionFadeDuration: 0.6,
  sectionFadeDistance: 20,
  workCardDuration: 0.6,
  workCardDistance: 32,
  workCardStagger: 0.08,
  workCardTiltMaxDeg: 3,
  workCardTiltStiffness: 280,
  workCardTiltDamping: 22,
  workCardPerspective: 800,
  skillsRowDuration: 0.5,
  skillsRowDistance: 16,
  skillsRowStagger: 0.1,
  skillsRowDelayBase: 0.2,
  skillsChipDelayBase: 0.3,
  skillsChipStagger: 0.04,
  contactSectionDuration: 0.7,
  contactSectionDistance: 24,
  contactEmailHoverDistance: 4,
  contactEmailSpringStiffness: 400,
  contactEmailSpringDamping: 22,
  navEnterDuration: 0.6,
  navEnterOffset: 24,
  navMobileSheetDuration: 0.18,
  navMobileSheetOffset: 8,
} as const

export const CURSOR = {
  dotSpringDamping: 25,
  dotSpringStiffness: 700,
  ringSpringDamping: 20,
  ringSpringStiffness: 180,
  offscreen: -100,
  dotOffset: -4,
  ringOffset: -16,
  pointerMediaQuery: '(hover: hover) and (pointer: fine)',
} as const

export const HERO_PROJECT_TILT_PERSPECTIVE = 800
