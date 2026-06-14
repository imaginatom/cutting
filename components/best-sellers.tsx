import Image from "next/image";
import { Bleed, Grid } from "@/components/layout";
import { content } from "@/lib/content";
import featureImg from "@/public/images/coldwell-hero.png";

export function BestSellers() {
  const { bestSellers } = content;
  const { feature } = bestSellers;
  return (
    <Bleed className="section-y">
      <Grid>
        <h2 data-anim="heading" className="col-span-full text-h2 uppercase">
          {bestSellers.title}
        </h2>
      </Grid>

      {/* feature — image on the left 8 cols, title + subtitle on the right 4 cols */}
      <Grid className="mt-8">
        <div className="lg:col-span-8">
          <Image
            src={featureImg}
            alt={feature.image.alt}
            data-anim="image"
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="block aspect-[4/3] w-full select-none object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 lg:col-span-4 lg:self-end">
          <h3 data-anim="fade" className="text-h2">
            {feature.title}
          </h3>
          <p data-anim="fade" className="text-body text-muted">
            {feature.subtitle}
          </p>
        </div>
      </Grid>
    </Bleed>
  );
}
