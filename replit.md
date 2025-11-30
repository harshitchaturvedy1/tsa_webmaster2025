# Forsyth Bridge - Community Resource Portal

## Overview
Forsyth Bridge is a modern, GSAP-powered community resource portal designed to connect Forsyth County residents to essential resources, support services, and opportunities. The site features smooth animations, interactive elements, and a clean, responsive design.

**Project Type:** Static HTML/CSS/JavaScript website  
**Status:** Fully functional and ready for deployment  
**Last Updated:** November 30, 2025

## Project Structure
```
.
├── index.html              # Main HTML file with all sections
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
  - ScrambleText plugin for number counter animations
- **Icons:** Phosphor Icons
- **Server:** Python 3.11 SimpleHTTPServer (development)

## Homepage Sections
1. **Hero** - Animated "Forsyth Bridge" title with mission statement and CTA buttons
2. **Quick Categories** - 8 resource category buttons (Housing, Healthcare, Food, Education, Employment, Family Services, Mental Health, Financial Aid)
3. **Featured Resources** - 4 spotlight resource cards (Emergency Housing, Food Pantry, Healthcare Navigation, Youth Programs)
4. **Impact Statistics** - Animated counters (15,000+ served, 200+ partners, 95% satisfaction, $2.5M distributed)
5. **Upcoming Events** - 3 event preview cards with dates and locations
6. **Testimonials** - 3 success story cards from community members
7. **Partner Logos** - Grid of 6 partner organization placeholders
8. **Call to Action** - Contact information and action buttons
9. **Footer** - Navigation links, social media, and contact details

## Animations
- Hero title character-by-character reveal animation
- Resource cards fade-in on scroll
- Category buttons scale animation on scroll
- Event cards slide-in animation
- Testimonial cards fade-up animation
- Partner logos scale-in animation
- Statistics number scramble counter animation
- CTA section fade-in animation

## Development Setup

### Running Locally
The website runs on a Python HTTP server configured to serve static files on port 5000.

**Server Configuration:**
- Host: `0.0.0.0` (accessible from all network interfaces)
- Port: `5000`
- Cache headers: Disabled for development

The server automatically starts via the "Start server" workflow.

## Deployment

### Deployment Configuration
- **Type:** Static site deployment
- **Public Directory:** `.` (root directory)
- **Files Served:** All HTML, CSS, JS, and image assets

The site is configured for static deployment, serving files directly without server-side processing.

## Customization Notes
- Partner logos section uses placeholders - replace with actual partner logos
- Contact phone number and email in CTA/footer should be updated with real information
- Event dates and locations can be updated as needed
- Resource links currently go to "#" - update with actual resource pages

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- AVIF image support recommended
- JavaScript required for animations and interactivity
- Respects user's `prefers-reduced-motion` accessibility setting
