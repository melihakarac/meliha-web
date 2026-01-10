# Meliha Web - Digital Portfolio

A modern, responsive digital portfolio website showcasing my work, skills, and experience. Built with React and designed with a focus on clean aesthetics and excellent user experience.

## Features

- 🎨 **Modern Design**: Clean, professional light theme with smooth animations and interactive elements
- 📱 **Responsive Layout**: Fully responsive design optimized for all screen sizes
- ⚡ **Fast Performance**: Optimized for fast loading times and smooth interactions
- ✨ **Interactive Elements**: Particle background, typewriter effect, animated counters, skills tree
- ♿ **Accessible**: Built with accessibility best practices (ARIA labels, skip links, semantic HTML)
- 🚀 **SEO Friendly**: Optimized for search engines with meta tags, Open Graph, and JSON-LD

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
├── assets/              # Static assets
│   ├── icons/          # SVG icon components
│   └── images/         # Image files (profile, etc.)
├── components/          # React components
│   ├── common/         # Reusable components (Button, Card, Container, Section, SkillTag)
│   ├── About.js        # About section
│   ├── Contact.js      # Contact form and information
│   ├── Experience.js   # Work experience and education
│   ├── Footer.js       # Footer component
│   ├── Header.js       # Navigation header
│   ├── Hero.js         # Hero/landing section with particle background
│   ├── ParticleBackground.js  # Interactive canvas animation
│   ├── SkillsTree.js   # Interactive file tree skills display
│   └── Skills.js       # Skills and technologies
├── config/              # Configuration files
│   ├── googleForm.js   # Google Form integration settings
│   └── index.js        # Config exports
├── constants/           # Constants
│   └── sections.js     # Section IDs and navigation links
├── data/                # Data files
│   ├── contact.js      # Contact info and social links
│   ├── experiences.js  # Work experience data
│   ├── highlights.js   # About section highlights
│   └── skills.js       # Skills data
├── hooks/               # Custom React hooks
│   ├── useCountUp.js   # Animated number counter
│   ├── useFormValidation.js  # Form validation logic
│   ├── useSmoothScroll.js    # Smooth scroll navigation
│   ├── useStaggerReveal.js   # Staggered scroll animations
│   └── useTypewriter.js      # Typewriter text effect
├── i18n/                # Internationalization
│   └── en.json         # English translations
├── styles/              # Global styles
│   ├── animations.css  # Animation definitions
│   └── variables.css   # CSS variables and design tokens
├── utils/               # Utility functions
│   └── validation.js   # Form validation rules
└── App.js               # Main application component
```

## Sections

1. **Hero**: Main landing section with typewriter effect and interactive particle background
2. **About**: Personal introduction with animated highlights
3. **Skills**: Interactive file tree display of technologies and tools
4. **Experience**: Work experience and education timeline with nested project details
5. **Contact**: Contact form with Google Forms integration and social links
6. **Footer**: Footer with copyright

## Customization

### Updating Content

- Edit data files in `src/data/` to update section content
- Modify skills in `src/data/skills.js`
- Update experience/education in `src/data/experiences.js`
- Edit translations in `src/i18n/en.json`

### Styling

- CSS variables are defined in `src/styles/variables.css`
- Component-specific styles are in their respective `.css` files
- Follow mobile-first principles when adding new styles

### Contact Information

Update contact details in `src/data/contact.js`:

- Email and location
- Social media links (GitHub, LinkedIn, Telegram)

### Environment Variables

Create a `.env` file based on `.env.example` for Google Form integration:

- `REACT_APP_GOOGLE_FORM_ID` - Your Google Form ID
- `REACT_APP_GOOGLE_FORM_NAME_ENTRY` - Name field entry ID
- `REACT_APP_GOOGLE_FORM_EMAIL_ENTRY` - Email field entry ID
- `REACT_APP_GOOGLE_FORM_MESSAGE_ENTRY` - Message field entry ID

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

## Inspiration & Credits

Special thanks to the creators and contributors of these amazing tools that helped shape this portfolio's design:

- **[Coolors](https://coolors.co)** - The super fast color palette generator by Fabrizio Bianchi. Used for exploring and creating the color scheme.
- **[Font Pair](https://www.fontpair.co/all)** - Helped discover the perfect font combinations (Archivo + Inter).
- **[Realtime Colors](https://www.realtimecolors.com)** - Visualize colors and fonts on a real site before implementing. Incredibly useful for testing the palette in context.

These tools made the design process so much smoother - highly recommend them to any designer or developer! 🎨

## License

This project is private and proprietary.

## Contact

For questions or inquiries, please use the contact form on the website or reach out through the provided contact information.
