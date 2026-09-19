# Akib Siddiki — Personal Portfolio Website

A minimal, high-performance personal portfolio website for **Akib Siddiki**, Full Stack PHP/Laravel & Flutter Developer based in Dhaka, Bangladesh.

Inspired by the dark, developer-centric aesthetic of [mubx.dev](https://mubx.dev/) with original design, typography, and content derived strictly from [Akib Siddiki's verified portfolio](https://akibsiddiki.github.io/AkibSiddiki/).

---

## 🚀 Core Technologies

Built **strictly** using vanilla web technologies. Zero external JavaScript or CSS libraries:

- **HTML5**: Semantic document hierarchy, accessible ARIA roles, and Schema.org `Person` JSON-LD structured data.
- **CSS3**: Custom CSS design system, fluid `clamp()` typography, CSS Grid & Flexbox, hardware-accelerated animations, and `@media (prefers-reduced-motion)` compliance.
- **Vanilla JavaScript**: Zero dependencies. Native `IntersectionObserver` scroll-spy, typewriter terminal emulation, custom magnetic cursor, clipboard integration, and live Dhaka timezone clock.

---

## 📂 Project Structure

```
akib-siddiki/
├── index.html               # Main semantic HTML5 document
├── css/
│   └── style.css            # Complete design system & responsive styling
├── js/
│   └── script.js            # Vanilla JS interactions, cursor & observers
├── assets/
│   ├── images/
│   │   └── me.png           # Profile photo
│   └── icons/               # Inline SVGs embedded in HTML for zero network latency
└── README.md                # Documentation & maintenance guide
```

---

## ⚡ Key Highlights & Sections

1. **Header & Navigation**: Sticky glass navigation (`backdrop-filter: blur(16px)`), status indicator (`● Available for opportunities`), smooth anchor links, and mobile drawer.
2. **Hero Section**: Large typography headline, terminal console (`$ whoami`, `$ role`, `$ stack`, dynamic typed commands), and dual call-to-actions.
3. **About Me**: Editorial split layout, production metrics (`4+` years, `15+` portals), and architectural philosophy (Practical Impact, Performance-First, Clean Code).
4. **Career Milestones (Timeline)**: Software Engineer & Junior Software Engineer roles at **eMythMakers.com** (2022–Present) and education credentials (Eastern University CSE & Tangail Polytechnic).
5. **Tech Stack**: Categorized into Backend & Core, Databases & Caching, Mobile Development, Frontend & UI, and Cloud & Infrastructure with interactive hover animations.
6. **Featured Production Projects**:
   - `01` **bdnews24 Mobile Application** (Flutter · Dart · Laravel REST API · Firebase FCM)
   - `02` **Samakal Digital News Publishing Platform** (Laravel · PHP · MySQL · Redis Caching)
   - `03` **Step Footwear E-Commerce & Inventory Hub** (Laravel · MySQL · Payment Gateway API)
   - `04` **Enterprise HRM & Workforce Management System** (Laravel · MySQL · RBAC · Payroll Engine)
   - `05` **eMythMakers Dynamic CMS & Publishing Framework** (Laravel · PHP · MySQL · AWS S3)
   - High-fidelity visual application showcases in a responsive two-column grid with live production status badges.
7. **What I Do / Expertise**: 6 structured engineering disciplines.
8. **Development Philosophy**: Real-world engineering principles on simplicity, database normalization, performance, and pragmatic utility.
9. **Contact & Channels**: 1-click email copy with toast feedback, direct WhatsApp/phone link, LinkedIn, and GitHub.
10. **Footer**: Real-time Dhaka clock (`UTC+6`), copyright, back-to-top button, and technology transparency note.

---

## 🛠️ Local Development & Preview

To preview the website locally, run any static file server:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node (npx)
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.
