import * as contentful from 'contentful';
import { createClient } from 'contentful-management';

export const contentfulClient = contentful.createClient({
  space: import.meta.env.PUBLIC_CF_SPACE_ID,
  environment: import.meta.env.PUBLIC_CF_ENVIRONMENT,
  accessToken: import.meta.env.PUBLIC_DEV
    ? import.meta.env.PUBLIC_CF_PREVIEW_TOKEN
    : import.meta.env.PUBLIC_CF_ACCESS_TOKEN,
  host: import.meta.env.PUBLIC_DEV
    ? 'preview.contentful.com'
    : 'cdn.contentful.com',
});

export const plainClient = createClient(
  {
    accessToken: import.meta.env.PUBLIC_CF_ACCESS_TOKEN,
  },
  {
    type: 'plain',
    defaults: {
      environmentId: import.meta.env.PUBLIC_CF_ENVIRONMENT,
      spaceId: import.meta.env.PUBLIC_CF_SPACE_ID,
    },
  },
);
