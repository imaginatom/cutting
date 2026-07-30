import Image from "next/image";
import { Bleed, Cell, Grid } from "@/components/layout";
import { content } from "@/lib/content";

import work1 from "@/public/images/best1.jpg";
import work2 from "@/public/images/best2.jpg";
import work3 from "@/public/images/best3.jpg";

const images = [work1, work2, work3];

/**
 * The campaign tableaux. On desktop, Motion collapses [data-works] into one
 * pinned viewport and scrubs through the panels (hard cuts: slide or uncover,
 * per data-register). On mobile it stays a plain full-bleed stack — Motion
 * deliberately skips everything inside [data-works] there.
 */
export function Works() {
  const { works } = content;

  return (
    <Bleed className="section-y">
      <Grid>
        <Cell lg="1 / 4">
          <p data-anim="fade" className="text-meta text-muted">
            {works.eyebrow}
          </p>
        </Cell>
        <Cell lg="9 / 13" align="end">
          <p data-anim="fade" className="text-meta text-muted">
            {works.note}
          </p>
        </Cell>
      </Grid>

      <div data-works>
        {works.items.map((item, i) => (
          <article
            key={item.title}
            data-work
            // 03 uncovers slow (stone); 02 arrives as sliding mass (concrete default).
            data-register={i === 2 ? "stone" : undefined}
            className="relative h-[70svh] overflow-hidden lg:h-svh"
          >
            <div data-anim="clip" className="absolute inset-0 overflow-hidden">
              <Image
                src={images[i]}
                alt={item.image.alt}
                fill
                sizes="100vw"
                className="select-none object-cover"
              />
            </div>
            {/* overlay aligned to the site container, title left / meta right */}
            <div className="absolute inset-x-0 bottom-6">
              <Grid>
                <Cell lg="1 / 9">
                  <h3 data-work-title className="text-display text-bg">
                    {item.title}
                  </h3>
                </Cell>
                <Cell lg="9 / 13" align="end">
                  <p data-work-meta className="text-meta text-bg">
                    {item.meta}
                  </p>
                </Cell>
              </Grid>
            </div>
          </article>
        ))}
      </div>
    </Bleed>
  );
}
