# Greenridge Landscaping - Contractor Demo Site

A single-page demo website for a fictional landscaping business in Bentonville, Arkansas. Built as a portfolio piece for local SEO and web development services.

## Business Details

- **Business:** Greenridge Landscaping (fictional)
- **Location:** Bentonville, AR 72712
- **Niche:** Residential landscaping services
- **Service Area:** Northwest Arkansas (25-mile radius from Bentonville)

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (DM Serif Display + Plus Jakarta Sans)
- No frameworks or build tools required

## Design Approach

- **StoryBrand Framework** (Donald Miller) - Customer is the hero, business is the guide
- **Light mode** with dark green/charcoal accents
- **Friendly neighborhood service** aesthetic
- Mobile-first responsive design
- Scroll-triggered animations (respects `prefers-reduced-motion`)

## Features

- Full StoryBrand narrative structure (Hero, Problem, Guide, Plan, Success, CTA)
- 12 landscaping services with custom SVG icons
- Project gallery with placeholder visuals
- Customer testimonials
- FAQ accordion (native `<details>` elements)
- Contact/estimate form (Netlify Forms compatible)
- Back-to-top button
- Sticky header with scroll state

## SEO & Schema

- Complete JSON-LD structured data (`LocalBusiness`, `Organization`, `WebSite`, `FAQPage`)
- Open Graph and Twitter Card meta tags
- `robots.txt` with all major search and AI bot access
- `sitemap.xml`
- Semantic HTML5 with proper heading hierarchy
- Local SEO targeting for NWA cities

## Deployment

Static site ready for Netlify:

```bash
# Just push to a connected repo or drag-and-drop the folder to Netlify
```

The estimate form uses `data-netlify="true"` for automatic form handling on Netlify. On non-Netlify hosts, the form shows a demo success state.

## File Structure

```
├── index.html          # Single-page site with all content and schema
├── css/styles.css      # Design system and responsive styles
├── js/main.js          # Menu, animations, form, scroll behavior
├── robots.txt          # Search engine and AI bot directives
├── sitemap.xml         # XML sitemap
└── README.md           # This file
```

## Service Area Cities

Bentonville, Rogers, Bella Vista, Centerton, Lowell, Cave Springs, Pea Ridge, Highfill, Little Flock, Gravette, Decatur, Gentry, Springdale, Tontitown, Elm Springs, Fayetteville, Farmington, Prairie Grove
