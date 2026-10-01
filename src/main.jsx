import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';

// prerender.mjs records which page the HTML was rendered as; the URL can differ (the 404 page is served under any path).
const path = document.documentElement.dataset.path ?? window.location.pathname;

hydrateRoot(document.getElementById('root'), <App path={path} />);
