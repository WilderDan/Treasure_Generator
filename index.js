function handleRollClick() {
  let numTreasure = $("#numTreasure").val();
  let loot = new Loot();
  let rollFrequency = new Array(20);
  rollFrequency.fill(0);

  $("#resultTable").empty();

  for (let i = 0; i < numTreasure; i++) {
    let roll = d20();
    rollFrequency[roll - 1] += 1;
    addTreasureToLoot(roll, loot);
  }

  console.log(rollFrequency);
  console.log(loot);

  // Display Results:
  displayResults(loot);
}

function displayResults(loot) {
  let resultTable = $("#resultTable");

  let str = "";

  if (loot.gold > 0) {
    str += `<tr><th colspan = "3">Gold Crowns</th><td>${loot.gold}</td></tr>`;
  }

  if (
    !$.isEmptyObject(loot.magicItems) ||
    !$.isEmptyObject(loot.magicWeaponsArmor) ||
    !$.isEmptyObject(loot.potions) ||
    !$.isEmptyObject(loot.scrolls) ||
    !$.isEmptyObject(loot.grimoires)
  ) {
    str +=
      "<tr><th></th><th>Item</th><th>Quantity</th><th>Sale Price</th></tr>";
  }

  str += rowsFrom("Magic Items", loot.magicItems);
  str += rowsFrom("Magic Weapons & Armor", loot.magicWeaponsArmor);
  str += rowsFrom("Potions", loot.potions);
  str += rowsFrom("Scrolls", loot.scrolls);
  str += rowsFrom("Grimoires", loot.grimoires);

  resultTable.append(str);
}

function rowsFrom(title, category) {
  str = "";
  let keys = Object.keys(category);

  if (keys.length > 0) {
    str += `<tr><th rowspan="${keys.length}">${title}</th>
    <td>${keys[0]}</td><td>${category[keys[0]].quantity}</td><td>${
      category[keys[0]].salePrice
    }</td></tr>`;

    for (let i = 1; i < keys.length; i++) {
      str += `<tr><td>${keys[i]}</td><td>${
        category[keys[i]].quantity
      }</td><td>${category[keys[i]].salePrice}</td></tr>`;
    }
  }

  return str;
}

function addTreasureToLoot(roll, loot) {
  switch (roll) {
    case 1:
      loot.gold += 50;
      break;
    case 2:
      loot.gold += d20() * 10;
      break;
    case 3:
      loot.gold += d20() * 20;
      break;
    case 4:
      loot.gold += 20;
      addPotionsToLoot(3, loot);
      break;
    case 5:
      loot.gold += 40;
      addPotionsToLoot(2, loot);
      break;
    case 6:
      loot.gold += 20;
      addScrollsToLoot(1, loot);
      break;
    case 7:
      loot.gold += 40;
      addScrollsToLoot(2, loot);
      break;
    case 8:
      addMagicWeaponArmorToLoot(loot);
      break;
    case 9:
      loot.gold += 20;
      addMagicWeaponArmorToLoot(loot);
      break;
    case 10:
      loot.gold += 40;
      addMagicWeaponArmorToLoot(loot);
      break;
    case 11:
      addMagicItemToLoot(loot);
      break;
    case 12:
      loot.gold += 20;
      addMagicItemToLoot(loot);
      break;
    case 13:
      loot.gold += 40;
      addMagicItemToLoot(loot);
      break;
    case 14:
      addGrimoireToLoot(loot);
      break;
    case 15:
      loot.gold += 20;
      addGrimoireToLoot(loot);
      break;
    case 16:
      loot.gold += 40;
      addGrimoireToLoot(loot);
      break;
    case 17:
      loot.gold += 60;
      addGrimoireToLoot(loot);
      break;
    case 18:
      loot.gold += 80;
      addGrimoireToLoot(loot);
      break;
    case 19:
      loot.gold += 100;
      addGrimoireToLoot(loot);
      break;
    case 20:
      loot.gold += 120;
      addGrimoireToLoot(loot);
      break;
    default:
      alert(`Unexpected roll (${roll})`);
  }
}

function addGrimoireToLoot(loot) {
  let name = getRandomSpell();
  let grimoire = new Item(ItemType.GRIMOIRE, name, 200);
  loot.addItem(grimoire);
}

function addMagicItemToLoot(loot) {
  let roll = d20();
  let index = roll - 1;

  let name = magicItemTable[index][0];
  if (name === "Staff of Casting") {
    name += ` [${getRandomSpell()}]`;
  }

  let salePrice = magicItemTable[index][2];
  let magicItem = new Item(ItemType.MAGIC_ITEM, name, salePrice);

  loot.addItem(magicItem);
}

function addMagicWeaponArmorToLoot(loot) {
  let roll = d20();
  let index = roll - 1;

  let name = magicWeaponArmorTable[index][0];
  let salePrice = magicWeaponArmorTable[index][2];
  let magicWeaponArmor = new Item(ItemType.MAGIC_WEAPON_ARMOR, name, salePrice);

  loot.addItem(magicWeaponArmor);
}

function addScrollsToLoot(numScrolls, loot) {
  for (let i = 0; i < numScrolls; i++) {
    let name = getRandomSpell();
    let scroll = new Item(ItemType.SCROLL, name, 30);
    loot.addItem(scroll);
  }
}

function addPotionsToLoot(numPotions, loot) {
  for (let i = 0; i < numPotions; i++) {
    let roll = d20();
    let index = roll - 1;

    let name, salePrice;

    if (roll < 19) {
      name = lesserPotionTable[index][0];
      salePrice = lesserPotionTable[index][2];
    } else {
      let secondRoll = randInt(0, 9);
      name = greaterPotionTable[secondRoll][0];
      salePrice = greaterPotionTable[secondRoll][2];
    }

    let potion = new Item(ItemType.POTION, name, salePrice);
    loot.addItem(potion);
  }
}

function getRandomSpell() {
  let rollOne = d20() - 1;
  let rollTwo = randInt(0, 3);

  return spellTable[rollOne][rollTwo];
}

function d20() {
  return randInt(1, 20);
}

// The maximum is inclusive and the minimum is inclusive
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
