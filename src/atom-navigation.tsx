import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import './index';

export const sidebarApplication = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/sidebar'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => <div>Sidebar</div>
});

export const headerApplication = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/header'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => <div>Header</div>
});
