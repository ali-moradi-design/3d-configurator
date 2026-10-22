'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';

export function ShareButton() {
  const [status, setStatus] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('Link copied. It restores this exact design.');
    } catch {
      setStatus('Could not copy. Copy the address bar instead; it already holds your design.');
    }
  }

  return (
    <>
      <Button variant="ghost" onClick={copy}>
        Copy share link
      </Button>
      <span role="status" className="toast">
        {status}
      </span>
    </>
  );
}
