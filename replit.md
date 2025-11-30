# GiveWell - Fundraising Website Template

## Overview
This is a modern, GSAP-powered fundraising website template designed to inspire action and showcase campaigns. The site features smooth animations, interactive elements, and a clean, responsive design.

**Project Type:** Static HTML/CSS/JavaScript website (Webflow export)  
**Status:** Fully functional and ready to use  
**Import Date:** November 30, 2025

## Project Structure
```
.
├── index.html              # Main HTML file
├── css/                    # Webflow CSS files
├── js/                     # JavaScript libraries (GSAP, jQuery, Webflow)
├── images/                 # All images and assets
├── server.py              # Python HTTP server for development
└── .gitignore             # Python cache files
```

## Technology Stack
- **Frontend:** Pure HTML5, CSS3, JavaScript
- **Animations:** GSAP (GreenSock Animation Platform)
  - ScrollTrigger plugin for scroll-based animations
  - SplitText plugin for character-by-character text animations
  - Draggable plugin for interactive elements
  - InertiaPlugin for smooth dragging physics
  - ScrambleText plugin for number animations
- **Framework:** Webflow (exported)
- **Icons:** Phosphor Icons
- **Server:** Python 3.11 SimpleHTTPServer

## Features
- Hero section with animated title reveal
- Scroll-triggered text fade-in animations
- Pinned scroll-based image expansion effect
- Interactive tabbed content with auto-rotation
- Draggable hand icons with physics
- Parallax marquee scrolling
- Scrambled number counter animations
- Fully responsive design
- Navigation with mobile menu

## Development Setup

### Running Locally
The website runs on a Python HTTP server configured to serve static files on port 5000.

**Server Configuration:**
- Host: `0.0.0.0` (accessible from all network interfaces)
- Port: `5000`
- Cache headers: Disabled for development

The server automatically starts via the "Start server" workflow.

### File Serving
All static assets (HTML, CSS, JS, images) are served directly from the root directory with cache-control headers disabled to ensure fresh content during development.

## Deployment

### Deployment Configuration
- **Type:** Static site deployment
- **Public Directory:** `.` (root directory)
- **Files Served:** All HTML, CSS, JS, and image assets

The site is configured for static deployment, which means it will be served as-is without any build process or server-side logic.

## Key Sections
1. **Hero** - Animated title with scenic background
2. **Mission** - Organization mission statement
3. **Empower** - Tabbed content showcasing different initiatives
4. **Team** - Team/volunteer recognition
5. **Vision** - Full-screen pinned scroll animation
6. **Stats** - Impact statistics with animated numbers
7. **Footer** - Contact and social links

## Notes
- The website includes GSAP premium plugins (SplitText, ScrambleText, InertiaPlugin) which may require licensing for commercial use
- All animations respect user's `prefers-reduced-motion` accessibility setting
- Images are optimized with AVIF format for modern browsers with JPEG fallbacks
- The site includes anti-caching headers during development for immediate updates

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- AVIF image support recommended
- JavaScript required for animations and interactivity
