/// <reference types="vite/client" />

declare module "node:path" {
  export function resolve(...paths: string[]): string;
  export function dirname(path: string): string;
  const path: {
    resolve(...paths: string[]): string;
    dirname(path: string): string;
  };
  export default path;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_BASE_PATH?: string;
    [key: string]: string | undefined;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
