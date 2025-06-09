const menuData = {};
let isEditing = false;
let editCategory = "";
let editIndex = -1;

function addItem() {
  const cat = document.getElementById("category").value.trim();
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value.trim();

  if (!cat || !name || !price) return;

  if (!menuData[cat]) menuData[cat] = [];

  if (isEditing) {
    menuData[editCategory][editIndex] = { name, price };
    isEditing = false;
    editCategory = "";
    editIndex = -1;
  } else {
    menuData[cat].push({ name, price });
  }

  document.getElementById("category").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";

  renderMenu();
}

function renderMenu() {
  const container = document.getElementById("menuContent");
  container.innerHTML = "";

  Object.entries(menuData).forEach(([category, items]) => {
    const section = document.createElement("div");
    const title = document.createElement("h2");
    title.innerText = category.toUpperCase();
    section.appendChild(title);

    items.forEach(({ name, price }, index) => {
      const item = document.createElement("div");
      item.className = "menu-item";
      item.innerHTML = `
        <span style="margin-top: 7px;font-family: arial;font-weight: 400;">${name}</span>
        <span style="margin-right:32px;font-family: arial;font-weight: 400;margin-top: 7px;">${price}€</span> 
        <span class="actions">
        <button onclick="editItem('${category}', ${index})">✏️</button>
        <button onclick="deleteItem('${category}', ${index})">❌</button>
        </span> 
    `;
      section.appendChild(item);
    });

    container.appendChild(section);
  });
}

function deleteItem(category, index) {
  menuData[category].splice(index, 1);
  if (menuData[category].length === 0) delete menuData[category];
  renderMenu();
}

function editItem(category, index) {
  const item = menuData[category][index];
  document.getElementById("category").value = category;
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemPrice").value = item.price;

  isEditing = true;
  editCategory = category;
  editIndex = index;
}
