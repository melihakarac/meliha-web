import React, { useState } from 'react';
import './SkillsTree.css';

const FileIcon = ({ type }) => {
  const icons = {
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
  };
  return <span className="file-icon">{icons[type] || '📄'}</span>;
};

const TreeNode = ({ node, level = 0, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isFolder = node.children && node.children.length > 0;

  const getFileType = (name) => {
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

  return (
    <div className="tree-node" style={{ '--level': level }}>
      <div
        className={`tree-item ${isFolder ? 'folder' : 'file'} ${isOpen ? 'open' : ''}`}
        onClick={() => isFolder && setIsOpen(!isOpen)}
        role={isFolder ? 'button' : undefined}
        tabIndex={isFolder ? 0 : undefined}
        onKeyDown={(e) => {
          if (isFolder && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="tree-toggle">{isFolder ? (isOpen ? '▼' : '▶') : ''}</span>
        <FileIcon type={isFolder ? 'folder' : getFileType(node.name)} />
        <span className="tree-name">{node.name}</span>
        {node.description && <span className="tree-description">// {node.description}</span>}
      </div>
      {isFolder && isOpen && (
        <div className="tree-children">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} defaultOpen={child.defaultOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

const SkillsTree = () => {
  const skillsStructure = {
    name: 'toolkit/',
    defaultOpen: true,
    children: [
      {
        name: 'frontend/',
        defaultOpen: true,
        children: [
          { name: 'React.js' },
          { name: 'Next.js' },
          { name: 'TypeScript.ts' },
          { name: 'TailwindCSS.css' },
          { name: 'HTML.html' },
          { name: 'CSS.css' },
        ],
      },
      {
        name: 'backend/',
        defaultOpen: true,
        children: [{ name: 'Node.js' }, { name: 'MongoDB.db' }],
      },
      {
        name: 'tools/',
        defaultOpen: true,
        children: [
          { name: 'Git.config' },
          { name: 'Shopify.js' },
          { name: 'MaterialUI.jsx' },
          { name: 'Amplitude.js' },
        ],
      },
      {
        name: 'practices/',
        defaultOpen: true,
        children: [
          { name: 'agile-development.md' },
          { name: 'performance-tuning.md' },
          { name: 'seo-optimization.md' },
          { name: 'problem-solving.md' },
        ],
      },
      {
        name: 'soft-skills/',
        children: [
          { name: 'teamwork.md' },
          { name: 'communication.md' },
          { name: 'adaptability.md' },
          { name: 'creativity.md' },
        ],
      },
    ],
  };

  return (
    <div className="skills-tree">
      <div className="tree-header">
        <div className="tree-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="tree-title">meliha toolkit</span>
      </div>
      <div className="tree-content">
        <TreeNode node={skillsStructure} defaultOpen={true} />
      </div>
    </div>
  );
};

export default SkillsTree;
