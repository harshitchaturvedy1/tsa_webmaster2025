# Forsyth Bridge - Community Resource Portal

## Overview
Forsyth Bridge is a comprehensive community resource portal designed to connect Forsyth County residents to essential resources, support services, and opportunities. The site features smooth GSAP animations, a complete multi-page architecture, and a clean, responsive design.

**Project Type:** Static HTML/CSS/JavaScript website  
**Status:** Fully functional multi-page site  
**Last Updated:** November 30, 2025

## Project Structure
```
.
├── index.html              # Homepage with hero, featured resources, stats, events preview
├── pages/                  # All site pages
│   ├── resources.html      # Main resource directory with search & filters
│   ├── emergency.html      # Emergency resources with crisis hotlines & quick exit
│   ├── events.html         # Events calendar with featured events
│   ├── about.html          # About page with mission, team, history
│   ├── get-involved.html   # Volunteer, donate, partner opportunities
│   ├── submit-resource.html # Form to suggest new resources
│   ├── contact.html        # Contact form and information
│   ├── news.html           # News & success stories
│   ├── help.html           # Help center with FAQ
│   ├── partners.html       # Partner information and portal
│   ├── privacy.html        # Privacy policy
│   ├── terms.html          # Terms of use
│   ├── accessibility.html  # Accessibility statement
│   ├── about/
│   │   └── how-to-use.html # Guide for using the hub
│   └── resources/
│       └── category/
│           └── food.html   # Food assistance category (template for other categories)
├── css/
│   ├── tsa-webmaster-64beab.webflow.shared.56492c9b5.css  # Webflow base styles
│   └── shared.css          # Shared styles for all pages
├── js/                     # JavaScript libraries (GSAP, jQuery, Webflow)
├── images/                 # All images and assets
└── server.py               # Python HTTP server for development
```

## Technology Stack
- **Frontend:** Pure HTML5, CSS3, JavaScript
- **Animations:** GSAP (GreenSock Animation Platform)
  - ScrollTrigger plugin for scroll-based animations
  - SplitText plugin for character-by-character text animations
  - ScrambleText plugin for number counter animations
- **Icons:** Phosphor Icons
- **Server:** Python 3.11 SimpleHTTPServer (development)

## Page Architecture

### Main Pages
1. **Homepage (index.html)** - Hero, featured resources, category buttons, impact stats, events preview, testimonials, partners, CTA
2. **Resources (/pages/resources.html)** - Directory with search, category filters, resource cards, pagination
3. **Emergency (/pages/emergency.html)** - Crisis hotlines, emergency services, quick exit button
4. **Events (/pages/events.html)** - Calendar with featured events, list/calendar toggle, filters
5. **About (/pages/about.html)** - Mission, vision, how we work, impact stats, team, history
6. **Get Involved (/pages/get-involved.html)** - Volunteer form, donate section, share story
7. **Submit Resource (/pages/submit-resource.html)** - Comprehensive resource submission form
8. **Contact (/pages/contact.html)** - Contact form, phone, email, address, social links
9. **News (/pages/news.html)** - Featured story, news grid, newsletter signup
10. **Help (/pages/help.html)** - Quick links, FAQ accordion
11. **Partners (/pages/partners.html)** - Benefits, how it works, partner portal, directory
12. **How to Use (/pages/about/how-to-use.html)** - Step-by-step guide, tips, accessibility

### Legal Pages
- Privacy Policy (/pages/privacy.html)
- Terms of Use (/pages/terms.html)
- Accessibility Statement (/pages/accessibility.html)

### Category Pages
- Food Assistance (/pages/resources/category/food.html) - Template for other categories

## Design System
- **Primary Color:** Coral/Orange (#e85d3b)
- **Dark Background:** #1a1a2e to #16213e gradient
- **Emergency Color:** Red (#dc3545)
- **Border Radius:** 1rem for cards, 50px for buttons
- **Shadows:** Subtle shadows for depth

## Development Setup

### Running Locally
```
python server.py
```
Server runs on port 5000 with cache headers disabled for development.

## Deployment
- **Type:** Static site deployment
- **Public Directory:** `.` (root directory)
- **Files Served:** All HTML, CSS, JS, and image assets

## Key Features
- Responsive design for mobile/tablet/desktop
- GSAP animations with reduced motion support
- Quick exit button on emergency page
- FAQ accordion with JavaScript
- Search and filter functionality (UI ready)
- Form validation (client-side ready)

## Customization Notes
- Partner logos use placeholders - replace with actual logos
- Phone numbers and emails are placeholder values
- Resource data is static HTML - could be connected to a database
- Forms are UI-only - would need backend integration
