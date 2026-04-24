'use client';
// DeferredWidgetProvider — delays mounting the chat/contact widget until
// the browser is idle (or 3s max). This removes WidgetProvider's JS from
// the critical path, improving TBT and LCP on mobile.
//
// Uses requestIdleCallback (with setTimeout fallback) to avoid scheduling
// the dynamic import during the main-thread-heavy initial paint window.

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const WidgetProvider = dynamic(() => import('./WidgetProvider'), { ssr: false });

export default function DeferredWidgetProvider() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | number;

    if ('requestIdleCallback' in window) {
      id = (window as Window).requestIdleCallback(() => setReady(true), { timeout: 3000 });
    } else {
      id = setTimeout(() => setReady(true), 2000);
    }

    return () => {
      if ('cancelIdleCallback' in window && typeof id === 'number') {
        (window as Window).cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  return ready ? <WidgetProvider /> : null;
}
