# Forsyth Bridge - Community Resource Portal

## Overview

Forsyth Bridge is a static community resource portal that connects Forsyth County residents to essential resources, support services, and opportunities. The site is built as a multi-page static website featuring smooth animations, comprehensive resource directories, event calendars, and emergency support information.

**Core Purpose:** Connect individuals and families to community resources including food assistance, mental health services, housing support, healthcare, employment programs, and emergency services.

**Technology Approach:** Pure HTML/CSS/JavaScript static site with GSAP animations, designed for simplicity and broad accessibility without backend dependencies.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 30, 2025)

**Dynamic Data System (CSV Integration):**
- Home page, Events page, and Resources page now load content dynamically from CSV files
- Data files located in `/data/events.csv` and `/data/resources.csv`
- JavaScript loader in `/js/sheets-loader.js` fetches and parses CSV data
- Server provides API endpoints at `/api/sheets/0` (events) and `/api/sheets/1` (resources)
- CSV parser handles multiline fields and quoted content properly
- Date filtering normalized to date-only comparisons (events on today's date show as upcoming)
- Home page displays 4 featured resources and 3 upcoming events dynamically

**Footer Updates:**
- Removed social media links from all pages across the site
- Implemented consistent 2-column footer structure (Resources / Support) across all pages
- Footer now includes: Browse All, Emergency, Help Center, Contact Us links

**Phone Number Removal:**
- Removed phone numbers from all pages EXCEPT emergency crisis hotlines on `/pages/emergency.html`
- Emergency page retains crisis hotlines for suicide prevention, domestic violence, shelter, and other critical services
- Contact methods now primarily use email and contact form

**Design Decisions:**
- Emergency crisis hotlines were intentionally kept as they are essential resources for people in crisis
- Footer simplified to focus on key navigation paths rather than comprehensive site map
- Local CSV files chosen over Google Sheets due to CORS restrictions in browser environments

## System Architecture

### Frontend Architecture

**Static Multi-Page Structure**
- The application uses a traditional multi-page architecture with individual HTML files for each page
- Pages are organized in a hierarchical directory structure (`/pages`, `/pages/about`, `/pages/resources/category`)
- Each page is self-contained with full HTML markup including navigation, header, content, and footer sections

**Design Pattern: Template-Based Pages**
- All pages share a common navigation component and page structure
- Consistent header pattern across pages with hero sections featuring taglines, titles, and descriptions
- Breadcrumb navigation for hierarchical pages (category pages, how-to guides)

**Styling Architecture**
- Base styles via Webflow-generated CSS (`tsa-webmaster-64beab.webflow.shared.56492c9b5.css`)
- Shared custom styles in `shared.css` for common components (page headers, breadcrumbs, cards)
- Inline styles for page-specific customizations
- Responsive design using CSS Grid and Flexbox with clamp() for fluid typography

### Animation System

**GSAP (GreenSock Animation Platform) Integration**
- Core GSAP library for timeline-based animations
- ScrollTrigger plugin for scroll-activated animations on resource cards and sections
- SplitText plugin for character-by-character text animations on hero titles
- ScrambleText plugin for animated number counters in statistics sections

**Animation Patterns**
- Page fade-in on load using CSS keyframe animations
- Scroll-triggered entrance animations for content sections
- Hover effects on interactive elements (cards, buttons) using CSS transitions

### Component Architecture

**Navigation Component**
- Responsive navbar with mobile menu toggle
- Webflow-based navigation system with active state indicators (`w--current` class)
- Consistent across all pages with context-aware highlighting
- Emergency resources highlighted in red for visibility

**Content Components**
- Resource cards: Grid-based layout with category icons, descriptions, and links
- Event cards: Calendar-style listings with date, time, and category information
- Info cards: Used for stats, features, and callout content
- Form components: Contact forms, resource submission forms

**Special Features**
- Quick Exit button on emergency page (redirects to Google for safety in domestic violence situations)
- Search and filter functionality for resources directory
- Category-based resource organization

### Page Types and URL Structure

**Core Pages:**
- Homepage: `/index.html` - Hero, featured resources, stats, events preview
- Resources: `/pages/resources.html` - Main directory with search and filters
- Events: `/pages/events.html` - Calendar view with featured events
- About: `/pages/about.html` - Mission, team, history
- Get Involved: `/pages/get-involved.html` - Volunteer, donate, partner opportunities
- Contact: `/pages/contact.html` - Contact form and information
- Emergency: `/pages/emergency.html` - Crisis hotlines with quick exit

**Supporting Pages:**
- Submit Resource: `/pages/submit-resource.html`
- News: `/pages/news.html`
- Help: `/pages/help.html`
- Partners: `/pages/partners.html`
- Privacy: `/pages/privacy.html`
- Terms: `/pages/terms.html`
- Accessibility: `/pages/accessibility.html`

**Nested Pages:**
- How to Use: `/pages/about/how-to-use.html`
- Category Pages: `/pages/resources/category/[category].html` (food, education, mental health, housing, healthcare, employment, youth services, senior services, recreation)

### Development Server

**Python HTTP Server**
- Python 3.11 HTTP server for local development
- Serves on port 5000
- Custom handler disables caching for development workflow
- Provides API endpoints for CSV data:
  - `/api/sheets/0` - Returns events from `data/events.csv`
  - `/api/sheets/1` - Returns resources from `data/resources.csv`
- No build process required - direct file serving

### Data System

**CSV-Based Dynamic Content**
- Events and resources load dynamically from CSV files in `/data/`
- JavaScript loader (`/js/sheets-loader.js`) handles:
  - Fetching data from server API
  - Parsing CSV with proper quote/multiline handling
  - Rendering event cards and resource cards
  - Search and filter functionality
- To update content: Edit the CSV files directly
- CSV format supports multiline descriptions using quoted fields

## External Dependencies

### JavaScript Libraries

**GSAP Animation Suite (v3.13.0)**
- Core GSAP library (`gsap.min.js`)
- ScrollTrigger plugin for scroll-based animations
- SplitText plugin for text splitting effects
- ScrambleText plugin for number animations
- Draggable plugin for interactive elements
- InertiaPlugin for momentum-based interactions

**jQuery (v3.5.1)**
- DOM manipulation and event handling
- Used by Webflow components

**Webflow Runtime**
- Webflow script for interactive components (navbar, tabs)
- Pre-compiled chunks for performance

### CSS Frameworks & Icons

**Webflow Styles**
- Base CSS framework from Webflow export
- Provides foundational styling and utility classes

**Phosphor Icons (v2.1.1)**
- Icon library loaded via CDN
- Used throughout for visual indicators and UI elements

### Assets & Resources

**Images Directory**
- Favicon and app icons
- OG/social media images
- Content images for resources, events, and pages

### No Database
- No traditional database - content managed via CSV files
- Forms would require third-party integration (not currently implemented)
- No authentication or user accounts

### Future Integration Considerations
- Form submissions would need services like Formspree, Netlify Forms, or similar
- Content could be migrated to a full CMS or database if needed
- Search functionality currently client-side; could be enhanced with search services
- Event calendar could integrate with Google Calendar API or similar