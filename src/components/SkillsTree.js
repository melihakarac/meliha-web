import React, { useState } from 'react';

import { skillsStructure } from '../data';
import { fileIcons, getFileType } from '../constants';

import './SkillsTree.css';

const FileIcon = ({ type }) => (
  <span className="file-icon">{fileIcons[type] || fileIcons.file}</span>
);

const TreeNode = ({ node, level = 0, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isFolder = node.children && node.children.length > 0;

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
