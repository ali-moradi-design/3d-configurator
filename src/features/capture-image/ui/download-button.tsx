'use client';

import { useState } from 'react';
import { captureShoeImage, useDesign } from '@/entities/shoe';
import { Button } from '@/shared/ui';

const WIDTH = 1600;
const HEIGHT = 1200;
const BACKGROUND = '#ebe6dc';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function DownloadButton() {
  const colorway = useDesign((s) => s.colorway);
  const [status, setStatus] = useState('');

  async function download() {
    const data = captureShoeImage();
    if (!data) {
      setStatus('The 3D view is still loading. Try again in a moment.');
      return;
    }
    const shot = await loadImage(data);
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    const scale = Math.min(WIDTH / shot.width, HEIGHT / shot.height);
    const w = shot.width * scale;
    const h = shot.height * scale;
    ctx.drawImage(shot, (WIDTH - w) / 2, (HEIGHT - h) / 2, w, h);

    const link = document.createElement('a');
    link.download = `tidewalk-${colorway}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatus('Image downloaded.');
  }

  return (
    <>
      <Button variant="ghost" onClick={download}>
        Download PNG
      </Button>
      <span role="status" className="sr-only">
        {status}
      </span>
    </>
  );
}
