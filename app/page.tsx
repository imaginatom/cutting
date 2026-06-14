import { content } from "@/lib/content";
import { Hero } from "@/components/hero";
import { BestSellers } from "@/components/best-sellers";

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[var(--width-content)] items-center justify-between px-[clamp(16px,4vw,64px)] py-4 text-[#f5f3ef]">
        <div className="flex items-center gap-2 text-meta">
          <span>{content.nav.cart}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
        </div>
        <span className="text-meta">{content.nav.menu}</span>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BestSellers />
      </main>
    </>
  );
}
