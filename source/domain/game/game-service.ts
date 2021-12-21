import { WithPage, WithToken } from 'types';
import { makeGameClient } from './game-client';

type ListParams = WithPage<WithToken<{ search: string }>>;
export const list = async ({ token, size, page, search }: ListParams) => {
  const client = makeGameClient({ token });

  client
    .limit(size)
    .offset((page - 1) * size)
    .fields([
      'name',
      'alternative_names',
      'artworks',
      'bundles',
      'checksum',
      'collection',
      'genres',
      'cover',
      'created_at',
      'dlcs',
      'expansions',
      'ports',
      'release_dates',
      'screenshots',
      'slug',
      'status',
      'storyline',
      'updated_at',
      'url',
    ]);

  if (search.length > 0) {
    client.search(search);
  }

  const { data } = await client.request('/games');
  return data;
};

type GetParams = WithToken<{ id: number }>
export const get = async ({ token, id }: GetParams) => {
  const client = makeGameClient({ token });

  client
    .fields([
      'name',
      'alternative_names',
      'artworks',
      'bundles',
      'checksum',
      'collection',
      'genres',
      'cover',
      'created_at',
      'dlcs',
      'expansions',
      'ports',
      'release_dates',
      'screenshots',
      'slug',
      'status',
      'storyline',
      'updated_at',
      'url',
    ]);

  const { data } = await client.where(`id = ${id}`).request('/games');
  return data;
};
