# Project Instructions: nehbPortfolio

Portfolio website for **Bhencyris John Sagaral** (Backend Developer), built with React 19, Vite, and Tailwind CSS v4.

---

## 1. Project Overview

- **Owner:** Bhencyris John Sagaral (Backend Developer)
- **Framework:** React 19 (JSX)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Primary Typography:** Space Mono (local monospace font)
- **Icons:** `lucide-react` (Brand icons like GitHub, LinkedIn are in `src/components/common/Icons.jsx`)

---

## 2. Building and Running

Use `npm` to manage the project:

- **Development Server:** `npm run dev`
- **Production Build:** `npm run build`
- **Linting:** `npm run lint`
- **Preview Build:** `npm run preview`

---

## 3. Design System & Styling (Current UI)

The portfolio follows a sleek, developer-centric dark aesthetic using Tailwind's **Zinc** scale with a **Blue** accent.

### Color Palette

| Role | Tailwind Class | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Main Background** | `bg-zinc-950` | `#09090b` | Root page background |
| **Surface / Badges** | `bg-zinc-900` | `#18181b` | Tech badges, card containers |
| **Borders & Dividers** | `border-zinc-800` | `#27272a` | Section dividers (`<hr>`), badge borders |
| **Primary Text** | `text-zinc-100` | `#f4f4f5` | Main headings (`h1`), badge labels |
| **Accent Color** | `text-blue-500` | `#3b82f6` | Roles, highlights, active/accent links |
| **Muted / Subtext** | `text-zinc-400` | `#a1a1aa` | Bio description, paragraph text |
| **Eyebrow / Overline**| `text-zinc-500` | `#71717a` | Overline labels (e.g. `"Hi, I'M"`) |

### Typography

- **Global Font Family:** `'Space Mono', monospace` (declared in `src/App.css`)
- **Weights:** Regular (`400`) and Bold (`700`)
- **Type Hierarchy:**
  - **Eyebrow Label:** `text-sm font-semibold tracking-wider text-zinc-500 uppercase`
  - **Main Name (`h1`):** `text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100`
  - **Role Subheading (`h2`):** `text-xl sm:text-2xl font-bold tracking-tight text-blue-500`
  - **Body / Bio Text:** `text-base sm:text-md text-zinc-400 leading-relaxed max-w-2xl`
  - **Badge / Chip Text:** `text-xs font-medium text-zinc-100`

### Layout & Spacing Rules

- **Main Container:** `max-w-5xl mx-auto px-6 sm:px-12 lg:px-16`
- **Section Spacing:** `pt-28 pb-8 px-4` (Hero), with section margins consistent across sections.
- **Section Divider:** `<hr className="border-t border-zinc-800 my-10 sm:my-12" />`
- **Badge / Chip Style:**
  - `px-3 py-1 text-xs font-medium text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-sm`

---

## 4. Sections Architecture

- `src/sections/`
  - **`Hero.jsx`** - Eyebrow label, main `h1` name, `h2` role (Blue-500), and tech stack badges.
  - **`Bio.jsx`** - Summary paragraph focusing on PHP, Laravel, MySQL, RESTful APIs, and backend architecture.
  - *(Future modular sections: Projects, Experience, Contact)*
- `src/components/`
  - `common/` - Reusable UI elements (cards, buttons, tags).
  - `layout/` - Headers, navigation bars, footers.
- `src/data/` - Static data files (projects list, skills, experience data) to keep JSX declarative.
- `src/assets/` - Static images, SVGs, and fonts (`SpaceMono-Regular.ttf`, `SpaceMono-Bold.ttf`).

---

## 5. Development Guidelines for Gemini CLI

- **Preserve Existing UI:** Do not alter established UI classes or existing layout without explicit instruction.
- **Styling Convention:** Strictly use Tailwind CSS utility classes matching the existing Zinc + Blue palette.
- **Font Consistency:** Maintain `Space Mono` across all newly created components.
- **Data Decoupling:** Store repeatable list items (e.g. project portfolios, skills) in `src/data/` rather than hardcoding in components.
- **Code Quality:** Ensure all changes pass ESLint (`npm run lint`) and adhere to standard React 19 functional component conventions.
