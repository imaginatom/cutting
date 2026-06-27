import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

type BleedProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Opt-in full-height stage: a 100svh floor that still grows with content. Heroes/pinned stages only — never the default. */
  stage?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * Full-width, edge-to-edge wrapper (backgrounds, full-bleed media).
 * Pair with a <Grid> inside for contained content: full-bleed outer, contained inner.
 */
export function Bleed({ children, className, as, stage = false, ...rest }: BleedProps) {
  const Tag = as ?? "section";
  return (
    <Tag
      className={cx(
        // flex column so stacked <Grid> children are spaced by the gutter, matching the column gap.
        "flex w-full flex-col gap-[var(--gutter)]",
        // min-height floor, not a fixed height: content can always exceed it.
        stage && "min-h-[100svh]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type GridProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  sub?: boolean;
};

/**
 * The 12-column context. Stacks to one column at base, 12 columns at lg.
 * Top-level: contained (max-w-1440, centered, fluid inline padding capped at 32px).
 * Children place themselves with col-span / col-start utilities, and any child
 * may nest its own <Grid sub> to subdivide its span to any depth.
 */
export function Grid({ children, className, as, sub = false }: GridProps) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cx(
        // full gap (not just gap-x): on mobile cells stack to one column and need the row-gap too.
        "grid grid-cols-1 gap-[var(--gutter)] lg:grid-cols-12",
        !sub && "mx-auto w-full max-w-[var(--width-content)] px-[var(--pad-inline)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type CellProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** base grid-column (mobile). Defaults to a full-width stack. */
  col?: string;
  /** desktop grid-column, e.g. "3 / 9". Mobile collapse follows for free. */
  lg?: string;
  /** desktop grid-row, e.g. "1" — for vertical offset / overlap. */
  row?: string;
  align?: "start" | "center" | "end";
};

/**
 * Place a block on the parent 12-column <Grid>. You only describe DESKTOP intent
 * (lg / row); base is a full-width stack, so responsiveness follows automatically.
 * Same lg row on two cells overlaps them; different rows give controlled offsets.
 */
export function Cell({ children, className, as, col, lg, row, align }: CellProps) {
  const Tag = as ?? "div";
  const style = {
    "--cell-col": col,
    "--cell-col-lg": lg,
    "--cell-row-lg": row,
    "--cell-align": align,
  } as CSSProperties;
  return (
    <Tag className={cx("cell", className)} style={style}>
      {children}
    </Tag>
  );
}

type MasonryProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** desktop column count for the packed wall. Base is always one column. */
  cols?: number;
};

/**
 * Packed wall (Pinterest-style): items reflow into `cols` columns at lg, one column
 * at base. Each child should carry `break-inside-avoid` and bottom spacing.
 */
export function Masonry({ children, className, as, cols = 3 }: MasonryProps) {
  const Tag = as ?? "div";
  return (
    <Tag className={cx("masonry", className)} style={{ "--masonry-cols": cols } as CSSProperties}>
      {children}
    </Tag>
  );
}
