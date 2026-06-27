import { Bleed, Cell, Grid } from "@/components/layout";
import { StoreVideo } from "@/components/store-video";
import { content } from "@/lib/content";

export function Store() {
  const { store } = content;
  return (
    <Bleed as="section" data-store className="section-y">
      <Grid>
        <Cell lg="1 / 4">
          <p data-anim="fade" className="text-meta text-muted">
            {store.eyebrow}
          </p>
        </Cell>
        <Cell lg="5 / 13">
          <h2 data-anim="lines" className="text-h2">
            {store.title}
          </h2>
        </Cell>
      </Grid>

      <Grid className="lg:items-end">
        <Cell lg="2 / 7">
          <div data-anim="settle" className="overflow-hidden">
            <StoreVideo src="/videos/store.mp4" />
          </div>
        </Cell>

        <Cell lg="7 / 8" align="end" className="hidden lg:block">
          <p data-anim="fade" className="[writing-mode:vertical-rl] text-h2">
            {store.vertical}
          </p>
        </Cell>

        <Cell lg="9 / 13" className="flex flex-col gap-8 border-y border-line py-4 lg:py-6">
          <p data-anim="fade" className="text-body">
            {store.intro}
          </p>

          <div>
            {store.details.map((detail) => (
              <div key={detail.label} className="relative grid grid-cols-[1fr_1.5fr] gap-4 py-3">
                <span data-anim="rule" className="absolute left-0 top-0 h-px w-full origin-left bg-line" />
                <span data-anim="fade" className="text-meta text-muted">
                  {detail.label}
                </span>
                <span data-anim="fade" className="text-body">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          <a href="#contact" data-anim="fade" className="text-meta hover:opacity-60">
            {store.cta}
          </a>
        </Cell>
      </Grid>
    </Bleed>
  );
}
