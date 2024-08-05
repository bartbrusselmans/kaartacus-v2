import { xml2json } from 'xml-js';

import type { BggBoardgame, BggResponse, WorkerData } from '@types';

const BGG_HOST = import.meta.env['PUBLIC_BGG_HOST'];

self.onmessage = async (event: MessageEvent<WorkerData>) => {
  const { users } = event.data;

  try {
    // Fetch data from APIs
    const responses = await Promise.all(
      users.map(user =>
        fetch(`${BGG_HOST}/collection?username=${user.username}`)
          .then(response => {
            return response.text();
          })
          .then(data => xml2json(data, { compact: true, spaces: 4 }))
          .then(json => JSON.parse(json))
          .then(
            json =>
              ({ user: user.name, games: json.items.item }) as BggResponse,
          ),
      ),
    );
    console.log(
      '🚀 ~ file: workers.ts:35 ~ self.onmessage= ~ responses:',
      responses,
    );

    // Transform data
    const transformedData = responses.map(response => {
      const updatedData = {
        ...response,
        games: response.games.map(boardgame => {
          return transformData(boardgame);
        }),
      };

      return updatedData;
    });

    // Send data to CMS
    // await fetch(contentfulEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(transformedData),
    // });

    // Notify main thread that the task is done
    self.postMessage(
      // 'Data processed and sent to CMS.',
      JSON.stringify(transformedData),
    );
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    self.postMessage(`Error: ${errorMessage}`);
  }
};

const transformData = (boardgame: BggBoardgame) => {
  // Implement your boardgame transformation logic here
  return {
    name: boardgame.name._text,
    image: boardgame.image._text,
    thumbnail: boardgame.thumbnail._text,
    yearPublished: boardgame.yearpublished._text,
    id: boardgame._attributes.objectid,
    objectType: boardgame._attributes.objecttype,
    subType: boardgame._attributes.subtype,
  };
};

export {};
