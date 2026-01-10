export const fileIcons = {
  folder: '📁',
  js: '🟨',
  ts: '🔷',
  css: '🎨',
  json: '📋',
  md: '📝',
  config: '⚙️',
  db: '🗄️',
  git: '🔀',
  package: '📦',
  file: '📄',
};

export const getFileType = (name) => {
  if (name.endsWith('.js') || name.endsWith('.jsx')) return 'js';
  if (name.endsWith('.ts') || name.endsWith('.tsx')) return 'ts';
  if (name.endsWith('.css')) return 'css';
  if (name.endsWith('.json')) return 'json';
  if (name.endsWith('.md')) return 'md';
  if (name.endsWith('.config')) return 'config';
  if (name.endsWith('.db')) return 'db';
  if (name === '.gitignore' || name === '.git') return 'git';
  if (name === 'package.json') return 'package';
  return 'file';
};
