/// <reference types="vite/client" />

declare global {
  interface Window {
    _AMapSecurityConfig: {
      serviceHost: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AMap: any;
  }
}
