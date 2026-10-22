'use client';

import { Component, type ReactNode } from 'react';

type Props = { fallback: ReactNode; children: ReactNode };

/** Keeps the page usable when a part of the UI (such as WebGL) fails to start. */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
