import Image from "next/image";
import { Bleed, Cell, Grid } from "@/components/layout";
import { content } from "@/lib/content";
import heroImg from "@/public/images/coldwell-hero.png";

export function Hero() {
  const { hero } = content;
  return (
    <Bleed as="header" className="section-y">
      {/* title — fills its column width via cqw (no JS), bottom-aligned in a tall block.
          container-type makes 1cqw == 1% of this box; the word never overflows because
          its size is derived from that width. */}
      <Grid>
        <div className="col-span-full [container-type:inline-size]">
          {/* 3 rows, title in the bottom one: space above = 2x its height. line is 0.82em (leading) → 2 * 0.82 = 1.64em.
              em resolves against the title's own cqw font-size, so the ratio holds at every width. */}
          {/* negative bottom margin trims the line-box slack below the baseline so the uppercase
              glyphs sit flush with the bottom edge. tuned to leading-[0.82]; works in all browsers. */}
          <h1
            data-hero="title"
            className="block w-full whitespace-nowrap pt-[1.64em] mb-[-0.14em] font-display uppercase leading-[0.82] tracking-[-0.03em] text-[19cqw]"
          >
            {hero.title}
          </h1>
        </div>
      </Grid>

      {/* band — copy held to the right two thirds, left third left open */}
      <Grid>
        <Cell>
          <Grid sub>
            <Cell lg="5 / 9">
              <p data-hero="fade" className="text-body">
                {hero.intro[0]}
              </p>
            </Cell>
            <Cell lg="9 / 13">
              <p data-hero="fade" className="text-body text-muted">
                {hero.intro[1]}
              </p>
            </Cell>
          </Grid>
        </Cell>
      </Grid>

      {/* media — same content cap (1440) as title + paragraphs, scales by aspect ratio, never cropped */}
      <Grid>
        <div className="col-span-full overflow-hidden">
          <Image
            src={heroImg}
            alt={hero.image.alt}
            data-hero="image"
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="block h-auto w-full select-none"
          />
        </div>
      </Grid>
    </Bleed>
  );
}
