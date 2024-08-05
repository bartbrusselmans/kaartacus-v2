import path from 'path';

import type {
  AssetProps,
  GetSpaceEnvironmentParams,
} from 'contentful-management';

import type { OptionalDefaults } from '@types';

import { plainClient } from './client';

const getName = (url: string) => url.substring(url.lastIndexOf('/') + 1);
const getExtension = (url: string) => path.parse(getName(url)).ext;
const getFormat = (url: string) => getExtension(url).split('.')[1];
const removeExtension = (file: string) => path.parse(file).name;

const process = async (image: AssetProps) => {
  return await plainClient.asset.processForAllLocales(
    {
      processingCheckWait: 1000,
      processingCheckRetries: 10,
    },
    image,
  );
};

export const createAsset = async (
  url: string,
  options: OptionalDefaults<GetSpaceEnvironmentParams> = {},
) => {
  const asset = await plainClient.asset.create(options, {
    fields: {
      title: {
        'en-US': decodeURI(removeExtension(getName(url))),
      },
      file: {
        'en-US': {
          contentType: `image/${getFormat(url)}`,
          fileName: decodeURI(getName(url)),
          upload: url,
        },
      },
    },
  });

  return await process(asset);
};
