import { Header, Sidebar } from '@atom/design-system';
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
  rootComponent: () => (
    <Sidebar
      position='static'
      menuItems={[
        {
          label: 'Test'
        }
      ]}
    />
  )
});

export const headerApplication = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter: () => document.getElementById('application:@atom/header'),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  rootComponent: () => (
    <Header
      avatarProps={{
        dropdownLinks: [
          {
            label: 'Test'
          }
        ],
        avatarLabel: ''
      }}
      notificationProps={{}}
    />
  )
});
