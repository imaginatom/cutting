"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Nearest data-register decides pacing: stone uncovers slower, concrete arrives heavier.
const isStone = (el: Element) =>
  el.closest("[data-register]")?.getAttribute("data-register") !== "concrete";

export function Motion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // Lock viewport height once — mobile URL bar show/hide won't resize heroes.
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener("orientationchange", setVh);

    // matchMedia is a gsap context — scoped to the ref, fully reverted on cleanup.
    const mm = gsap.matchMedia(scope);
    let cancelled = false;

    // The site's signature uncover: slow start, very long settle — mass coming
    // to rest. Nothing overshoots. Used on every subtraction/cut moment.
    CustomEase.create("cold", "0.16, 0.84, 0.24, 1");

    // Pre-hide the desktop hero entrance targets synchronously, before paint, so
    // the final state never flashes before the font-gated timeline starts. Mobile
    // has no hero timeline, so hiding it there would blank the first screen.
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopMotion = window.matchMedia("(min-width: 1024px)").matches;
    if (motionOk && desktopMotion && scope.current) {
      const r = scope.current;
      gsap.set(r.querySelectorAll("[data-hero='title'], [data-hero='fade']"), { opacity: 0 });
      gsap.set(r.querySelectorAll("[data-hero='image']"), {
        clipPath: "inset(100% 0% 0% 0%)",
      });
    }

    // Split and measure only once fonts have settled, so line breaks are final.
    document.fonts.ready.then(() => {
      if (cancelled) return;

      // gsap.matchMedia only invokes the handler when a condition MATCHES, so
      // mobile needs its own query — without it nothing runs below 1024px and
      // the only animations a phone can ever see are desktop ones reverting
      // mid-flight at the breakpoint (the hero "scale snap").
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const root = scope.current!;

          if (ctx.conditions?.reduce) {
            // Everything visible, nothing moves — no Lenis. But the glass would
            // otherwise sit there frosting the image forever, so clear it.
            gsap.set(root.querySelectorAll("[data-fog]"), { "--fog": 1 });
            return;
          }

          // One clock, created only where motion runs: Lenis on gsap's ticker,
          // ScrollTrigger reads Lenis. Torn down by this context's cleanup.
          const lenis = new Lenis({ anchors: true, wheelMultiplier: 0.9 });
          lenis.on("scroll", ScrollTrigger.update);
          const tick = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);

          const seams = (name: string) =>
            Array.from(root.querySelectorAll<HTMLElement>(`[data-anim='${name}']`)).filter(
              (el) => !el.closest("[data-works]") // the pinned sequence owns its children
            );

          if (ctx.conditions?.mobile) {
            // Mobile: no pins, no splits, no parallax — simple fades only. The
            // hero carries no data-anim hooks, so it never animates here.
            // Elements already on screen are skipped: hiding them when late JS
            // lands would blank the view and re-register LCP.
            gsap.set(root.querySelectorAll("[data-hero='title'], [data-hero='fade']"), { opacity: 1 });
            gsap.set(root.querySelectorAll("[data-hero='image']"), {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              yPercent: 0,
            });

            for (const name of ["lines", "clip", "settle", "fade"]) {
              for (const el of seams(name)) {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
                gsap.from(el, {
                  opacity: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: { trigger: el, start: "top 90%", once: true },
                });
              }
            }
            for (const el of seams("rule")) {
              if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
              gsap.from(el, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              });
            }
            // Glass: no scrub on mobile — dissolve the feathered band once on enter.
            for (const fog of root.querySelectorAll<HTMLElement>("[data-fog]")) {
              gsap.fromTo(
                fog,
                { "--fog": 0 },
                {
                  "--fog": 1,
                  duration: 1.2,
                  ease: "power2.in",
                  scrollTrigger: { trigger: fog.parentElement, start: "top 85%", once: true },
                },
              );
            }

            return () => {
              gsap.ticker.remove(tick);
              lenis.destroy();
              gsap.ticker.lagSmoothing(500, 33);
            };
          }

          // — Œuvres: pinned, scrubbed hard-cut sequence. Created first so its pin
          // spacer is in the layout before the on-enter triggers below measure.
          const works = root.querySelector<HTMLElement>("[data-works]");
          if (works) {
            const panels = Array.from(works.querySelectorAll<HTMLElement>("[data-work]"));
            const imgs = panels.map((p) => p.querySelector<HTMLElement>("[data-anim] img"));
            const titles = panels.map((p) =>
              p.querySelector<HTMLElement>("[data-work-title]")
            );
            const metas = panels.map((p) =>
              p.querySelector<HTMLElement>("[data-work-meta]")
            );

            // Collapse the sticky stack into one pinned viewport of layered panels.
            // svh + hidden: Safari's dynamic toolbar makes 100vh overflow the visible
            // viewport, and Safari <16 ignores overflow:clip (concrete panels would
            // paint over the next section while sliding in).
            gsap.set(works, { position: "relative", height: "100svh", overflow: "hidden" });
            gsap.set(panels, {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: (i: number) => i + 1,
            });
            gsap.set(imgs, { scale: 1.1 }); // headroom for inner drift

            // Work 01 uncovers as the section approaches — once, outside the
            // scrub — so the pin engages with it fully present and it never
            // re-hides on scroll-up.
            const first = panels[0]?.querySelector("[data-anim]");
            if (first) {
              gsap.fromTo(
                first,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 1.4,
                  ease: "cold",
                  scrollTrigger: { trigger: works, start: "top 75%", once: true },
                }
              );
            }

            // 1.5 viewports of scroll per work.
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: works,
                start: "top top",
                end: () => `+=${panels.length * window.innerHeight * 1.2}`,
                pin: true,
                pinType: "fixed", // Lenis drives native scroll, so fixed pinning stays in sync
                anticipatePin: 1,
                scrub: 1,
              },
            });

            panels.forEach((panel, i) => {
              // 1 unit of timeline per work — the gap before each cut is the hold.
              if (i > 0) {
                if (panel.dataset.register === "stone") {
                  // Subtraction: the full panel is uncovered from the bottom, slow.
                  tl.fromTo(
                    panel,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "cold" },
                    i
                  );
                } else {
                  // Addition: the panel arrives as mass — faster, heavier, then settles.
                  tl.fromTo(
                    panel,
                    { yPercent: 100 },
                    { yPercent: 0, duration: 0.32, ease: "power3.out" },
                    i
                  );
                  const frame = panel.querySelector("[data-anim]");
                  if (frame) {
                    tl.fromTo(
                      frame,
                      { scale: 1.08 },
                      { scale: 1, duration: 0.45, ease: "power2.out" },
                      i + 0.08
                    );
                  }
                }
              }
              // Inner drift across each work's hold — life inside the frame.
              if (imgs[i]) {
                tl.fromTo(
                  imgs[i],
                  { yPercent: -2.5 },
                  { yPercent: 2.5, duration: 1.4, ease: "none" },
                  i
                );
              }
              // Title drifts the other way — counterweight to the image.
              if (titles[i]) {
                tl.fromTo(
                  titles[i],
                  { yPercent: 30 },
                  { yPercent: -10, duration: 1.4, ease: "none" },
                  i
                );
              }
              if (metas[i]) {
                tl.fromTo(
                  metas[i],
                  { yPercent: 15 },
                  { yPercent: -15, duration: 1.4, ease: "none" },
                  i
                );
              }
            });
          }

          // — Hero entrance: a single choreographed reveal on load.
          //   Order: title unmasks first, then the image, then copy + nav land
          //   together. One timeline so the sequence is explicit, not delay-juggled.
          const heroTitle = root.querySelector<HTMLElement>("[data-hero='title']");
          const heroImg = root.querySelector<HTMLElement>("[data-hero='image']");
          const heroFade = gsap.utils.toArray<HTMLElement>("[data-hero='fade']", root);

          // Absolute positions so ordering survives SplitText's async insertion:
          // the title sub-timeline is added at 0 from inside onSplit (it can land
          // after the image/fade are appended), while image + fade sit at fixed
          // times. Title leads; image follows; copy + nav land with the image.
          const intro = gsap.timeline();

          if (heroTitle) {
            SplitText.create(heroTitle, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) => {
                const t = gsap.timeline();
                // Restore the opacity we pre-hid with; the reveal itself is the mask.
                t.set(heroTitle, { opacity: 1 });
                t.from(self.lines, {
                  yPercent: 110,
                  duration: 0.8,
                  stagger: 0.04,
                  ease: "power3.out",
                });
                intro.add(t, 0);
                return t;
              },
            });
          }

          // Image: clip up from the bottom inside its overflow-hidden wrapper,
          // image held at 1.1 and settling to 1 — mass arriving, after the title.
          if (heroImg) {
            intro.fromTo(
              heroImg,
              { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.8, ease: "cold" },
              0.7,
            );
          }

          // Copy + nav: unmask together, with the image.
          if (heroFade.length) {
            intro.fromTo(
              heroFade,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
              0.9,
            );
          }

          // Image life: drifts inside its frame as the page leaves.
          if (heroImg) {
            gsap.fromTo(
              heroImg,
              { yPercent: 0 },
              {
                yPercent: 14,
                ease: "none",
                scrollTrigger: {
                  trigger: heroImg.parentElement, // the overflow-hidden frame
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }

          // — Masked line reveals, split after fonts, once on enter.
          for (const el of seams("lines")) {
            const slow = isStone(el);
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: slow ? 1.1 : 0.9,
                  stagger: slow ? 0.12 : 0.09,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 85%", once: true },
                }),
            });
          }

          // — Stone uncovers: clip-path from the bottom, subtraction made visible.
          for (const el of seams("clip")) {
            gsap.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: isStone(el) ? 1.4 : 1.1,
                ease: "cold",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
              }
            );
          }

          // — Concrete arrivals: scale-only settle, mass pressing into place. No fade.
          for (const el of seams("settle")) {
            gsap.from(el, {
              scale: isStone(el) ? 1.04 : 1.08,
              duration: isStone(el) ? 1.5 : 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
          }

          // — Quiet fades for body copy.
          for (const el of seams("fade")) {
            gsap.from(el, {
              opacity: 0,
              y: 24,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          }

          // — Rules: hairlines draw across catalog/spec rows. The line itself
          // transforms, so text and grid layout never get squeezed.
          for (const el of seams("rule")) {
            gsap.from(el, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.1,
              ease: "cold",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          }

          // — Image life: every clipped frame holds its image at 1.1, drifting
          // slowly inside the mask on scroll. Moves within the frame, never out.
          for (const frame of [...seams("clip"), ...seams("settle")]) {
            const img = frame.querySelector("img");
            if (!img) continue;
            gsap.set(img, { scale: 1.1 });
            gsap.fromTo(
              img,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          }

          // — Foggy glass: a frosted overlay that dissolves top→down as the frame
          // rises. A feathered gradient mask (CSS) does the wipe — driving --fog
          // 0→1 slides that soft band down, so no hard edge is ever visible. The
          // power2.in ease makes the dissolve non-linear: slow to part, then quick.
          for (const fog of root.querySelectorAll<HTMLElement>("[data-fog]")) {
            gsap.fromTo(
              fog,
              { "--fog": 0.2 },
              {
                "--fog": 0.8,
                ease: "power2.in",
                scrollTrigger: {
                  trigger: fog.parentElement,
                  start: "top 90%",
                  end: "top 30%",
                  scrub: true,
                },
              },
            );
          }

          // — The process cluster: three depths, three speeds. Far barely moves,
          // near presses forward. The one multi-speed parallax on the site.
          const cluster = root.querySelector<HTMLElement>("[data-cluster]");
          if (cluster) {
            const speed = { far: -40, mid: -100, near: -180 };
            for (const el of cluster.querySelectorAll<HTMLElement>("[data-depth]")) {
              gsap.to(el, {
                y: speed[el.dataset.depth as keyof typeof speed],
                ease: "none",
                scrollTrigger: {
                  trigger: cluster,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            }
          }

          // Restore default lag smoothing — desktop & mobile share this teardown.
          return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            gsap.ticker.lagSmoothing(500, 33);
          };
        }
      );
    });

    return () => {
      cancelled = true;
      window.removeEventListener("orientationchange", setVh);
      mm.revert();
    };
  }, []);

  return <main ref={scope}>{children}</main>;
}
