/* eslint-disable */

const     buttonAddTag = document.getElementById(    'button-add-tag');
const         tagInput = document.getElementById(         'tag-input');
const selectedTagsList = document.getElementById('selected-tags-list');
const tagExistsMessage = document.getElementById('tag-exists-message');

const addTagToList = () => {
  if (!tagInput.value) return;

  const items = selectedTagsList.getElementsByTagName('li');

  for (let item of items) {
    if (item.innerText === tagInput.value) {
      tagExistsMessage.hidden = false;
      tagInput.addEventListener(
        'input',
        () => (tagExistsMessage.hidden = true),
        { once: true }
      );

      return;
    }
  }

  const crossImage = document.createElement('img');
  crossImage.src = '/public/cross.svg';
  crossImage.classList.add('w-4', 'h-4');

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.classList.add('p-1');
  removeButton.append(crossImage);
  removeButton.addEventListener(
    'click',
    (e) => {
      e.target.parentElement.parentElement.remove();
      selectedTagsList.childElementCount || hideElement(selectedTagsList);
    }, {
      once: true
    }
  );

  const tagHiddenInput = document.createElement('input');
  tagHiddenInput.type = 'hidden';
  tagHiddenInput.value = tagInput.value;
  tagHiddenInput.name = 'tags';

  const listItem = document.createElement('li');
  listItem.classList.add(
    'flex',
    'items-center',
    'rounded-lg',
    'bg-orange-200',
    'pl-2'
  );
  listItem.append(tagHiddenInput);
  listItem.append(tagInput.value);
  listItem.append(removeButton);

  selectedTagsList.append(listItem);
  selectedTagsList.classList.replace('hidden', 'flex');
  tagInput.value = '';
};

buttonAddTag.addEventListener('click', () => addTagToList());