# Kansas City Tech Enthusiasts Website

A modern, responsive website for the Kansas City Tech Enthusiasts community built with Astro, Tailwind CSS, and TypeScript.

## Features

- 🚀 Built with [Astro](https://astro.build) for optimal performance
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com) for a modern, responsive design
- 🎯 TypeScript for type safety
- 📱 Fully responsive design
- 🌈 Bright, bold color scheme
- 📝 Contact form with Netlify Forms integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This site is configured for deployment on Netlify. The `netlify.toml` file contains the build configuration.

To deploy:
1. Connect your repository to Netlify
2. Netlify will automatically detect the build settings
3. The site will be built and deployed automatically on push to main

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   │   ├── layout/  # Layout components (Header, Footer)
│   │   └── ui/      # UI components (Button, Card, Input, etc.)
│   ├── config/      # Configuration files
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   └── styles/      # Global styles
├── astro.config.mjs # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── package.json
```

## Pages

- **Home** (`/`) - Hero section, community highlights, featured events, newsletter signup
- **About** (`/about`) - Mission, values, community stats
- **Events** (`/events`) - Upcoming and past events
- **Contact** (`/contact`) - Contact form and community links

## Customization

### Site Configuration

Edit `src/config/site.ts` to update:
- Site name and description
- Social media links
- Contact information

### Colors

The color scheme can be customized in `tailwind.config.mjs`. The current palette features:
- Primary: Electric blue
- Secondary: Bright orange
- Accent: Vibrant purple

### Content

Update event listings in `src/pages/events.astro` and `src/pages/index.astro`.

## License

MIT
