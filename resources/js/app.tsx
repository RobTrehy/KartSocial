import '../css/app.css';
import './bootstrap';

import { RouteContext } from '@/Hooks/useRoute';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Kart Social';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: '#A9C8E7',
  },
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    return root.render(
      <RouteContext.Provider value={(window as any).route}>
        <App {...props} />
      </RouteContext.Provider>,
    );
  },
});
