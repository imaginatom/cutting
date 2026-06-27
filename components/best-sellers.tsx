import Image from "next/image";
import { Bleed, Cell, Grid } from "@/components/layout";
import { content } from "@/lib/content";

import bestSeller1 from "@/public/images/best1.jpg";
import bestSeller2 from "@/public/images/best2.jpg";
import bestSeller3 from "@/public/images/best3.jpg";

/** Number, name/material, and price held on one strict catalog line. */
function Caption({ index, price, title, subtitle }: { index: string; price: string; title: string; subtitle: string }) {
  return (
    <div className="relative grid w-full grid-cols-[auto_1fr_auto] items-end gap-4 pt-2">
      <span data-anim="rule" className="absolute left-0 top-0 h-px w-full origin-left bg-line" />
      <span data-anim="fade" className="text-meta text-muted">
        {index}
      </span>
      <div className="flex flex-col">
        <h3 data-anim="fade" className="text-body">
          {title}
        </h3>
        <p data-anim="fade" className="text-body text-muted">
          {subtitle}
        </p>
      </div>
      <span data-anim="fade" className="text-body">
        {price}
      </span>
    </div>
  );
}

export function BestSellers() {
  const { bestSellers } = content;
  const { feature, pair } = bestSellers;
  const pairImages = [bestSeller2, bestSeller3];

  return (
    <Bleed className="section-y">
      <Grid>
        <Cell lg="1 / 5">
          <h2 data-anim="lines" className="text-h2 uppercase">
            {bestSellers.title}
          </h2>
        </Cell>
        <Cell lg="9 / 13" align="end">
          <p data-anim="fade" className="text-meta text-muted">
            Série portée / demande froide
          </p>
        </Cell>
      </Grid>

      {/* feature — image on the left 8 cols, title + subtitle bottom-aligned on the right 4 cols */}
      <Grid>
        <Cell lg="1 / 9">
          <div data-anim="clip" className="relative overflow-hidden">
            <Image
              src={bestSeller1}
              alt={feature.image.alt}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="block aspect-[16/9] w-full select-none object-cover"
            />
            <div data-fog className="pointer-events-none absolute inset-0 bg-bg/30 backdrop-blur-md" />
          </div>
        </Cell>
        <Cell lg="9 / 13" align="end">
          <Caption
            index="N°01"
            price={feature.price}
            title={feature.title}
            subtitle={feature.subtitle}
          />
        </Cell>
      </Grid>

      {/* pair — left third open, two pieces on the right two thirds, caption under each */}
      <Grid>
        {pair.map((item, i) => (
          <Cell key={item.title} lg={i === 0 ? "5 / 9" : "9 / 13"} className="flex flex-col gap-4">
            <div data-anim="settle" className="relative overflow-hidden">
              <Image
                src={pairImages[i]}
                alt={item.image.alt}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="block aspect-[3/4] w-full select-none object-cover"
              />
              <div data-fog className="pointer-events-none absolute inset-0 bg-bg/30 backdrop-blur-md" />
            </div>
            <Caption
              index={`N°0${i + 2}`}
              price={item.price}
              title={item.title}
              subtitle={item.subtitle}
            />
          </Cell>
        ))}
      </Grid>
    </Bleed>
  );
}
