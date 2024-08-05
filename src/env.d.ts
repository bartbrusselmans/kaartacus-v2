/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CF_SPACE_ID: string;
  readonly CF_ENVIRONMENT: string;
  readonly CF_ACCESS_TOKEN: string;
  readonly CF_PREVIEW_TOKEN: string;
  readonly DEV: string;

  readonly PUBLIC_BGG_HOST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
