import type { ElementType, ReactNode } from "react";

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

type BleedProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Opt-in full-height stage: a 100svh floor that still grows with content. Heroes/pinned stages only — never the default. */
  stage?: boolean;
};

/**
 * Full-width, edge-to-edge wrapper (backgrounds, full-bleed media).
 * Pair with a <Grid> inside for contained content: full-bleed outer, contained inner.
 */
export function Bleed({ children, className, as, stage = false }: BleedProps) {
  const Tag = as ?? "section";
  return (
    <Tag
      className={cx(
        "w-full",
        // min-height floor, not a fixed height: content can always exceed it.
        stage && "flex min-h-[100svh] flex-col",
        className,
      )}
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
  /** Widen the cap to the media width (1600) instead of content (1440). For full-width images. */
  wide?: boolean;
};

/**
 * The 12-column context. Stacks to one column at base, 12 columns at lg.
 * Top-level: contained (max-w-1440, centered, fluid inline padding).
 * Children place themselves with col-span / col-start utilities, and any child
 * may nest its own <Grid sub> to subdivide its span to any depth.
 */
export function Grid({ children, className, as, sub = false, wide = false }: GridProps) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cx(
        "grid grid-cols-1 gap-x-[clamp(16px,1.5vw,24px)] lg:grid-cols-12",
        !sub &&
          cx(
            "mx-auto w-full px-[clamp(16px,4vw,64px)]",
            wide ? "max-w-[var(--width-media)]" : "max-w-[var(--width-content)]",
          ),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
