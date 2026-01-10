import { t } from '../i18n';

export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  CONTACT: 'contact',
};

export const getNavLinks = () => [
  { id: SECTIONS.HERO, label: t('nav.home') },
  { id: SECTIONS.ABOUT, label: t('nav.about') },
  { id: SECTIONS.SKILLS, label: t('nav.skills') },
  { id: SECTIONS.EXPERIENCE, label: t('nav.experience') },
];

// For backwards compatibility
export const NAV_LINKS = [
  { id: SECTIONS.HERO, label: 'Home' },
  { id: SECTIONS.ABOUT, label: 'About' },
  { id: SECTIONS.SKILLS, label: 'Skills' },
  { id: SECTIONS.EXPERIENCE, label: 'Experience' },
];
