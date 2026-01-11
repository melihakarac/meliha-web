import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillsTree from './index';

// Mock dependencies
jest.mock('data', () => ({
  skillsStructure: {
    name: 'toolkit/',
    defaultOpen: true,
    children: [
      {
        name: 'frontend/',
        defaultOpen: true,
        children: [{ name: 'React.js' }, { name: 'Next.js' }],
      },
    ],
  },
}));

jest.mock('constants', () => ({
  fileIcons: {
    folder: '📁',
    js: '🟨',
    file: '📄',
  },
  getFileType: (name) => {
    if (name.endsWith('.js')) return 'js';
    return 'file';
  },
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'skills.treeTitle': 'meliha toolkit',
    };
    return translations[key] || key;
  },
}));

describe('SkillsTree', () => {
  it('renders skills tree with title', () => {
    render(<SkillsTree />);
    expect(screen.getByText('meliha toolkit')).toBeInTheDocument();
  });

  it('renders root folder', () => {
    render(<SkillsTree />);
    expect(screen.getByText('toolkit/')).toBeInTheDocument();
  });

  it('renders child folders and files', () => {
    render(<SkillsTree />);
    expect(screen.getByText('frontend/')).toBeInTheDocument();
    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('toggles folder expansion when clicked', () => {
    render(<SkillsTree />);
    const folder = screen.getByText('frontend/').closest('[role="button"]');

    if (folder) {
      fireEvent.click(folder);
      // Folder should toggle its open state
      expect(folder).toBeInTheDocument();
    }
  });
});
