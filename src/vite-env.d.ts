/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLW_PUBLIC_KEY: string;
  readonly VITE_ACADEMY_REGISTRATION_FEE: string;
  readonly VITE_ACADEMY_CURRENCY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
