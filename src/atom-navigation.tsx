import { AuthenticatedProvider } from '@atom/authorization';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import './index';
import { DashboardContainer, HeaderContainer, Sidebar } from './view';

export const sidebarApplication = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/sidebar'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => {
    return (
      <AuthenticatedProvider>
        <Sidebar />
      </AuthenticatedProvider>
    );
  }
});

export const headerApplication = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/header'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => {
    return (
      <AuthenticatedProvider>
        <HeaderContainer />
      </AuthenticatedProvider>
    );
  }
});

export const dashboardApplication = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/dashboard'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => {
    return (
      <AuthenticatedProvider>
        <DashboardContainer />
      </AuthenticatedProvider>
    );
  }
});
