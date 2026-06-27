import Image from "next/image";
import { Bleed, Cell, Grid } from "@/components/layout";
import { content } from "@/lib/content";
import protocolImg from "@/public/images/best3.jpg";

export function Protocol() {
  const { protocol } = content;

  return (
    <Bleed className="section-y border-y border-line py-6 lg:py-10">
      <Grid>
        <Cell lg="1 / 4">
          <p data-anim="fade" className="text-meta text-muted">
            {protocol.eyebrow}
          </p>
        </Cell>
        <Cell lg="5 / 13">
          <h2 data-anim="lines" className="text-h2">
            {protocol.title}
          </h2>
        </Cell>
      </Grid>

      <Grid className="lg:items-end">
        <Cell lg="1 / 6" className="flex flex-col gap-6 lg:gap-10">
          <div className="grid grid-cols-3 border-y border-line">
            {protocol.metrics.map((metric) => (
              <div key={metric.label} className="border-r border-line py-3 pr-3 last:border-r-0">
                <p data-anim="fade" className="text-display">
                  {metric.value}
                </p>
                <p data-anim="fade" className="mt-2 text-meta text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            {protocol.specs.map((spec) => (
              <div key={spec.label} className="relative grid grid-cols-[1fr_1.4fr] gap-4 py-3">
                <span data-anim="fade" className="text-meta text-muted">
                  {spec.label}
                </span>
                <span data-anim="fade" className="text-body">
                  {spec.value}
                </span>
                <span data-anim="rule" className="absolute bottom-0 left-0 h-px w-full origin-left bg-line" />
              </div>
            ))}
          </div>
        </Cell>

        <Cell lg="7 / 12">
          <div data-anim="clip" className="relative overflow-hidden">
            <Image
              src={protocolImg}
              alt={protocol.image.alt}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="block aspect-[4/5] w-full select-none object-cover object-[52%_34%]"
            />
            <div data-fog className="pointer-events-none absolute inset-0 bg-bg/30 backdrop-blur-md" />
          </div>
        </Cell>

        <Cell lg="12 / 13" align="end" className="hidden lg:block">
          <p data-anim="fade" className="[writing-mode:vertical-rl] text-h2">
            Roubaix
          </p>
        </Cell>
      </Grid>

      <Grid>
        <Cell lg="5 / 9">
          <p data-anim="fade" className="text-body">
            {protocol.body[0]}
          </p>
        </Cell>
        <Cell lg="9 / 13">
          <p data-anim="fade" className="text-body text-muted">
            {protocol.body[1]}
          </p>
        </Cell>
      </Grid>
    </Bleed>
  );
}
