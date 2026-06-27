import { Bleed, Cell, Grid } from "@/components/layout";
import { content } from "@/lib/content";

export function Footer() {
  const { footer } = content;
  return (
    <Bleed as="footer" className="section-y">
      {/* facts — same band as hero intro: left third open, two columns + contact on the right */}
      <Grid>
        <Cell>
          <Grid sub>
            <Cell lg="5 / 9">
              <div className="flex flex-col gap-3">
                <span data-anim="fade" className="text-meta">
                  {footer.atelier.title}
                </span>
                <address data-anim="fade" className="text-body text-muted not-italic">
                  {footer.atelier.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </Cell>
            <Cell lg="9 / 13">
              <div className="flex flex-col gap-3">
                <span data-anim="fade" className="text-meta">
                  {footer.dispatch.title}
                </span>
                <p data-anim="fade" className="text-body text-muted">
                  {footer.dispatch.line}
                </p>
              </div>
            </Cell>
          </Grid>
        </Cell>
      </Grid>

      {/* brand + nav — display word left, links held to the right two thirds */}
      <Grid>
        <Cell lg="1 / 5">
          <h2 data-anim="lines" className="text-h2 uppercase">
            {footer.brand}
          </h2>
        </Cell>
        <Cell lg="5 / 13" align="end">
          <nav aria-label="Pied de page">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} data-anim="fade" className="text-meta hover:opacity-60">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Cell>
      </Grid>

      {/* closing seam — caption rhythm from bestsellers: meta left, body right */}
      <Grid className="relative pt-[var(--gutter)]">
        <span data-anim="rule" className="absolute left-[var(--pad-inline)] right-[var(--pad-inline)] top-0 h-px origin-left bg-line" />
        <Cell lg="5 / 9">
          <p data-anim="fade" className="text-meta text-muted">
            {footer.copyright}
          </p>
        </Cell>
        <Cell lg="9 / 13" align="end">
          <a
            id="contact"
            href={`mailto:${footer.contact}`}
            data-anim="fade"
            className="text-body text-muted hover:opacity-60"
          >
            {footer.contact}
          </a>
        </Cell>
      </Grid>
    </Bleed>
  );
}
