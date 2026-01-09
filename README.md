# Meliha Web - Digital Portfolio

A modern, responsive digital portfolio website showcasing my work, skills, and experience. Built with React and designed with a focus on clean aesthetics and excellent user experience.

## Features

- 🎨 **Modern Design**: Clean, professional design with smooth animations
- 📱 **Responsive Layout**: Fully responsive design optimized for all screen sizes
- ⚡ **Fast Performance**: Optimized for fast loading times and smooth interactions
- 🌙 **Dark Mode Ready**: Supports dark mode preferences
- ♿ **Accessible**: Built with accessibility best practices
- 🚀 **SEO Friendly**: Optimized for search engines

## Tech Stack

- **React 19.2.3** - Modern React with latest features
- **CSS3** - Custom styling with CSS variables and mobile-first approach
- **Create React App** - Development and build tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meliha-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. Optimized and minified for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App to get full control over configuration.

## Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable components (Button, Card, Container, Section)
│   ├── About.js        # About section
│   ├── Contact.js      # Contact form and information
│   ├── Experience.js   # Work experience and education
│   ├── Footer.js       # Footer component
│   ├── Header.js       # Navigation header
│   ├── Hero.js         # Hero/landing section
│   ├── Projects.js     # Portfolio projects showcase
│   └── Skills.js       # Skills and technologies
├── constants/          # Constants
│   └── sections.js     # Section IDs and navigation links
├── styles/             # Global styles
│   ├── animations.css  # Animation definitions
│   └── variables.css   # CSS variables and design tokens
└── App.js              # Main application component
```

## Sections

1. **Hero**: Main landing section with introduction and call-to-action
2. **About**: Personal introduction and highlights
3. **Skills**: Technologies and tools I work with
4. **Projects**: Featured portfolio projects with descriptions and links
5. **Experience**: Work experience and education timeline
6. **Contact**: Contact form and social media links
7. **Footer**: Footer with copyright and credits

## Customization

### Updating Content

- Edit component files in `src/components/` to update section content
- Update project data in `src/components/Projects.js`
- Modify skills in `src/components/Skills.js`
- Update experience/education in `src/components/Experience.js`

### Styling

- CSS variables are defined in `src/styles/variables.css`
- Component-specific styles are in their respective `.css` files
- Follow mobile-first principles when adding new styles

### Contact Information

Update contact details in `src/components/Contact.js`:
- Email, phone, and location
- Social media links (GitHub, LinkedIn, Twitter)

## Design Principles

### Mobile-First Approach
The entire application follows mobile-first design principles:
- Styles start with mobile breakpoints
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (minimum 44px touch targets)
- Fluid typography using `clamp()` for responsive scaling

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Wide: 1280px+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For questions or inquiries, please use the contact form on the website or reach out through the provided contact information.
