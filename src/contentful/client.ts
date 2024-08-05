import * as contentful from 'contentful';
import { createClient } from 'contentful-management';

export const contentfulClient = contentful.createClient({
  space: import.meta.env['CONTENTFUL_SPACE_ID'],
  accessToken: import.meta.env.DEV
    ? import.meta.env['CONTENTFUL_PREVIEW_TOKEN']
    : import.meta.env['CONTENTFUL_DELIVERY_TOKEN'],
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});

export const plainClient = createClient(
  {
    accessToken: import.meta.env['CONTENTFUL_MANAGEMENT_TOKEN'],
  },
  {
    type: 'plain',
    defaults: {
      environmentId: import.meta.env['CONTENTFUL_ENVIRONMENT'],
      spaceId: import.meta.env['CONTENTFUL_SPACE_ID'],
    },
  },
);
