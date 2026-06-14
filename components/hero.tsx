import Image from "next/image";
import { Bleed, Grid } from "@/components/layout";
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
        <div className="col-span-full flex min-h-[50vh] items-end [container-type:inline-size]">
          <h1
            data-anim="heading"
            className="block w-full whitespace-nowrap font-display uppercase leading-[0.82] tracking-[-0.03em] text-[19cqw]"
          >
            {hero.title}
          </h1>
        </div>
      </Grid>

      {/* band — nested 3-column grid: left empty, copy in center + right */}
      <Grid>
        <div className="col-span-full pb-4">
          <Grid sub>
            <div aria-hidden className="hidden lg:col-span-4 lg:block" />
            <p data-anim="fade" className="text-body lg:col-span-4">
              {hero.intro[0]}
            </p>
            <p data-anim="fade" className="text-body text-muted lg:col-span-4">
              {hero.intro[1]}
            </p>
          </Grid>
        </div>
      </Grid>

      {/* media — same content cap (1440) as title + paragraphs, scales by aspect ratio, never cropped */}
      <Grid>
        <Image
          src={heroImg}
          alt={hero.image.alt}
          data-anim="image"
          priority
          sizes="(min-width: 1440px) 1440px, 100vw"
          className="col-span-full block h-auto w-full select-none"
        />
      </Grid>
    </Bleed>
  );
}
