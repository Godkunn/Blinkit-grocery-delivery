import { Product, Category } from './types';

// High-quality generic fallback
export const FALLBACK_IMAGE = "https://cdn-icons-png.flaticon.com/512/6056/6056810.png";

export const CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Vegetables & Fruits', image: 'https://cdn-icons-png.flaticon.com/512/2909/2909808.png' },
  { id: 'cat_2', name: 'Dairy, Bread & Eggs', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png' },
  { id: 'cat_3', name: 'Munchies', image: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png' },
  { id: 'cat_4', name: 'Cold Drinks & Juices', image: 'https://cdn-icons-png.flaticon.com/512/2405/2405597.png' },
  { id: 'cat_5', name: 'Instant & Frozen Food', image: 'https://cdn-icons-png.flaticon.com/512/3081/3081840.png' },
  { id: 'cat_6', name: 'Chicken, Meat & Fish', image: 'https://cdn-icons-png.flaticon.com/512/10609/10609349.png' },
  { id: 'cat_7', name: 'Paan Corner', image: 'https://cdn-icons-png.flaticon.com/512/2555/2555570.png' },
  { id: 'cat_8', name: 'Tea, Coffee & Health', image: 'https://cdn-icons-png.flaticon.com/512/3504/3504837.png' },
  { id: 'cat_9', name: 'Biscuits & Bakery', image: 'https://cdn-icons-png.flaticon.com/512/992/992747.png' },
  { id: 'cat_10', name: 'Atta, Rice & Dal', image: 'https://cdn-icons-png.flaticon.com/512/3014/3014520.png' },
  { id: 'cat_11', name: 'Masala & Dry Fruits', image: 'https://cdn-icons-png.flaticon.com/512/7396/7396096.png' },
  { id: 'cat_12', name: 'Sweet Cravings', image: 'https://cdn-icons-png.flaticon.com/512/2553/2553653.png' },
  { id: 'cat_13', name: 'Bath & Body', image: 'https://cdn-icons-png.flaticon.com/512/2950/2950663.png' },
  { id: 'cat_14', name: 'Cleaning Essentials', image: 'https://cdn-icons-png.flaticon.com/512/3082/3082008.png' },
  { id: 'cat_15', name: 'Home & Kitchen', image: 'https://cdn-icons-png.flaticon.com/512/3081/3081971.png' },
  { id: 'cat_16', name: 'Baby Care', image: 'https://cdn-icons-png.flaticon.com/512/2977/2977536.png' },
  { id: 'cat_17', name: 'Pet Care', image: 'https://cdn-icons-png.flaticon.com/512/3048/3048039.png' },
];

const PRODUCT_TEMPLATES = [
  // --- Vegetables & Fruits ---
  { name: 'Red Onion', category: 'Vegetables & Fruits', price: 35, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80' },
  { name: 'Fresh Potato', category: 'Vegetables & Fruits', price: 28, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80' },
  { name: 'Hybrid Tomato', category: 'Vegetables & Fruits', price: 30, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80' },
  { name: 'Cucumber', category: 'Vegetables & Fruits', price: 22, image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=80' },
  { name: 'Shimla Apple', category: 'Vegetables & Fruits', price: 150, image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&q=80' },
  { name: 'Robusta Banana', category: 'Vegetables & Fruits', price: 45, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80' },
  { name: 'Green Capsicum', category: 'Vegetables & Fruits', price: 40, image: 'https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?w=400&q=80' },
  { name: 'Fresh Lemon', category: 'Vegetables & Fruits', price: 10, image: 'https://images.unsplash.com/photo-1587496629637-299ef8740523?w=400&q=80' },
  { name: 'Broccoli', category: 'Vegetables & Fruits', price: 85, image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80' }, // Updated Image
  { name: 'Avocado', category: 'Vegetables & Fruits', price: 250, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80' },
  { name: 'Red Cherries', category: 'Vegetables & Fruits', price: 300, image: 'https://images.unsplash.com/photo-1528821128474-27f963b0bdd4?w=400&q=80' },

  // --- Dairy, Bread & Eggs ---
  { name: 'Full Cream Milk', category: 'Dairy, Bread & Eggs', price: 64, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80' }, // Reliable Milk Image
  { name: 'Toned Milk', category: 'Dairy, Bread & Eggs', price: 54, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80' },
  { name: 'Salted Butter', category: 'Dairy, Bread & Eggs', price: 56, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80' },
  { name: 'Whole Wheat Bread', category: 'Dairy, Bread & Eggs', price: 45, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { name: 'Farm Fresh Eggs (6pcs)', category: 'Dairy, Bread & Eggs', price: 75, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80' },
  { name: 'Brown Eggs (6pcs)', category: 'Dairy, Bread & Eggs', price: 85, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80' },
  { name: 'Malai Paneer', category: 'Dairy, Bread & Eggs', price: 95, image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=400&q=80' },
  { name: 'Greek Yogurt', category: 'Dairy, Bread & Eggs', price: 55, image: 'https://images.unsplash.com/photo-1571212515416-f223d6385708?w=400&q=80' },
  { name: 'Cheddar Cheese', category: 'Dairy, Bread & Eggs', price: 120, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&q=80' },

  // --- Munchies ---
  { name: 'Potato Chips (Salted)', category: 'Munchies', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
  { name: 'Spicy Nachos', category: 'Munchies', price: 90, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80' },
  { name: 'Roasted Peanuts', category: 'Munchies', price: 40, image: 'https://images.unsplash.com/photo-1627518423403-51980302b115?w=400&q=80' }, // Roasted Peanuts
  { name: 'Butter Popcorn', category: 'Munchies', price: 85, image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80' },
  { name: 'Chicken Jerky', category: 'Munchies', price: 199, image: 'https://images.unsplash.com/photo-1600863920703-b0bb7a726352?w=400&q=80' },
  { name: 'Millet Namkeen', category: 'Munchies', price: 179, image: 'https://images.unsplash.com/photo-1599423300746-b62507ac9705?w=400&q=80' },
  { name: 'Sourdough Chips', category: 'Munchies', price: 299, image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&q=80' },
  { name: 'Oats Khakhra', category: 'Munchies', price: 220, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&q=80' },
  { name: 'Original Potato Chips', category: 'Munchies', price: 266, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },

  // --- Paan Corner ---
  { name: 'Brown Rolling Paper', category: 'Paan Corner', price: 199, image: 'https://images.unsplash.com/photo-1598463836110-188cc5d539bc?w=400&q=80' }, 
  { name: 'Pre-Rolled Cones', category: 'Paan Corner', price: 70, image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&q=80' },
  { name: 'Cigarette Filter', category: 'Paan Corner', price: 239, image: 'https://images.unsplash.com/photo-1524388370138-08579d40e340?w=400&q=80' },
  { name: 'Crusher Tray', category: 'Paan Corner', price: 169, image: 'https://images.unsplash.com/photo-1614742468352-73602f741517?w=400&q=80' },
  { name: 'Metal Coal Hookah', category: 'Paan Corner', price: 999, image: 'https://images.unsplash.com/photo-1517646331032-9e8563c523a1?w=400&q=80' },
  { name: 'Coconut Coal', category: 'Paan Corner', price: 250, image: 'https://images.unsplash.com/photo-1582236967527-2c96c4d6349c?w=400&q=80' },
  { name: 'Silicon Chillum', category: 'Paan Corner', price: 299, image: 'https://images.unsplash.com/photo-1519758778401-26c7102d7eb0?w=400&q=80' },
  { name: 'Hookah Pipe', category: 'Paan Corner', price: 349, image: 'https://images.unsplash.com/photo-1522258849645-31d794916a04?w=400&q=80' },
  { name: 'Organic Gulkand', category: 'Paan Corner', price: 303, image: 'https://images.unsplash.com/photo-1621350414967-47b29a24d262?w=400&q=80' },
  { name: 'Digestive Drops', category: 'Paan Corner', price: 239, image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&q=80' },
  { name: 'Mint Saunf', category: 'Paan Corner', price: 216, image: 'https://images.unsplash.com/photo-1621350414967-47b29a24d262?w=400&q=80' },

  // --- Cold Drinks ---
  { name: 'Cola Can', category: 'Cold Drinks & Juices', price: 40, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { name: 'Orange Juice', category: 'Cold Drinks & Juices', price: 110, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80' },
  { name: 'Soda Water', category: 'Cold Drinks & Juices', price: 20, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&q=80' },
  { name: 'Energy Drink', category: 'Cold Drinks & Juices', price: 125, image: 'https://images.unsplash.com/photo-1622543925917-095a84aa30a1?w=400&q=80' },

  // --- Instant Food ---
  { name: 'Instant Noodles', category: 'Instant & Frozen Food', price: 14, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80' },
  { name: 'Frozen Peas', category: 'Instant & Frozen Food', price: 50, image: 'https://images.unsplash.com/photo-1594297868846-568324a18293?w=400&q=80' },
  { name: 'Chicken Nuggets (Frozen)', category: 'Instant & Frozen Food', price: 180, image: 'https://images.unsplash.com/photo-1619860860774-1e2e1737e342?w=400&q=80' },
  { name: 'Frozen Corn', category: 'Instant & Frozen Food', price: 60, image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80' },

  // --- Chicken, Meat & Fish ---
  { name: 'Chicken Breast (Boneless)', category: 'Chicken, Meat & Fish', price: 280, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80' },
  { name: 'Chicken Curry Cut', category: 'Chicken, Meat & Fish', price: 240, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80' },
  { name: 'Chicken Drumsticks', category: 'Chicken, Meat & Fish', price: 260, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' },
  { name: 'Whole Chicken', category: 'Chicken, Meat & Fish', price: 350, image: 'https://images.unsplash.com/photo-1570534536531-c3bcd6b963cc?w=400&q=80' },
  { name: 'Chicken Wings', category: 'Chicken, Meat & Fish', price: 220, image: 'https://images.unsplash.com/photo-1527477396000-64bc618e7d38?w=400&q=80' },
  { name: 'Chicken Lollipop', category: 'Chicken, Meat & Fish', price: 300, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
  { name: 'Chicken Keema', category: 'Chicken, Meat & Fish', price: 320, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
  { name: 'Fish Fillet', category: 'Chicken, Meat & Fish', price: 450, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
  { name: 'Fresh Prawns', category: 'Chicken, Meat & Fish', price: 550, image: 'https://images.unsplash.com/photo-1623961990059-28356e22bc8e?w=400&q=80' },
  { name: 'Mutton Curry Cut', category: 'Chicken, Meat & Fish', price: 650, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80' },
  { name: 'Rohu Fish Steaks', category: 'Chicken, Meat & Fish', price: 320, image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80' },

  // --- Tea & Coffee ---
  { name: 'Premium Tea Dust', category: 'Tea, Coffee & Health', price: 280, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80' },
  { name: 'Instant Coffee Jar', category: 'Tea, Coffee & Health', price: 220, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80' },
  { name: 'Green Tea Bags', category: 'Tea, Coffee & Health', price: 180, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80' },
  { name: 'Protein Powder', category: 'Tea, Coffee & Health', price: 1200, image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&q=80' },
  { name: 'Honey', category: 'Tea, Coffee & Health', price: 150, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80' },

  // --- Bakery ---
  { name: 'Choco Muffin', category: 'Biscuits & Bakery', price: 40, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80' },
  { name: 'Butter Croissant', category: 'Biscuits & Bakery', price: 65, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { name: 'Fruit Cake', category: 'Biscuits & Bakery', price: 120, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },

  // --- Staples ---
  { name: 'Basmati Rice', category: 'Atta, Rice & Dal', price: 150, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
  { name: 'Moong Dal', category: 'Atta, Rice & Dal', price: 130, image: 'https://images.unsplash.com/photo-1515543904379-3d757afe726e?w=400&q=80' },
  { name: 'Whole Wheat Atta', category: 'Atta, Rice & Dal', price: 420, image: 'https://images.unsplash.com/photo-1574323347458-7517c4613c23?w=400&q=80' },
  { name: 'Sunflower Oil', category: 'Atta, Rice & Dal', price: 185, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
  { name: 'Salt Packet', category: 'Atta, Rice & Dal', price: 28, image: 'https://images.unsplash.com/photo-1626131367469-82604646738f?w=400&q=80' },

  // --- Dry Fruits ---
  { name: 'Premium Almonds', category: 'Masala & Dry Fruits', price: 450, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&q=80' }, // Almonds
  { name: 'Salted Almonds', category: 'Masala & Dry Fruits', price: 480, image: 'https://images.unsplash.com/photo-1508061461508-a0d926face77?w=400&q=80' },
  { name: 'Cashew Nuts', category: 'Masala & Dry Fruits', price: 600, image: 'https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=400&q=80' }, // Cashews
  { name: 'Walnuts', category: 'Masala & Dry Fruits', price: 800, image: 'https://images.unsplash.com/photo-1594921674482-12f86241b777?w=400&q=80' },
  { name: 'Turmeric Powder', category: 'Masala & Dry Fruits', price: 40, image: 'https://images.unsplash.com/photo-1615485500704-8e99099928b3?w=400&q=80' },

  // --- Sweets ---
  { name: 'Chocolate Bar', category: 'Sweet Cravings', price: 80, image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80' }, // Amul/Dark Chocolate Style
  { name: 'Dark Chocolate', category: 'Sweet Cravings', price: 120, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80' },
  { name: 'Gulab Jamun', category: 'Sweet Cravings', price: 220, image: 'https://images.unsplash.com/photo-1593701461250-d71331798595?w=400&q=80' },
  { name: 'Vanilla Ice Cream', category: 'Sweet Cravings', price: 250, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80' },
  { name: 'Donuts', category: 'Sweet Cravings', price: 90, image: 'https://images.unsplash.com/photo-1551024601-564d6d674f33?w=400&q=80' },
  { name: 'Glazed Donuts', category: 'Sweet Cravings', price: 100, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80' },

  // --- Personal Care ---
  { name: 'Moisturizing Soap', category: 'Bath & Body', price: 60, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80' },
  { name: 'Shampoo', category: 'Bath & Body', price: 180, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80' },
  { name: 'Face Wash', category: 'Bath & Body', price: 160, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80' }, 
  { name: 'Toothpaste', category: 'Bath & Body', price: 95, image: 'https://images.unsplash.com/photo-1559599189-fe84fea4eb8b?w=400&q=80' },

  // --- Cleaning ---
  { name: 'Liquid Detergent', category: 'Cleaning Essentials', price: 250, image: 'https://images.unsplash.com/photo-1585832770485-e68a5db8e155?w=400&q=80' },
  { name: 'Detergent Pods', category: 'Cleaning Essentials', price: 350, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80' },
  { name: 'Floor Cleaner', category: 'Cleaning Essentials', price: 195, image: 'https://images.unsplash.com/photo-1628146203923-d343c6838df4?w=400&q=80' },
  { name: 'Surface Cleaner', category: 'Cleaning Essentials', price: 180, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
  { name: 'Dish Wash Bar', category: 'Cleaning Essentials', price: 45, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80' }, // Dish Wash Bar (Green Bar Style)

  // --- Home ---
  { name: 'Air Freshener', category: 'Home & Kitchen', price: 150, image: 'https://images.unsplash.com/photo-1616606045558-75b838c6d32f?w=400&q=80' },
  { name: 'Room Spray', category: 'Home & Kitchen', price: 180, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80' },
  { name: 'Tissue Box', category: 'Home & Kitchen', price: 65, image: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=400&q=80' }, 
  { name: 'Kitchen Towel', category: 'Home & Kitchen', price: 120, image: 'https://images.unsplash.com/photo-1627995163989-14a514d23460?w=400&q=80' },
  { name: 'Paper Napkins', category: 'Home & Kitchen', price: 90, image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400&q=80' },

  // --- Baby Care ---
  { name: 'Baby Diapers (S)', category: 'Baby Care', price: 800, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80' },
  { name: 'Baby Wipes', category: 'Baby Care', price: 200, image: 'https://plus.unsplash.com/premium_photo-1675808563297-3d1f03027961?w=400&q=80' },
  { name: 'Baby Oil', category: 'Baby Care', price: 150, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80' },
  { name: 'Baby Powder', category: 'Baby Care', price: 120, image: 'https://images.unsplash.com/photo-1556228720-1987594a8a63?w=400&q=80' },
  { name: 'Soft Baby Powder', category: 'Baby Care', price: 140, image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80' },

  // --- Pet Care ---
  { name: 'Dog Food', category: 'Pet Care', price: 450, image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?w=400&q=80' },
  { name: 'Premium Dog Food', category: 'Pet Care', price: 850, image: 'https://images.unsplash.com/photo-1623366302587-bca021d6616a?w=400&q=80' },
  { name: 'Puppy Chow', category: 'Pet Care', price: 500, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80' },
  { name: 'Cat Food (Tuna)', category: 'Pet Care', price: 400, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80' },
  { name: 'Pet Shampoo', category: 'Pet Care', price: 250, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80' },
  { name: 'Chew Toy', category: 'Pet Care', price: 150, image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80' },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Realistic Brand Mapping
const BRAND_MAP: Record<string, string[]> = {
  'Dairy, Bread & Eggs': ['Amul', 'Mother Dairy', 'Britannia', 'Nestle', 'Govardhan', 'Milky Mist'],
  'Munchies': ['Lays', 'Haldirams', 'Bingo', 'Doritos', 'Pringles', 'Kurkure', 'Doki', 'Yodley', 'Oatizen'], // Added brands from screenshot
  'Cold Drinks & Juices': ['Coca-Cola', 'Pepsi', 'Real', 'Tropicana', 'Red Bull', 'Thums Up'],
  'Instant & Frozen Food': ['McCain', 'Maggi', 'Yippee', 'Knorr', 'Sumeru', 'Top Ramen'],
  'Chicken, Meat & Fish': ['Licious', 'Fresho', 'Zorabian', 'Nandu', 'Meatigo', 'Everyday Meat'],
  'Tea, Coffee & Health': ['Tata Tea', 'Nescafe', 'Bru', 'Bournvita', 'Horlicks', 'Red Label'],
  'Biscuits & Bakery': ['Parle', 'Sunfeast', 'Britannia', 'Oreo', 'Karachi Bakery'],
  'Atta, Rice & Dal': ['Aashirvaad', 'India Gate', 'Fortune', 'Tata Sampann', 'Daawat', 'Organic Tattva'],
  'Masala & Dry Fruits': ['Everest', 'MDH', 'Tata Sampann', 'Catch', 'Badshah', 'Happilo'],
  'Sweet Cravings': ['Cadbury', 'Amul', 'Hersheys', 'Ferrero', 'Kwality Walls'],
  'Bath & Body': ['Dove', 'Nivea', 'Pears', 'Himalaya', 'Dettol', 'Lux'],
  'Cleaning Essentials': ['Lizol', 'Harpic', 'Vim', 'Surf Excel', 'Ariel', 'Domex'],
  'Home & Kitchen': ['Solimo', 'Spotzero', 'Milton', 'Prestige', 'Scotch-Brite'],
  'Baby Care': ['Pampers', 'Himalaya', 'Johnsons', 'MamyPoko', 'Huggies', 'Sebamed'],
  'Pet Care': ['Pedigree', 'Whiskas', 'Royal Canin', 'Drools', 'Purepet'],
  'Vegetables & Fruits': ['Farm Fresh', 'Organic', 'Simply Fresh', 'Nature', 'Fresh Pick'],
  'Paan Corner': ['Roch', 'Stash Pro', 'Cocooyaya', 'Swad', 'Surili', 'Doki', 'Nicofree', 'Breeze'], // Added brands from screenshot
};

// Fallback brands if category match fails
const GENERIC_BRANDS = ['Classic', 'Premium', 'Everyday', 'Gold', 'Royal', 'Fresh'];

const WEIGHTS = ['100g', '250g', '500g', '1kg', '200ml', '500ml', '1L', '2L', '1 pc', '6 pcs', '12 pcs'];
const TAGS = ["5 mins", "10 mins", "Bestseller", "Trending", "Limited offer", "Assured", "Fresh stock"];

const FIXED_PRODUCTS: Product[] = [
    {
        id: 'breeze-aam-papad-250',
        name: 'Breeze Aam Papad',
        category: 'Paan Corner',
        image: 'https://images.unsplash.com/photo-1583069150655-e417a86f1839?w=400&q=80', // Updated Image
        price: 214,
        discountPrice: 192,
        weight: '250g',
        time: '10 mins',
        bestseller: true
    },
    {
        id: 'breeze-aam-papad-1kg',
        name: 'Breeze Aam Papad',
        category: 'Paan Corner',
        image: 'https://images.unsplash.com/photo-1583069150655-e417a86f1839?w=400&q=80',
        price: 225,
        discountPrice: 202,
        weight: '1kg',
        time: '10 mins'
    },
    {
        id: 'breeze-anardana-goli-1pc',
        name: 'Breeze Anardana Goli',
        category: 'Paan Corner',
        image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&q=80',
        price: 265,
        discountPrice: 238,
        weight: '1 pc',
        time: '5 mins'
    },
    {
        id: 'breeze-anardana-goli-2l',
        name: 'Breeze Anardana Goli',
        category: 'Paan Corner',
        image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&q=80',
        price: 266,
        weight: '2L',
        time: '10 mins'
    },
    {
        id: 'breeze-charcoal-starter-500',
        name: 'Breeze Charcoal Starter',
        category: 'Paan Corner',
        image: 'https://images.unsplash.com/photo-1627483297929-37f416fec7cd?w=400&q=80',
        price: 881,
        weight: '500ml',
        time: '12 mins',
        bestseller: true
    }
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  // Generating ~2000 distinct items with variations
  CATEGORIES.forEach(cat => {
    const templates = PRODUCT_TEMPLATES.filter(bp => bp.category === cat.name);
    const categoryBrands = BRAND_MAP[cat.name] || GENERIC_BRANDS;
    
    // Fallback template if category has no specific ones defined
    const baseTemplates = templates.length > 0 ? templates : [{
        name: `${cat.name} Special`, 
        category: cat.name, 
        price: 99, 
        image: cat.image // use category image as base if nothing else
    }];

    // Generate ~135 items per category
    for (let i = 0; i < 135; i++) {
      const template = baseTemplates[i % baseTemplates.length];
      const brand = categoryBrands[i % categoryBrands.length];
      const weight = WEIGHTS[(i + Math.floor(Math.random() * 3)) % WEIGHTS.length];
      const tag = TAGS[Math.floor(Math.random() * TAGS.length)];
      
      const variance = Math.floor(Math.random() * 40) - 20;
      const basePrice = Math.max(10, template.price + variance);
      const isDiscounted = Math.random() > 0.4;
      
      // Add pack variations for variety
      let suffix = "";
      if (i % 7 === 0) suffix = `(Pack of 2)`;
      else if (i % 11 === 0) suffix = `(Pack of 1)`;
      
      // Creating unique names to avoid duplicates in lists
      const uniqueName = `${brand} ${template.name} ${suffix}`.trim();
      
      products.push({
        id: generateId(),
        name: uniqueName,
        category: cat.name,
        image: template.image,
        price: basePrice,
        discountPrice: isDiscounted ? Math.floor(basePrice * 0.9) : undefined,
        weight: weight,
        time: tag,
        bestseller: Math.random() > 0.85
      });
    }
  });

  return [...FIXED_PRODUCTS, ...products].sort((a, b) => a.name.localeCompare(b.name));
};

export const PRODUCTS = generateProducts();

// --- Legal & Support Data ---

export const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    content: `
      1. **Introduction**: Welcome to Blinkit Clone. We value your trust and are committed to protecting your personal information.
      
      2. **Data Collection**: We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes name, email, phone number, and address.
      
      3. **Use of Information**: We use your data to provide, maintain, and improve our services, process transactions, and communicate with you.
      
      4. **Data Sharing**: We do not sell your personal data. We may share data with third-party vendors (like delivery partners) solely to fulfill your orders.
      
      5. **Security**: We implement industry-standard security measures to protect your data.
      
      6. **Your Rights**: You have the right to access, correct, or delete your personal data. Contact support for assistance.
      
      *Last Updated: January 2026*
    `
  },
  terms: {
    title: "Terms of Use",
    content: `
      1. **Acceptance**: By accessing this app, you agree to be bound by these Terms of Use.
      
      2. **Eligibility**: You must be at least 18 years old to use our services.
      
      3. **Account Security**: You are responsible for maintaining the confidentiality of your account credentials.
      
      4. **Prohibited Conduct**: You agree not to use the service for any unlawful purpose or to violate any laws.
      
      5. **Orders & Pricing**: All orders are subject to availability. Prices are subject to change without notice.
      
      6. **Liability**: Blinkit Clone is not liable for any indirect, incidental, or consequential damages arising from your use of the service.
      
      *Effective Date: January 1, 2026*
    `
  },
  disclosure: {
    title: "Responsible Disclosure Policy",
    content: `
      Security is our top priority. If you believe you have found a security vulnerability in our platform, we encourage you to let us know right away.
      
      **Guidelines**:
      - Do not exploit the vulnerability.
      - Do not access user data.
      - Report detailed steps to reproduce the issue.
      
      **Reward Program**: We offer recognition and potential rewards for valid security reports depending on severity.
      
      Email us at: security@blinkit-clone.dev
    `
  },
  mobikwik: {
    title: "MobiKwik / Zip Terms & Conditions",
    content: `
      1. **Zip Pay Later**: Zip is a credit line facility provided by MobiKwik's lending partners.
      
      2. **Repayment**: Bills are generated on the 1st and 16th of every month. Late payments attract penalty charges.
      
      3. **Usage**: Zip balance can be used for orders on Blinkit Clone.
      
      4. **KYC**: Usage of Zip requires completion of KYC verification as per RBI guidelines.
      
      5. **Default**: Failure to repay may impact your credit score.
    `
  },
  dmca: {
    title: "Legal & DMCA",
    content: `
      **1. Content Ownership**: All product images and descriptions are for demonstration purposes. 
      
      **2. DMCA / Takedown**: If you believe any content on this platform infringes your copyright, please contact the Lead Developer immediately.
      
      **3. Liability**: We are not responsible for delays in maintenance work. This tool serves purely as a communication bridge.
      
      **4. Privacy**: We store minimal data (Email/Name) solely for authentication. No data is sold to third parties.
      
      **Contact for Takedown**: dmca@blinkit-clone.dev
    `
  }
};

// FAQ Generator
const FAQ_CATEGORIES = [
  { id: 'order', name: 'Orders & Returns' },
  { id: 'payment', name: 'Payments & Refunds' },
  { id: 'delivery', name: 'Delivery Issues' },
  { id: 'account', name: 'Account & Profile' },
  { id: 'other', name: 'Other Issues' },
];

const FAQ_TEMPLATES = {
  order: [
    "Where is my order #ID?",
    "I want to cancel order #ID.",
    "Items missing in order #ID.",
    "Quality issue with order #ID.",
    "Can I modify order #ID?",
    "Invoice for order #ID.",
    "Wrong items in order #ID.",
    "Order #ID marked delivered but not received.",
    "Repeat order #ID.",
    "Feedback for order #ID."
  ],
  payment: [
    "Refund status for #ID?",
    "Payment failed but amount deducted.",
    "UPI transaction pending.",
    "Cod option not available.",
    "Wallet balance issue.",
    "Double deduction on order #ID.",
    "Coupon code not working.",
    "Zip payment failed.",
    "Cashback not received.",
    "Change payment mode for #ID."
  ],
  delivery: [
    "Delivery partner rude behavior.",
    "Delivery delayed.",
    "Change delivery address.",
    "Delivery partner not moving.",
    "Contact delivery partner.",
    "Leave at door instruction.",
    "Wrong location detected.",
    "Gate entry issue.",
    "Delivery vehicle issue.",
    "Late night delivery safety."
  ],
  account: [
    "Change phone number.",
    "Update email address.",
    "Delete my account.",
    "Manage saved addresses.",
    "Logout from all devices.",
    "Privacy settings.",
    "Notification preferences.",
    "Membership renewal.",
    "Referral code not working.",
    "Login OTP issue."
  ],
  other: [
    "App crashing.",
    "Suggestion for new items.",
    "Report a bug.",
    "Partner with us.",
    "Job openings.",
    "Legal enquiry.",
    "Press enquiry.",
    "Bulk order request.",
    "Feature request.",
    "Feedback about app."
  ]
};

const getRealisticAnswer = (question: string, id: string) => {
    if (question.includes("Where is my order")) {
        return `Order #${id} is currently out for delivery and will reach you in approximately 8 minutes. You can track the live location on the home screen. Our delivery partner is moving swiftly!`;
    }
    if (question.includes("cancel order")) {
        return `You can cancel order #${id} within 60 seconds of placing it. If the 'Cancel' button is not visible, it means the order has already been packed. Please contact customer support for urgent requests.`;
    }
    if (question.includes("Items missing")) {
        return `We are extremely sorry that items are missing from order #${id}. We have verified the packing video. A refund for the missing items has been initiated to your original payment method.`;
    }
    if (question.includes("Quality issue")) {
        return `We apologize for the quality issue in order #${id}. Freshness is our priority. Please share a picture of the item, and we will process a replacement or full refund immediately.`;
    }
    if (question.includes("modify order")) {
        return `Unfortunately, order #${id} cannot be modified once placed to ensure 8-minute delivery speed. You can place a new order for the additional items.`;
    }
    if (question.includes("Invoice")) {
        return `The invoice for order #${id} has been sent to your registered email address (godayush10@gmail.com). You can also download it from the 'My Orders' section.`;
    }
    if (question.includes("Refund status")) {
        return `The refund for order #${id} was processed yesterday. It usually takes 5-7 business days to reflect in your bank account, depending on your bank's processing time.`;
    }
    if (question.includes("Payment failed")) {
        return `If the amount was deducted for a failed transaction, it is automatically reversed by the gateway within 48 hours. Please check your bank statement after 2 days.`;
    }
    if (question.includes("Delivery delayed")) {
        return `We are sorry for the delay. High demand in your area is causing a slight backlog. Your order is prioritized and will be assigned to the next available partner.`;
    }
    if (question.includes("Delivery partner rude")) {
        return `We have zero tolerance for rude behavior. We have noted this incident against the delivery partner for order #${id} and will take strict disciplinary action.`;
    }
    if (question.includes("Change delivery address")) {
        return `For security reasons, the delivery address cannot be changed once the order is placed. If the partner hasn't left yet, you can try cancelling and reordering.`;
    }
    if (question.includes("Coupon code")) {
        return `Please check the terms and conditions of the coupon. Some coupons are valid only on specific categories or minimum order values. Try 'BLINKITNEW' for 20% off if you are a new user.`;
    }
    return `Thank you for reaching out about "${question}". Our support team is looking into this. Since this is a specialized query, we have raised a ticket (TKT-${id}). You will receive an update via email shortly.`;
};

export const generateFAQs = () => {
  const faqs: { category: string, question: string, answer: string }[] = [];
  
  FAQ_CATEGORIES.forEach(cat => {
    const templates = FAQ_TEMPLATES[cat.id as keyof typeof FAQ_TEMPLATES];
    // Generate 100 questions per category by cycling templates with random IDs
    for(let i = 0; i < 100; i++) {
      const template = templates[i % templates.length];
      const randomId = Math.floor(10000 + Math.random() * 90000).toString();
      const question = template.replace("#ID", `#${randomId}`);
      
      faqs.push({
        category: cat.id,
        question: question,
        answer: getRealisticAnswer(question, randomId)
      });
    }
  });
  
  return { categories: FAQ_CATEGORIES, questions: faqs };
};

export const SUPPORT_DATA = generateFAQs();
