declare module 'mathjs';

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';
declare module '*.js';

// declare module 'modelCreate.ts';

/* eslint-disable no-unused-vars */
interface Window {
  // g_app: Record<string, any>;
  // g_app: { [key: string]: any };
  reloadAuthorized: () => void;
  __GLOBAL_S_MODULE: any[];
  __ACCESS_TOKEN: string;
}
