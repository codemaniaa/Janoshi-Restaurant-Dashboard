export const CATEGORIES = ["Fast Food", "Ice Cream", "Drinks", "Cakes", "Brownies"];

const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=400&q=60`;

export const initialMenu = [
  // Fast Food
  { id: "MENU-101", name: "Zinger Burger", category: "Fast Food", price: 650, image: img("photo-1568901346375-23c9450c58cd"), prepTime: 12, available: true, ingredients: [{ id: "INV-01", qty: 1 }, { id: "INV-05", qty: 0.15 }], variants: ["Regular", "Large"], toppings: ["Extra Cheese", "Extra Mayo"] },
  { id: "MENU-102", name: "Chicken Burger", category: "Fast Food", price: 550, image: img("photo-1571091718767-18b5b1457add"), prepTime: 10, available: true, ingredients: [{ id: "INV-01", qty: 1 }], variants: ["Regular", "Large"], toppings: ["Extra Cheese"] },
  { id: "MENU-103", name: "Beef Burger", category: "Fast Food", price: 700, image: img("photo-1550547660-d9450f859349"), prepTime: 12, available: true, ingredients: [{ id: "INV-02", qty: 1 }], variants: ["Regular", "Large"], toppings: ["Extra Cheese", "Jalapenos"] },
  { id: "MENU-104", name: "Pizza", category: "Fast Food", price: 1200, image: img("photo-1548365328-9f547fb0953b"), prepTime: 18, available: true, ingredients: [{ id: "INV-03", qty: 1 }], variants: ["Small", "Medium", "Large"], toppings: ["Olives", "Mushroom", "Extra Cheese"] },
  { id: "MENU-105", name: "Shawarma", category: "Fast Food", price: 380, image: img("photo-1633436375153-d7045cb93e38"), prepTime: 8, available: true, ingredients: [{ id: "INV-01", qty: 0.5 }], variants: ["Regular"], toppings: ["Garlic Sauce", "Chili Sauce"] },
  { id: "MENU-106", name: "Club Sandwich", category: "Fast Food", price: 480, image: img("photo-1567234669003-dce7a7fadd2d"), prepTime: 10, available: true, ingredients: [{ id: "INV-06", qty: 2 }], variants: ["Regular"], toppings: ["Extra Cheese"] },
  { id: "MENU-107", name: "Loaded Fries", category: "Fast Food", price: 420, image: img("photo-1585109649139-366815a0d713"), prepTime: 9, available: true, ingredients: [{ id: "INV-07", qty: 0.3 }], variants: ["Regular", "Large"], toppings: ["Cheese Sauce", "Beef Bites"] },
  { id: "MENU-108", name: "Chicken Wrap", category: "Fast Food", price: 450, image: img("photo-1626700051175-6818013e1d4f"), prepTime: 9, available: true, ingredients: [{ id: "INV-01", qty: 0.6 }], variants: ["Regular"], toppings: ["Extra Sauce"] },

  // Ice Cream
  { id: "MENU-201", name: "Vanilla", category: "Ice Cream", price: 250, image: img("photo-1501443762994-82bd5dace89a"), prepTime: 3, available: true, ingredients: [{ id: "INV-08", qty: 0.2 }], variants: ["Scoop", "Tub"], toppings: ["Choco Chips"] },
  { id: "MENU-202", name: "Chocolate", category: "Ice Cream", price: 260, image: img("photo-1497034825429-c343d7c6a68f"), prepTime: 3, available: true, ingredients: [{ id: "INV-08", qty: 0.2 }], variants: ["Scoop", "Tub"], toppings: ["Choco Chips"] },
  { id: "MENU-203", name: "Oreo", category: "Ice Cream", price: 300, image: img("photo-1560008581-09826d1de69e"), prepTime: 3, available: true, ingredients: [{ id: "INV-08", qty: 0.2 }], variants: ["Scoop", "Tub"], toppings: ["Oreo Crumble"] },
  { id: "MENU-204", name: "Strawberry", category: "Ice Cream", price: 260, image: img("photo-1497034825429-c343d7c6a68f"), prepTime: 3, available: true, ingredients: [{ id: "INV-08", qty: 0.2 }], variants: ["Scoop", "Tub"], toppings: ["Fresh Strawberry"] },
  { id: "MENU-205", name: "Kulfa", category: "Ice Cream", price: 280, image: img("photo-1567206563064-6f60f40a2b57"), prepTime: 3, available: true, ingredients: [{ id: "INV-08", qty: 0.2 }], variants: ["Scoop"], toppings: [] },
  { id: "MENU-206", name: "Mango", category: "Ice Cream", price: 270, image: img("photo-1488900128323-21503983a07e"), prepTime: 3, available: true, ingredients: [{ id: "INV-08", qty: 0.2 }], variants: ["Scoop", "Tub"], toppings: ["Mango Chunks"] },

  // Drinks
  { id: "MENU-301", name: "Cold Coffee", category: "Drinks", price: 350, image: img("photo-1461023058943-07fcbe16d735"), prepTime: 5, available: true, ingredients: [{ id: "INV-09", qty: 0.25 }], variants: ["Regular", "Large"], toppings: ["Whipped Cream"] },
  { id: "MENU-302", name: "Mint Margarita", category: "Drinks", price: 300, image: img("photo-1546171753-97d7676e4602"), prepTime: 5, available: true, ingredients: [{ id: "INV-10", qty: 0.2 }], variants: ["Regular"], toppings: [] },
  { id: "MENU-303", name: "Pepsi", category: "Drinks", price: 150, image: img("photo-1554866585-cd94860890b7"), prepTime: 1, available: true, ingredients: [{ id: "INV-11", qty: 1 }], variants: ["Can", "Bottle"], toppings: [] },
  { id: "MENU-304", name: "7UP", category: "Drinks", price: 150, image: img("photo-1622483767028-3f66f32aef97"), prepTime: 1, available: true, ingredients: [{ id: "INV-11", qty: 1 }], variants: ["Can", "Bottle"], toppings: [] },
  { id: "MENU-305", name: "Fresh Lime", category: "Drinks", price: 220, image: img("photo-1621263764928-df1444c5e859"), prepTime: 4, available: true, ingredients: [{ id: "INV-10", qty: 0.15 }], variants: ["Regular"], toppings: ["Mint Leaves"] },
  { id: "MENU-306", name: "Chocolate Shake", category: "Drinks", price: 380, image: img("photo-1571506165871-ee72a35bc9d4"), prepTime: 5, available: true, ingredients: [{ id: "INV-09", qty: 0.3 }], variants: ["Regular", "Large"], toppings: ["Choco Syrup"] },
  { id: "MENU-307", name: "Vanilla Shake", category: "Drinks", price: 370, image: img("photo-1553787499-6f9133860278"), prepTime: 5, available: true, ingredients: [{ id: "INV-09", qty: 0.3 }], variants: ["Regular", "Large"], toppings: [] },
  { id: "MENU-308", name: "Mango Shake", category: "Drinks", price: 390, image: img("photo-1546173159-315724a31696"), prepTime: 5, available: true, ingredients: [{ id: "INV-09", qty: 0.3 }], variants: ["Regular", "Large"], toppings: ["Mango Chunks"] },

  // Cakes
  { id: "MENU-401", name: "Chocolate Cake", category: "Cakes", price: 1800, image: img("photo-1606313564200-e75d5e30476c"), prepTime: 5, available: true, ingredients: [{ id: "INV-12", qty: 1 }], variants: ["Slice", "Half KG", "1 KG"], toppings: ["Ganache"] },
  { id: "MENU-402", name: "Red Velvet Cake", category: "Cakes", price: 2000, image: img("photo-1586788224331-947f68671cf1"), prepTime: 5, available: true, ingredients: [{ id: "INV-12", qty: 1 }], variants: ["Slice", "Half KG", "1 KG"], toppings: ["Cream Cheese"] },
  { id: "MENU-403", name: "Lotus Cake", category: "Cakes", price: 2200, image: img("photo-1571115177098-24ec42ed204d"), prepTime: 5, available: true, ingredients: [{ id: "INV-12", qty: 1 }], variants: ["Slice", "Half KG", "1 KG"], toppings: ["Lotus Biscoff"] },
  { id: "MENU-404", name: "Black Forest Cake", category: "Cakes", price: 1900, image: img("photo-1606313564200-e75d5e30476c"), prepTime: 5, available: true, ingredients: [{ id: "INV-12", qty: 1 }], variants: ["Slice", "Half KG", "1 KG"], toppings: ["Cherries"] },

  // Brownies
  { id: "MENU-501", name: "Classic Brownie", category: "Brownies", price: 320, image: img("photo-1606313564200-e75d5e30476c"), prepTime: 3, available: true, ingredients: [{ id: "INV-13", qty: 1 }], variants: ["Single"], toppings: [] },
  { id: "MENU-502", name: "Nutella Brownie", category: "Brownies", price: 380, image: img("photo-1606313564200-e75d5e30476c"), prepTime: 3, available: true, ingredients: [{ id: "INV-13", qty: 1 }], variants: ["Single"], toppings: ["Nutella Drizzle"] },
  { id: "MENU-503", name: "Walnut Brownie", category: "Brownies", price: 360, image: img("photo-1606313564200-e75d5e30476c"), prepTime: 3, available: true, ingredients: [{ id: "INV-13", qty: 1 }], variants: ["Single"], toppings: ["Walnuts"] },
  { id: "MENU-504", name: "Fudge Brownie", category: "Brownies", price: 350, image: img("photo-1606313564200-e75d5e30476c"), prepTime: 3, available: true, ingredients: [{ id: "INV-13", qty: 1 }], variants: ["Single"], toppings: ["Fudge Sauce"] },
];
