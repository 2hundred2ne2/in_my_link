"use client";

import { useEffect } from "react";

import confetti from "canvas-confetti";

/**동적 페이지 설정 */
export const dynamic = "force-dynamic";

/**색종이 날림 효과 애니메이션 */
export function FireWorks() {
  useEffect(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 10, spread: 360, ticks: 40, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const handleIntervalState = () => {
        return clearInterval(interval);
      };

      const particleCount = 50 * (timeLeft / duration);
      /**왼쪽 폭죽 */
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.3, 0.5), y: Math.random() - 0.2 },
      });
      /**오른쪽 폭죽 */
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.5, 0.7), y: Math.random() - 0.2 },
      });

      /**뒤로가기, 앞으로가기 감지 */
      window.addEventListener("pushstate", handleIntervalState);
      window.addEventListener("popstate", handleIntervalState);

      /**Cleanup the event listener on component unmount */
      return () => {
        window.removeEventListener("pushstate", handleIntervalState);
        window.removeEventListener("popstate", handleIntervalState);
      };
    }, 250);
  }, []);

  return <></>;
}
