import { Elysia, t } from 'elysia';
// eslint-disable-next-line no-unused-vars
import * as elements from 'typed-html';
import authPlugin from '../plugins/auth.plugin';
import itemService from '../services/item.service';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const itemRoutes = (app: Elysia) =>
  app
    .use(authPlugin)
    .model({
      item: t.Object({
        name: t.String(),
        image: t.File({
          type: 'image',
          maxSize: MAX_IMAGE_SIZE
        }),
        location: t.String(),
        tags: t.Optional(t.Union([t.Array(t.String()), t.String()]))
      })
    })
    .get('/item/locations', async ({ userId }) => {
      return await itemService.getItemLocations(userId);
    })
    .post(
      '/item',
      async ({ body: newItem, userId }) => {
        await itemService.create({
          ...newItem,
          tags: typeof newItem.tags == 'string' ? [newItem.tags] : newItem.tags,
          userId
        });
      },
      { body: 'item' }
    )
    .get('/items', async ({ userId, set }) => {
      const items = await itemService.getAllForUser(userId);

      set.headers['Content-Type'] = 'text/html; charset=utf-8';

      return items
        .map((item) => (
          <div class="group h-fit">
            <div class="overflow-hidden rounded-lg group-hover:opacity-75">
              <img src={item.image} alt={item.id} />
            </div>
            <div class="mt-1 flex flex-col items-center space-y-1">
              <span class="text-lg text-gray-700">{item.name}</span>
              {item.location && (
                <span class="block text-sm text-gray-500">{item.location}</span>
              )}
              <div class="space-x-1">
                {item.tags.map((t) => (
                  <span class="rounded-lg bg-orange-200 px-2 py-1 text-xs uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
        .join('');
    });

export default itemRoutes;
