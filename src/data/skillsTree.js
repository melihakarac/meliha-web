export const skillsStructure = {
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
