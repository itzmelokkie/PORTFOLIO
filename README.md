# Logesh Elavarasan — Portfolio

A high-performance, cinematic personal portfolio engineered with Next.js, TypeScript, Tailwind CSS, and Three.js / React Three Fiber. Designed with a dark obsidian aesthetic, glossy glassmorphism, responsive micro-interactions, and real-time WebGL rendering.

🔗 **Live Portfolio:** [https://logesh-portfolio-alpha.vercel.app/](https://logesh-portfolio-alpha.vercel.app/)  
📦 **GitHub Repository:** [https://github.com/itzmelokkie/PORTFOLIO](https://github.com/itzmelokkie/PORTFOLIO)

---

## About

> "I'm Logesh Elavarasan — a Computer Science & Engineering student who enjoys turning ideas into real, usable software."

Focused on full-stack architecture, real-time web applications, AI integration, and fluid user experiences. I prioritize systematic problem decomposition, clean scalable code, and building high-utility software products.

---

## Features

- **Cinematic Dark & Glossy UI:** Built on an obsidian palette (`#050509`) with delicate hairline technical grids, atmospheric radial gradients, specular glassmorphism panels (`backdrop-blur-2xl`), and luminous violet silk light trails.
- **Interactive 3D Hardware Canvas:** An interactive, procedural 3D Processor Chip rendered in real time using Three.js and React Three Fiber, featuring physical PCB layers, metallic chip dies, instanced gold pin grids, 1,000+ floating particles, and user-controlled rotation via OrbitControls.
- **Optimized 3D Frameloop:** WebGL canvas automatically sleeps (`frameloop="never"`) when scrolled off-screen via IntersectionObserver to conserve battery and GPU resources.
- **Animated Multi-Stage Intro Experience:**
  - Fast, requestAnimationFrame-driven percentage counter (`00%` → `71%`) directly mutating the DOM for 60 FPS execution without React re-renders.
  - Interactive quote stage powered by cursor-reactive smoke text.
  - Gesture-aware transition listener intercepting wheel, touch, keyboard, or click triggers.
  - GPU-accelerated exit choreography unlocking full page navigation.
- **Interactive Cursor & Physics Effects:**
  - `SmokyText`: Real-time organic cursor smoke particle simulation with dynamic upward drift, harmonic wobble, and multi-puff radial gradient dissipation.
  - `CursorGlowCard`: 3D perspective card tilting (`lerp` physics) paired with mouse-following radial purple glow illumination.
- **Scroll-Driven Project Showcase:**
  - Desktop wheel gesture throttling allowing single-scroll transitions between featured projects.
  - Dual-layer GPU transition system featuring simultaneous outgoing blur/translate and incoming glide animations.
  - Mobile-optimized sticky scroll progression with touch threshold buffers.
- **Fully Responsive Architecture:** Pixel-perfect adaptability across ultra-wide monitors, standard laptops, tablets, and compact mobile screens.
- **Connected Contact Section:** Direct access to email, GitHub, LinkedIn, and social profiles with interactive glass pills and status badges.

---

## Tech Stack

### Core Technologies & Frameworks
| Technology | Description |
| :--- | :--- |
| **Next.js 16 (App Router)** | Full-stack React framework with server-side rendering and static optimization |
| **React 19** | Modern component architecture and reactive UI primitives |
| **TypeScript** | Strict static type-checking and end-to-end interface contracts |
| **Tailwind CSS v4** | Next-generation utility-first styling engine with custom `@theme` tokens |

### 3D Graphics & WebGL
| Technology | Description |
| :--- | :--- |
| **Three.js** | Low-level 3D graphics rendering engine |
| **@react-three/fiber** | Declarative React wrapper for Three.js render loops |
| **@react-three/drei** | High-performance 3D helpers (Float, OrbitControls, Environment) |

### Typography & Icons
- **Fonts:** `Space Grotesk` (display headings & body sans) and `JetBrains Mono` (technical badges & data readouts) loaded via `next/font/google`.
- **Icons:** Custom inline SVG icons and brand vectors for crisp rendering and zero external font asset delays.

---

## Projects

### 1. NYXORA
- **Category:** Core Project / Real-Time Messenger
- **Status:** Production • Live on Vercel
- **Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Supabase, Zod, Node.js, WebRTC, Socket.io
- **Description:** A modern, end-to-end encrypted messaging ecosystem featuring decentralized real-time state synchronization, peer-to-peer audio/video streaming, message receipts, online presence tracking, input validation with Zod, and PostgreSQL database integration.
- **Showcase Features:** Interactive dual-pane preview displaying conversation histories, active message threads, typing animations, call/video action bars, and violet message bubbles.

### 2. Jeya Enterprises / Salon ERP
- **Category:** Enterprise Management / ERP Platform
- **Status:** Production • Active Deployment
- **Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, Node.js
- **Description:** A comprehensive enterprise salon operations platform built for Administrators and Staff, managing real-time employee attendance tracking, customer visit logs, automated service billing, appointment scheduling, and revenue analytics.
- **Showcase Features:** Real-time business metrics dashboard (Revenue growth, Bookings count, Staff status) and appointment schedule stream with live status indicators (`In Service`, `Next Up`, `Confirmed`).

### 3. AI-DOC
- **Category:** Document AI / Intelligent Vault
- **Status:** In Beta • Testnet Deployment
- **Tech Stack:** Next.js, React, TypeScript, Python, FastAPI, Tailwind CSS
- **Description:** A smart digital document repository and intelligent vault featuring automated OCR document ingestion, semantic vector search, natural language document discovery, AI summarization, and encrypted cloud storage for rapid retrieval.
- **Showcase Features:** Natural language document search bar, document counter badge (128 Docs), and document records showcasing multi-format support (PDF, DOCX, JSON) with similarity match scores and verification tags.

### 4. Handwriting Document Generator
- **Category:** Document Tool / Canvas Generator
- **Status:** Completed • Open Source
- **Tech Stack:** Python, Flask, TypeScript, Tailwind CSS, Docker
- **Description:** An intelligent synthesis engine that translates digital keystrokes into organic human handwriting styles, offering customizable pen pressures, ink physics (e.g. Royal Navy Blue, Medium Fluid), rule line spacing, and 300 DPI vector PDF exports.
- **Showcase Features:** Side-by-side keystroke source editor, real-time font rendering simulation, rule spacing controls, and one-click vector PDF generation.

### 5. ODIN
- **Category:** Voice AI / Voice Intelligence
- **Status:** R&D Phase • Internal Prototype
- **Tech Stack:** Python, FastAPI, React, TypeScript, Tailwind CSS, Docker
- **Description:** An autonomous contextual voice assistant architecture that executes local operating system tasks, device automations, and natural language command synthesis over a low-latency WebRTC pipeline.
- **Showcase Features:** Real-time audio waveform visualizer bars, pulsating voice orb listening state ("Hey Odin"), terminal-style intent classification and action execution logs, and 60 FPS telemetry readout.

---

## Design System

The portfolio utilizes a cohesive **Cinematic Obsidian & Violet** visual language:

- **Color Palette:**
  - Background Base: `#050509` (Deep Obsidian)
  - Elevated Surfaces: `#08080D` / `#0B0A12`
  - Primary Violet: `#8B5CF6` (Vibrant Purple)
  - Soft Violet / Lavender: `#A78BFA` & `#C4B8F2`
  - High-Contrast Text: `#F5F3FF`
  - Technical Muted Labels: `#A09BAD`
- **Glassmorphism:** Multi-layered translucent panels (`rgba(13, 11, 22, 0.78)`) with `28px` backdrop blurs, delicate violet border strokes (`rgba(167, 139, 250, 0.22)`), and deep ambient drop shadows.
- **Hairline Grids & Orbital Trails:** Ambient vector silk ribbons with multi-stop radial gradients and gaussian blurs, overlaid with a technical hairline coordinate grid (`80px` repeating).
- **HUD Micro-Details:** Monospace technical indicators, bracket framing accents, active navigation pills, and glowing terminal status beacons.

---

## Getting Started

### Prerequisites

- **Node.js:** `v18.18+` or `v20+` LTS recommended
- **Package Manager:** `npm` (bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itzmelokkie/PORTFOLIO.git
   ```

2. Navigate into the project root:
   ```bash
   cd PORTFOLIO
   ```

3. Install project dependencies:
   ```bash
   npm install
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

---

## Production Build

To test or generate a production-ready bundle:

```bash
npm run build
```

To run the built production server locally:

```bash
npm run start
```

---

## Deployment

The portfolio is continuously deployed on **Vercel** with automatic deployment triggers connected to the `main` branch of the GitHub repository. Each commit triggers automated builds, edge routing optimization, and asset CDN distribution.

---

## Repository

- **GitHub:** [https://github.com/itzmelokkie/PORTFOLIO](https://github.com/itzmelokkie/PORTFOLIO)

---

## Contact

Feel free to connect or reach out for collaboration, inquiries, or opportunities:

- **Email:** [logeshelavarasan02@gmail.com](mailto:logeshelavarasan02@gmail.com)
- **GitHub:** [@itzmelokkie](https://github.com/itzmelokkie)
- **LinkedIn:** [Logesh Elavarasan](https://www.linkedin.com/in/logesh-elavarasan-1ab46a359/)
- **Instagram:** [@itzmelokkie](https://instagram.com/itzmelokkie)

---

## License

This project is licensed under the [MIT License](LICENSE) — feel free to use it for personal inspiration.
