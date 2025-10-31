"use client";

import { useEffect, useRef } from "react";

const BACKGROUND = "#0b0f1f";
const SOFA_BASE = "#4a2d1e";
const SOFA_HIGHLIGHT = "#8c5631";
const SKIN_TONE = "#3d2923";
const BEARD_TONE = "#2a1a16";
const SHIRT_COLOR = "#2d3f63";
const PANTS_COLOR = "#1a2538";
const MUG_COLOR = "#f0ebe1";

const AnimatedScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame: number;
    let frame = 0;

    const drawRoundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      const radius = Math.max(0, r);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    };

    const drawSteam = (ctx: CanvasRenderingContext2D, originX: number, originY: number) => {
      ctx.save();
      ctx.translate(originX, originY);
      const steamCount = 3;
      for (let i = 0; i < steamCount; i += 1) {
        const progress = (frame * 0.02 + i * 0.8) % Math.PI;
        const offsetY = Math.sin(progress) * 8;
        const offsetX = Math.cos(progress * 1.2) * 4;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.4 - i * 0.08})`;
        ctx.lineWidth = 2;
        ctx.moveTo(offsetX, -i * 14 - offsetY);
        ctx.bezierCurveTo(
          offsetX + 6,
          -i * 18 - 10 - offsetY,
          offsetX - 6,
          -i * 22 - 18 - offsetY,
          offsetX,
          -i * 28 - 20 - offsetY
        );
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      context.save();
      context.clearRect(0, 0, width, height);
      context.fillStyle = BACKGROUND;
      context.fillRect(0, 0, width, height);

      const shadowGradient = context.createRadialGradient(
        width / 2,
        height * 0.75,
        40,
        width / 2,
        height * 0.75,
        width * 0.6
      );
      shadowGradient.addColorStop(0, "rgba(0,0,0,0.35)");
      shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = shadowGradient;
      context.fillRect(0, height * 0.55, width, height * 0.45);

      const sofaHeight = height * 0.38;
      const sofaTop = height * 0.48;
      const sofaGradient = context.createLinearGradient(0, sofaTop, 0, sofaTop + sofaHeight);
      sofaGradient.addColorStop(0, SOFA_HIGHLIGHT);
      sofaGradient.addColorStop(1, SOFA_BASE);

      context.fillStyle = sofaGradient;
      const sofaRadius = 28;
      const sofaWidth = width * 0.72;
      const sofaLeft = (width - sofaWidth) / 2;

      drawRoundedRect(context, sofaLeft, sofaTop, sofaWidth, sofaHeight, sofaRadius);

      context.fillStyle = "#2b1c12";
      drawRoundedRect(
        context,
        sofaLeft + sofaWidth * 0.05,
        sofaTop + sofaHeight * 0.25,
        sofaWidth * 0.9,
        sofaHeight * 0.65,
        sofaRadius * 0.6
      );

      context.save();
      context.clip();
      context.fillStyle = "rgba(0,0,0,0.18)";
      context.fillRect(width / 2 - 2, sofaTop + sofaHeight * 0.27, 4, sofaHeight * 0.6);
      context.restore();

      const bodyCenterX = width / 2;
      const bodyBottomY = sofaTop + sofaHeight * 0.9;
      const shirtHeight = sofaHeight * 0.75;
      const shirtWidth = sofaWidth * 0.32;

      context.fillStyle = SHIRT_COLOR;
      drawRoundedRect(
        context,
        bodyCenterX - shirtWidth / 2,
        bodyBottomY - shirtHeight,
        shirtWidth,
        shirtHeight,
        24
      );

      context.fillStyle = PANTS_COLOR;
      context.beginPath();
      context.moveTo(bodyCenterX - shirtWidth * 0.45, bodyBottomY - shirtHeight * 0.12);
      context.quadraticCurveTo(
        bodyCenterX - shirtWidth * 0.3,
        bodyBottomY + shirtHeight * 0.15,
        bodyCenterX - shirtWidth * 0.1,
        bodyBottomY
      );
      context.lineTo(bodyCenterX + shirtWidth * 0.1, bodyBottomY);
      context.quadraticCurveTo(
        bodyCenterX + shirtWidth * 0.3,
        bodyBottomY + shirtHeight * 0.15,
        bodyCenterX + shirtWidth * 0.45,
        bodyBottomY - shirtHeight * 0.12
      );
      context.closePath();
      context.fill();

      const armAngle = Math.sin(frame * 0.02) * 0.15 - 0.25;
      const armLength = shirtHeight * 0.75;
      const armWidth = shirtWidth * 0.22;
      const armOriginX = bodyCenterX + shirtWidth * 0.35;
      const armOriginY = bodyBottomY - shirtHeight * 0.65;

      context.save();
      context.translate(armOriginX, armOriginY);
      context.rotate(armAngle);

      context.fillStyle = SHIRT_COLOR;
      drawRoundedRect(context, -armWidth, -armWidth / 2, armLength, armWidth, armWidth / 2);

      context.fillStyle = SKIN_TONE;
      const handRadius = armWidth * 0.65;
      context.beginPath();
      context.ellipse(armLength - handRadius * 1.1, 0, handRadius * 1.1, handRadius, 0, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = MUG_COLOR;
      const mugWidth = handRadius * 1.6;
      const mugHeight = handRadius * 1.8;
      drawRoundedRect(context, armLength - mugWidth * 1.4, -mugHeight / 2, mugWidth, mugHeight, 6);
      context.strokeStyle = "#d2cbbf";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(armLength - mugWidth * 1.5, 0, mugHeight * 0.45, -Math.PI / 3, Math.PI / 3);
      context.stroke();

      context.restore();

      context.fillStyle = SKIN_TONE;
      drawRoundedRect(
        context,
        bodyCenterX - shirtWidth * 0.42,
        bodyBottomY - shirtHeight * 0.55,
        shirtWidth * 0.35,
        shirtHeight * 0.22,
        20
      );

      context.fillStyle = SKIN_TONE;
      drawRoundedRect(
        context,
        bodyCenterX - shirtWidth * 0.45,
        bodyBottomY - shirtHeight * 0.35,
        shirtWidth * 0.28,
        shirtHeight * 0.5,
        20
      );

      const headRadius = shirtWidth * 0.32;
      context.fillStyle = SKIN_TONE;
      context.beginPath();
      context.arc(bodyCenterX, bodyBottomY - shirtHeight - headRadius * 0.3, headRadius, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = BEARD_TONE;
      context.beginPath();
      context.ellipse(
        bodyCenterX,
        bodyBottomY - shirtHeight + headRadius * 0.45,
        headRadius * 0.75,
        headRadius * 0.6,
        0,
        Math.PI * 0.1,
        Math.PI * 0.9
      );
      context.fill();

      const hairBaseY = bodyBottomY - shirtHeight - headRadius * 0.9;
      for (let i = -5; i <= 5; i += 1) {
        const sway = Math.sin(frame * 0.01 + i * 0.4) * 4;
        const startX = bodyCenterX + i * 6;
        const endX = startX + sway;
        context.strokeStyle = BEARD_TONE;
        context.lineWidth = 6;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(startX, hairBaseY);
        context.lineTo(endX, hairBaseY + headRadius * 1.2);
        context.stroke();
      }

      context.fillStyle = "#1a2538";
      context.beginPath();
      context.arc(bodyCenterX - headRadius * 0.4, bodyBottomY - shirtHeight - headRadius * 0.2, 3, 0, Math.PI * 2);
      context.arc(bodyCenterX + headRadius * 0.4, bodyBottomY - shirtHeight - headRadius * 0.2, 3, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "#1a2538";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(
        bodyCenterX,
        bodyBottomY - shirtHeight + headRadius * 0.1,
        headRadius * 0.42,
        Math.PI * 0.1,
        Math.PI * 0.9
      );
      context.stroke();

      drawSteam(context, armOriginX + Math.cos(armAngle) * armLength - 6, armOriginY + Math.sin(armAngle) * armLength - 28);

      frame += 1;
      context.restore();
      animationFrame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      if (!canvas.parentElement) return;
      const scale = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth * scale;
      canvas.height = clientHeight * scale;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(scale, scale);
    };

    resize();
    let resizeObserver: ResizeObserver | null = null;
    const parent = canvas.parentElement;
    if (typeof ResizeObserver !== "undefined" && parent) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(parent);
    } else {
      window.addEventListener("resize", resize);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  return (
    <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-[32px] bg-[#151a2d] shadow-[0_40px_120px_rgba(3,7,18,0.55)] ring-2 ring-white/5">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-black/20 mix-blend-plus-lighter" />
    </div>
  );
};

export default AnimatedScene;
