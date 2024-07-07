const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('shopping-form');
  const itemList = document.getElementById('item-list');
  const clearButton = document.getElementById('clear-list');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const itemName = document.getElementById('item-name').value.trim();
    if (itemName) {
      addItem(itemName);
      form.reset();
    }
  });

  clearButton.addEventListener('click', clearList);

  function addItem(name) {
    groceryList.push({ name, purchased: false });
    saveList();
    renderList();
  }

  function togglePurchased(index) {
    groceryList[index].purchased = !groceryList[index].purchased;
    saveList();
    renderList();
  }

  function editItem(index, newName) {
    groceryList[index].name = newName;
    saveList();
    renderList();
  }

  function clearList() {
    groceryList.length = 0; // Clear array
    saveList();
    renderList();
  }

  function renderList() {
    itemList.innerHTML = '';
    groceryList.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item.name;
      if (item.purchased) {
        li.classList.add('purchased');
      }
      li.addEventListener('click', () => togglePurchased(index));
      li.addEventListener('dblclick', () => enableEditing(li, index));
      itemList.appendChild(li);
    });
  }

  function enableEditing(li, index) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = groceryList[index].name;
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();

    input.addEventListener('blur', () => saveEdit(input.value, index));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        saveEdit(input.value, index);
      }
    });
  }

  function saveEdit(newName, index) {
    if (newName.trim()) {
      editItem(index, newName.trim());
    } else {
      renderList(); // Cancel edit if input is empty
    }
  }

  function saveList() {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }

  renderList(); // Initial render
});
