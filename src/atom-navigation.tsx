import { AuthenticatedProvider } from '@atom/authorization';
import { AtomCommonProvider } from '@atom/common';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { AtomNavigationProvider } from './adapter/react-context';
import './index';
import './index.css';
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
      <AtomCommonProvider initializeLanguage>
        <AuthenticatedProvider>
          <Sidebar />
        </AuthenticatedProvider>
      </AtomCommonProvider>
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
        <AtomNavigationProvider>
          <AtomCommonProvider initializeLanguage>
            <HeaderContainer />
          </AtomCommonProvider>
        </AtomNavigationProvider>
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
