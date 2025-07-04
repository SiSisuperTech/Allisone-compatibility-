/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Add window type for global access
declare global {
  interface Window {
    location: Location;
  }
}
