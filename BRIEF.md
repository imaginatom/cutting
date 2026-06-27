# Layout Foundation — Brief

## What this is
A reusable foundation for building editorial sites: a tokens layer, a small
recursive layout primitive, and a documented convention for composing
sections. NOT a specific site — infrastructure to be reused across projects.
Goal: place content freely ON a 12-column system, build static first without
breakage, layer animation later without restructuring, and collapse to mobile
cleanly. Minimal, organised, idiomatic code.

## Stack
Next.js App Router + TypeScript + Tailwind v4 (@theme in globals.css).
No other dependencies in this foundation phase.

## 1 — Tokens (globals.css, @theme)
- Color: define as CSS variables/tokens (a neutral starter palette —
  background, foreground, 2–3 greys, one accent slot). Easy to swap per project.
- Type: one display family, one body family slot (placeholders fine).
  Four role utilities with fluid clamps: .text-display, .text-h2,
  .text-body, .text-meta — exact clamps, line-heights, tracking.
- Spacing: an 8px-based scale.
- Two breakpoints only: base (mobile-first) and lg (1024px).

## 2 — The layout primitive (the core deliverable)
Two composable components, used recursively:

### <Bleed>
Full-width edge-to-edge wrapper (backgrounds, full-bleed media). Optional
background/color. Holds a <Grid> inside for contained content. This is the
"full-bleed outer, contained inner" pattern.

### <Grid>
The 12-column context: max-w-[1440px], mx-auto, fluid gutter
(clamp(16px,1.5vw,24px)) and inline padding (clamp(16px,4vw,64px)).
Renders a CSS grid of 12 columns. Children place themselves with col-span /
col-start utilities.

### Recursion (this delivers "cut it again")
Any grid child can itself contain a <Grid> (or a plain 12-col grid context),
subdividing its own column span freely, to any depth. A box on 8 columns can
hold its own 12-column grid internally. THIS replaces fixed fractional
"cut into 1/3 and 2/3" subdivision — you nest boxes, each owning its layout.

### Height
Height comes from content + padding, NEVER fixed fractions. Vertical structure
= stacked boxes with spacing, OR explicit grid rows only where genuinely
needed (rare). Provide ONE opt-in full-height variant (<Bleed> or a section
prop for min-h-screen / 100svh) for heroes/pinned stages — available, not
default.
Vertical placement within a section uses alignment (self-start/center/end) against content-defined height by default. Explicit grid rows + fixed height only for the opt-in full-height stage variant, never for ordinary content placement.

## 3 — Composition convention (document it)
- Sections are composed as nested SEMANTIC boxes, named by meaning
  (intro, gallery, caption, aside) — NEVER positional names like
  section-1-2-1, which rot on reorder.
- Each box gets the simplest layout that does its job: plain flow if it just
  stacks, a nested <Grid> where it subdivides, flex for tight 1D rows.
- Responsive collapse is built into the primitive: columns are
  grid-cols-1 at base, lg:grid-cols-12 at desktop — stacking on mobile is
  the default behavior, side-by-side is the lg override. Document this as
  THE mobile pattern.

## 4 — Animation-readiness (seams, build now, inert)
- Every element intended to animate later carries a data-anim attribute
  (heading | image | fade | etc.) so a future motion pass selects by
  attribute without touching markup.
- Headings that will mask/reveal already sit in their wrapper elements.
- Sections are server components; where motion will live, a client-island
  stub renders the static markup now.
- Animating later must be ADDITIVE — no layout restructuring required.

## Code standards
Lean, idiomatic, minimal. No premature abstraction — a component only when
its markup repeats. No util sprawl, no config objects for single uses.
Server components by default. Comment the WHY on non-obvious lines only.
Good naming over comments.

## Deliverables
1. globals.css with tokens + type utilities.
2. <Bleed> and <Grid> primitives.
3. ONE example page composing 2–3 sections of varied nested layouts
   (including one full-bleed, one deeply-nested subdivision, one full-height)
   to prove the system — static, responsive, with animation seams.
4. A short LAYOUT.md documenting the convention: how to compose a section,
   how nesting works, the naming rule, the mobile pattern.

## Definition of done
A section can be subdivided to any depth on the grid; static build never
breaks; every layout stacks cleanly to mobile via the documented pattern;
animation can be added later by querying data-anim with zero restructuring.