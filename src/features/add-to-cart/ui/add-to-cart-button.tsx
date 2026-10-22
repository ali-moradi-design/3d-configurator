'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useCart } from '../model/cart-store';

/** A fake action: it only counts items. No data is stored or sent anywhere. */
export function AddToCartButton() {
  const add = useCart((s) => s.add);
  const [message, setMessage] = useState('');

  return (
    <div>
      <Button
        variant="accent"
        onClick={() => {
          add();
          setMessage('Added to cart. This is a demo, nothing was charged.');
        }}
      >
        Add to cart
      </Button>
      <p role="status" className="fine">
        {message || 'Demo only: "Add to cart" does not take payments.'}
      </p>
    </div>
  );
}
