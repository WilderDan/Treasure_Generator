class Loot {
  constructor() {
    this.gold = 0;
    this.potions = {};
    this.scrolls = {};
    this.magicWeaponsArmor = {};
    this.magicItems = {};
    this.grimoires = {};
  }

  addItem(item) {
    let list =
      item.type === ItemType.POTION
        ? this.potions
        : item.type === ItemType.SCROLL
        ? this.scrolls
        : item.type === ItemType.MAGIC_WEAPON_ARMOR
        ? this.magicWeaponsArmor
        : item.type === ItemType.MAGIC_ITEM
        ? this.magicItems
        : item.type === ItemType.GRIMOIRE
        ? this.grimoires
        : null;

    if (item.name in list) {
      list[item.name].quantity += 1;
    } else {
      list[item.name] = { quantity: 1, salePrice: item.salePrice };
    }
  }
}

class Item {
  constructor(type, name, salePrice) {
    this.type = type;
    this.name = name;
    this.salePrice = salePrice;
  }
}

const ItemType = Object.freeze({
  POTION: Symbol("potion"),
  SCROLL: Symbol("scroll"),
  MAGIC_WEAPON_ARMOR: Symbol("magic_weapon_armor"),
  MAGIC_ITEM: Symbol("magic_item"),
  GRIMOIRE: Symbol("grimoire"),
});
