# Layout convention

A reusable editorial foundation: tokens (`app/globals.css`), two recursive
primitives (`components/layout.tsx`), and the composition rules below. Place
content freely on a 12-column system, build static first, add motion later
without restructuring, and collapse to mobile cleanly.

## Primitives

### `<Bleed>`

Full-width, edge-to-edge wrapper — backgrounds and full-bleed media. Put a
`<Grid>` inside for contained content; put media directly inside for true
edge-to-edge. This is the **full-bleed outer, contained inner** pattern.

```tsx
<Bleed as="header">
  <Grid>…contained content…</Grid>
  <Image className="h-auto w-full" … /> {/* full-bleed, direct child */}
</Bleed>
```

### `<Grid>`

The 12-column context: `max-w-[1440px]`, centered, fluid inline padding
(`clamp(16px,4vw,64px)`) and gutter (`clamp(16px,1.5vw,24px)`). Children place
themselves with `col-span-*` / `col-start-*`.

```tsx
<Grid>
  <div className="lg:col-span-8">…</div>
  <aside className="lg:col-span-4">…</aside>
</Grid>
```

### Recursion — "cut it again"

Any grid child can nest its own grid with `<Grid sub>`. `sub` drops the
container chrome (max-width, centering, inline padding) and lays out 12 columns
inside the parent column's width. A box on 8 columns can hold its own 12-column
grid, to any depth. This replaces fixed fractional "1/3 + 2/3" subdivision —
you nest boxes, each owning its own layout.

```tsx
<Grid>
  <div className="lg:col-span-8">
    <Grid sub>
      <p className="lg:col-span-6">…</p>
      <p className="lg:col-span-6">…</p>
    </Grid>
  </div>
</Grid>
```

## Placement — `<Cell>`

`<Grid sub>` cuts a box into its own 12 columns; `<Cell>` places a block **on**
those columns. You describe **desktop intent only** — `lg` (and optional `row`)
— because base is always a full-width stack, so mobile collapse and resize
follow automatically. No `col-start` classes, no manual base case.

```tsx
<Grid>
  <Cell lg="1 / 9">…image, 8 cols…</Cell>
  <Cell lg="9 / 13" align="end">…caption, bottom-aligned…</Cell>
</Grid>
```

- `lg="3 / 9"` is a CSS `grid-column` range (line 3 to line 9 = 6 columns).
  Grid lines run 1–13, so the last column is `13` and `1 / -1` is full width.
- `col` overrides the base (mobile) span on the rare occasion the stack needs it.
- `align` (`start | center | end`) sets `align-self` against the row height.

### Offset and overlap

Vertical placement is grid-driven, never ad-hoc margins, so it survives resize
and reorder. Put two cells on the **same** `row` to overlap them; give them
**different** rows for controlled offsets.

```tsx
<Grid>
  <Cell lg="1 / 8" row="1">…image…</Cell>
  <Cell lg="6 / 13" row="1" className="self-end">…title overlapping its edge…</Cell>
</Grid>
```

## Packed walls — `<Masonry>`

For Pinterest-style tiles of varied height: one column at base, `cols` at lg.
Each child carries `break-inside-avoid` and its own bottom spacing.

```tsx
<Masonry cols={3} className="px-[var(--pad-inline)]">
  {items.map((it) => (
    <Image key={it.src} {...it} className="mb-6 block w-full break-inside-avoid" />
  ))}
</Masonry>
```

## Composition rules

- **Name boxes by meaning** (`intro`, `gallery`, `caption`, `aside`) — never
  positional names like `section-1-2-1`, which rot on reorder.
- **Simplest layout per box**: plain flow if it just stacks, a nested `<Grid>`
  where it subdivides, flex for tight 1D rows.
- **Mobile is the default.** `<Grid>` is `grid-cols-1` at base and
  `lg:grid-cols-12` at desktop, so everything **stacks on mobile** and goes
  side-by-side only at the `lg:` override. There are exactly two breakpoints:
  base and `lg` (1024px). To keep a column in the desktop layout only (e.g. an
  empty spacer), gate it with `hidden lg:block lg:col-span-*`.

## Height: alignment, not fixed fractions

**Height comes from content + padding. Never fixed fractions, never `h-screen`
for ordinary content.** Vertical structure is stacked boxes with spacing.

- To make a box tall, add padding — not a height. The hero title box is tall
  because of `pt-[clamp(120px,22vh,320px)]` (it also clears the fixed nav) plus
  generous `pb`, **not** a fixed height.
- To place content vertically inside a box, use **alignment** against that
  content-defined height: `items-start` / `items-center` / `items-end`
  (or `self-*` per child). The title sits at the bottom via `flex items-end`,
  with breathing room below from its bottom padding.
- Explicit grid rows + a fixed height are reserved **only** for the opt-in
  full-height stage variant — never for ordinary content placement.

### "100vh but content-flexible"

When a hero or pinned stage should fill the viewport but must still grow with
its content, use the opt-in stage variant — a **floor**, not a cap:

```tsx
<Bleed stage>…</Bleed> /* adds flex min-h-[100svh] flex-col */
```

`min-h-[100svh]` guarantees at least one viewport tall and lets content
overflow naturally; `flex flex-col` lets you push a footer/title down with
`mt-auto` or align with `items-end`. We use `100svh` (small viewport height) so
mobile browser chrome doesn't cause jumps. Never use `h-screen`/`h-[100vh]` for
content — it clips. **The Coldwell proof hero deliberately does *not* use the
stage variant**: it is three stacked boxes in normal flow, proving that a hero
can read as full and imposing through padding + alignment alone, with no fixed
height and no cropping.

## Animation-readiness (seams)

Elements that will animate later carry a `data-anim` attribute
(`heading | image | fade | …`) so a future motion pass selects by attribute
without touching markup. Headings already sit in their own wrapper for
mask/reveal. Sections are server components; where motion will live, a client
island can render the same static markup. **Adding motion later is additive —
no layout restructuring required.**
