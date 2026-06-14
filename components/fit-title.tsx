"use client";
import React from "react";
import { useRef, useState, useLayoutEffect } from "react";

export function FitTitle({ children, className = "" }: { children: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const fit = () => {
      if (!box.current || !text.current) return;
      const boxW = box.current.clientWidth;
      const textW = text.current.scrollWidth;
      // scale current size by the ratio of box width to text width
      const current = parseFloat(getComputedStyle(text.current).fontSize);
      setSize(current * (boxW / textW));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [children]);

  return (
    <div ref={box} className="w-full">
      <span
        ref={text}
        className={`block whitespace-nowrap ${className}`}
        style={{ fontSize: size ? `${size}px` : "10vw", lineHeight: 0.82 }}
      >
        {children}
      </span>
    </div>
  );
}