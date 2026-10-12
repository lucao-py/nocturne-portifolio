"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

type Point = { x: number; y: number };

export function usePixelPulse<T extends HTMLElement>() {
  const surfaceRef = useRef<T>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef<Point | null>(null);
  const targetRef = useRef<Point | null>(null);
  const visibleRef = useRef(true);

  const stopPulse = useCallback((element: HTMLElement | null) => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    currentRef.current = null;
    targetRef.current = null;
    element?.removeAttribute("data-pulse-active");
  }, []);

  useEffect(() => {
    const element = surfaceRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) stopPulse(element);
    });
    observer.observe(element);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      if (reducedMotion.matches) stopPulse(element);
    };
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      stopPulse(element);
    };
  }, [stopPulse]);

  function animatePulse() {
    const element = surfaceRef.current;
    const current = currentRef.current;
    const target = targetRef.current;
    if (!element || !current || !target || !visibleRef.current) {
      frameRef.current = null;
      return;
    }

    const dx = target.x - current.x;
    const dy = target.y - current.y;
    current.x += dx * 0.22;
    current.y += dy * 0.22;
    element.style.setProperty("--pulse-pointer-x", `${current.x}px`);
    element.style.setProperty("--pulse-pointer-y", `${current.y}px`);

    if (Math.abs(dx) + Math.abs(dy) > 0.6) {
      frameRef.current = requestAnimationFrame(animatePulse);
    } else {
      frameRef.current = null;
    }
  }

  function onPointerMove(event: PointerEvent<T>) {
    if (event.pointerType !== "mouse" || !visibleRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    targetRef.current = point;
    if (!currentRef.current) {
      currentRef.current = { ...point };
      event.currentTarget.style.setProperty("--pulse-pointer-x", `${point.x}px`);
      event.currentTarget.style.setProperty("--pulse-pointer-y", `${point.y}px`);
    }
    if (!event.currentTarget.hasAttribute("data-pulse-active")) event.currentTarget.dataset.pulseActive = "true";
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animatePulse);
  }

  function onPointerLeave(event: PointerEvent<T>) {
    stopPulse(event.currentTarget);
  }

  return { surfaceRef, onPointerMove, onPointerLeave };
}
