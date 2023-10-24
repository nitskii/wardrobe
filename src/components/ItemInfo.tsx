import { Item } from '../types';

const ItemInfo = (item: Item) => (
  <div class="flex h-full w-full">
    <div class="flex w-full flex-col space-y-2 rounded-lg bg-orange-100 p-2 shadow-lg md:flex-row md:space-x-2 md:space-y-0">
      <div class="h-fit overflow-hidden rounded-lg md:w-1/3">
        <img src={item.image} alt={item.id} />
      </div>
      <div class="flex w-full flex-grow flex-col justify-between space-y-2 p-2 md:w-2/3">
        <div class="space-y-2">
          <h3 class="text-xl md:text-3xl">{item.name}</h3>
          <p class="text-base text-gray-600 md:text-lg">
            {item.location}
          </p>
          <div class='flex space-x-2'>
            <ul
              id='tags-list'
              class="flex flex-wrap space-x-2 items-center">
              {item.tags.map((tagName) => (
                <li class="rounded-lg bg-orange-200 px-2 py-1">
                  <div class='flex items-center text-xs uppercase'>
                    {tagName}
                    <img
                      src="/public/cross.svg"
                      class='h-6 pl-2 cursor-pointer'
                      hx-delete={`/api/item/${item.id}/tag`}
                      hx-vals={`{ "tagName": "${tagName}" }`}
                      hx-target='closest li'
                      hx-swap='delete' />
                  </div>
                </li>
              ))}
            </ul>
            <button
              class='bg-orange-200 rounded-lg p-1 cursor-pointer hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300'
              onclick="htmx.trigger('#tags-datalist', 'tagModalOpened');showTagModal()">
              <img src='/public/plus.svg' class='h-6' />
            </button>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            hx-delete={`/api/item/${item.id}`}
            hx-confirm="Видалити предмет?"
            class="rounded-lg bg-orange-200 p-2 hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
              Видалити
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ItemInfo;
