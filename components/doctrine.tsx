import Image from "next/image";
import { Bleed, Cell, Grid } from "@/components/layout";
import { content } from "@/lib/content";
import doctrineImg from "@/public/images/best2.jpg";

export function Doctrine() {
  const { doctrine } = content;

  return (
    <Bleed className="section-y bg-fg py-6 text-bg lg:py-12">
      <Grid>
        <Cell lg="1 / 4">
          <p data-anim="fade" className="text-meta opacity-70">
            {doctrine.eyebrow}
          </p>
        </Cell>
        <Cell lg="5 / 11">
          <p data-anim="fade" className="text-body">
            {doctrine.thesis}
          </p>
        </Cell>
      </Grid>

      <Grid className="lg:items-stretch">
        <Cell lg="1 / 10" row="1" className="relative z-10 flex flex-col justify-between gap-10 border-y border-bg py-4 lg:py-10">
          <h2 data-anim="lines" className="max-w-[11ch] text-display">
            {doctrine.title}
          </h2>
          <p data-anim="fade" className="text-meta opacity-70">
            {doctrine.footnote}
          </p>
        </Cell>

        <Cell lg="6 / 10" row="1" align="center" className="relative z-0 lg:-my-16 lg:-translate-x-6">
          <div data-anim="settle" className="overflow-hidden">
            <Image
              src={doctrineImg}
              alt={doctrine.image.alt}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="block aspect-[3/4] w-full select-none object-cover object-[50%_14%] grayscale"
            />
          </div>
        </Cell>

        <Cell lg="10 / 13" row="1" align="end" className="relative z-10 flex flex-col border-y border-bg lg:border-l lg:pl-4">
          {doctrine.principles.map((principle) => (
            <div key={principle.index} className="relative grid grid-cols-[auto_1fr] gap-4 py-4">
              <span data-anim="fade" className="text-meta opacity-70">
                {principle.index}
              </span>
              <div>
                <h3 data-anim="fade" className="text-body">
                  {principle.title}
                </h3>
                <p data-anim="fade" className="mt-2 text-body opacity-70">
                  {principle.text}
                </p>
              </div>
              <span data-anim="rule" className="absolute bottom-0 left-0 h-px w-full origin-left bg-bg" />
            </div>
          ))}
        </Cell>
      </Grid>
    </Bleed>
  );
}
