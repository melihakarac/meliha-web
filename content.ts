import { ACCENT_COLORS, ROUTES, SOCIAL_URLS } from '@/constants'

export const CONTACT_EMAIL = 'meliha.karacc@gmail.com'

export const META = {
  title: 'Meliha Karac, Senior Full-Stack Engineer',
  description:
    'Senior full-stack engineer with 5+ years shipping production web applications across fintech, healthcare, adtech, e-commerce, and internal tooling. React, Next.js, TypeScript, Node.js, PostgreSQL.',
  keywords: [
    'senior software engineer',
    'senior full-stack engineer',
    'frontend engineer',
    'react developer',
    'next.js',
    'typescript',
    'node.js',
    'postgresql',
    'react native',
    'remote',
  ],
  authorName: 'Meliha Karac',
  openGraph: {
    title: 'Meliha Karac, Senior Full-Stack Engineer',
    description:
      'Created to create. Full-stack engineering with a frontend edge, built for regulated production.',
    type: 'website' as const,
  },
} as const

export const NAV = {
  logoLabel: 'MK',
  homeAriaLabel: 'Home',
  ctaLabel: 'Email',
  openMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
  links: [
    { label: 'About', href: ROUTES.about },
    { label: 'Work', href: ROUTES.work },
    { label: 'Skills', href: ROUTES.skills },
    { label: 'Contact', href: ROUTES.contact },
  ],
} as const

export const HERO = {
  eyebrow: 'Senior Software Engineer · 100% Remote',
  firstName: 'Meliha',
  lastName: 'Karac',
  taglineLead: '"I was created to create."',
  taglineMuted: 'Software engineering with a frontend edge, built for regulated production.',
  stack: 'React · Next.js · TypeScript · Node.js · PostgreSQL',
  primaryCta: { label: 'View work', href: ROUTES.work },
  secondaryCta: { label: 'Get in touch', href: ROUTES.contact },
  scrollLabel: 'Scroll',
} as const

export const ABOUT = {
  eyebrow: 'About',
  headlineLead: 'Clean code, real deadlines.',
  headlineMuted: 'Five years running.',
  bio: [
    'Five years of shipping production web applications. React, Next.js, and TypeScript on the frontend; Node.js with REST APIs and PostgreSQL or MongoDB once the work crosses the wire.',
    'Currently at Ministry of Programming, a software consultancy. That means dropping into unfamiliar codebases, ramping fast, and delivering under client and compliance pressure. Domains have spanned fintech (KYC, deposits, withdrawals), healthcare admin tooling, adtech SDK dashboards, e-commerce storefronts, and internal back-office systems.',
    'Thrives owning a feature end-to-end: API contract, data model, UI. Most days are in the frontend, but understanding the full system beats throwing work over the wall.',
    'Based in Bosnia & Herzegovina. Open to senior remote roles.',
  ],
  stats: [
    { value: '5+', label: 'Years in production' },
    { value: '5', label: 'Industries' },
    { value: '7+', label: 'Projects shipped' },
    { value: '100%', label: 'Remote' },
  ],
  stack: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'React Native',
    'AWS',
  ],
} as const

export const WORK = {
  eyebrow: 'Selected work',
  headline: 'Five projects, five industries.',
  ndaLabel: 'Under NDA',
  projects: [
    {
      id: '01',
      name: 'Fintech Platform',
      category: 'Regulated Production',
      year: '2024–Present',
      description:
        'Next.js platform for a regulated fintech product covering KYC, deposits, and withdrawals. The frontend integrates a .NET backend over REST APIs, with every flow shaped by compliance and authentication requirements. Modernized high-traffic pages and shipped compliance-driven UX into live production.',
      tech: ['Next.js', 'TypeScript', 'REST APIs', '.NET'],
    },
    {
      id: '02',
      name: 'Internal Operations Tool',
      category: 'Internal Tooling',
      year: '2023–2024',
      description:
        'Back-office system that replaced manual operator workflows. Sole frontend engineer on the platform, building the entire UI against a Node.js and PostgreSQL backend under a fixed delivery timeline. Shipped from zero to live software, then iterated on operator feedback to harden core flows.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'REST'],
    },
    {
      id: '03',
      name: 'SDK Configuration Dashboard',
      category: 'Adtech',
      year: '2022–2023',
      description:
        'Dashboard for configuring embeddable widgets distributed to publishers through an SDK. Built monetization and customization workflows on a Node.js and MongoDB backend, against a revenue-generating system where regressions carried real cost. Shipped feature work and performance improvements into live production.',
      tech: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    },
    {
      id: '04',
      name: 'Healthcare Admin System',
      category: 'Healthcare',
      year: '2021–2022',
      description:
        'Clinician-facing admin platform with feature parity across web and React Native. The same product also surfaced a Shopify and Liquid storefront alongside analytics and SEO instrumentation. Shipped feature work across both client surfaces and the storefront integration.',
      tech: ['React', 'React Native', 'Shopify', 'Liquid'],
    },
    {
      id: '05',
      name: 'Marketplace Storefront',
      category: 'E-commerce',
      year: '2020–2021',
      description:
        'Customer-facing storefront for an online marketplace, with catalog browsing, cart, and checkout wired into a Node.js and MongoDB backend. Built early-career under a small team and a tight launch window, with conversion-critical paths needing to hold up across mobile and desktop. Shipped the storefront into production, then iterated on listing and checkout flows once real traffic surfaced the rough edges.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
  ],
} as const

export const SKILLS = {
  eyebrow: 'Stack',
  headline: 'The production stack.',
  groups: [
    {
      area: 'Frontend',
      accent: ACCENT_COLORS.violet,
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'React Native', 'HTML', 'CSS'],
    },
    {
      area: 'Backend',
      accent: ACCENT_COLORS.cyan,
      skills: ['Node.js', 'REST APIs', '.NET integration', 'PostgreSQL', 'MongoDB'],
    },
    {
      area: 'Infrastructure & DevOps',
      accent: ACCENT_COLORS.pink,
      skills: ['AWS', 'CI/CD', 'Shopify / Liquid'],
    },
  ],
} as const

export const CONTACT = {
  eyebrow: 'Contact',
  headline: 'Open to senior remote work.',
  body: 'No forms. Just an inbox that gets checked, and senior roles that get answered fast.',
  email: CONTACT_EMAIL,
  primaryCta: { label: 'Send an email', href: `mailto:${CONTACT_EMAIL}` },
  secondaryCta: { label: 'View GitHub', href: SOCIAL_URLS.github },
  socials: [
    { label: 'GitHub', href: SOCIAL_URLS.github },
    { label: 'LinkedIn', href: SOCIAL_URLS.linkedin },
  ],
} as const

export const FOOTER = {
  copyrightName: 'Meliha Karac',
  builtWith: 'Built with Next.js · TypeScript · Tailwind',
} as const
