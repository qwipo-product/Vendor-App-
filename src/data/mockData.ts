export const LOW_STOCK_THRESHOLD = 3;

export type StockStatus = 'OUT_OF_STOCK' | 'LOW_STOCK' | 'NORMAL_STOCK';

export interface Product {
  id: string;
  name: string;
  mrp: number;
  sellingPrice: number;
  availableQtyCss: number;
  availableQtyPcs: number;
  orderedQty: number;
  status: 'Active' | 'Inactive';
  image?: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  mrp: number;
  selected: boolean;
}

export function getStockStatus(css: number, pcs: number): StockStatus {
  if (css === 0 && pcs === 0) return 'OUT_OF_STOCK';
  if (css > 3 || pcs > 3) return 'NORMAL_STOCK';
  return 'LOW_STOCK';
}

export function getStockPriority(stockStatus: StockStatus): number {
  switch (stockStatus) {
    case 'OUT_OF_STOCK':
      return 1;
    case 'LOW_STOCK':
      return 2;
    case 'NORMAL_STOCK':
      return 3;
    default:
      return 3;
  }
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Goldfresh Sunflower Oil -15 Ltr, 1 Tin',
    mrp: 2500,
    sellingPrice: 2285,
    availableQtyCss: 0,
    availableQtyPcs: 0,
    orderedQty: 19,
    status: 'Active',
    variants: [
      { id: '1-1', name: '15 Ltr', mrp: 2500, selected: false },
      { id: '1-2', name: '5 Ltr', mrp: 850, selected: false },
    ],
  },
  {
    id: '2',
    name: 'Freedom Refined Sunflower Oil -500 ML Pouch',
    mrp: 103,
    sellingPrice: 86,
    availableQtyCss: 2,
    availableQtyPcs: 0,
    orderedQty: 60,
    status: 'Active',
    variants: [
      { id: '2-1', name: '500 ML', mrp: 103, selected: true },
      { id: '2-2', name: '1 Ltr', mrp: 195, selected: false },
      { id: '2-3', name: '2 Ltr', mrp: 320, selected: false },
    ],
  },
  {
    id: '3',
    name: 'Deepking Pooja Oil -400 Ml, 1 Bottle',
    mrp: 180,
    sellingPrice: 150,
    availableQtyCss: 0,
    availableQtyPcs: 2,
    orderedQty: 8,
    status: 'Active',
    variants: [
      { id: '3-1', name: '400 ML', mrp: 180, selected: false },
      { id: '3-2', name: '800 ML', mrp: 320, selected: false },
    ],
  },
  {
    id: '4',
    name: 'Pancharatna Deepam Oil -100 ML Pet Bottle',
    mrp: 45,
    sellingPrice: 38,
    availableQtyCss: 1,
    availableQtyPcs: 0,
    orderedQty: 60,
    status: 'Active',
    variants: [
      { id: '4-1', name: '100 ML', mrp: 45, selected: false },
      { id: '4-2', name: '200 ML', mrp: 80, selected: false },
    ],
  },
  {
    id: '5',
    name: 'Goldfresh Sunflower Oil -350 Gm, 1 Pouch',
    mrp: 82,
    sellingPrice: 62,
    availableQtyCss: 1,
    availableQtyPcs: 0,
    orderedQty: 15,
    status: 'Active',
    variants: [
      { id: '5-1', name: '350 Gm', mrp: 82, selected: true },
      { id: '5-2', name: '500 ML', mrp: 103, selected: false },
    ],
  },
  {
    id: '6',
    name: 'Goldfresh Sunflower Oil -500 ML, 1 Pouch',
    mrp: 120,
    sellingPrice: 95,
    availableQtyCss: 3,
    availableQtyPcs: 0,
    orderedQty: 32,
    status: 'Active',
    variants: [
      { id: '6-1', name: '500 ML', mrp: 120, selected: false },
      { id: '6-2', name: '1 Ltr', mrp: 220, selected: false },
    ],
  },
  {
    id: '7',
    name: 'Sunsure Sunflower Oil -700 Gm, 1 Pouch',
    mrp: 140,
    sellingPrice: 122,
    availableQtyCss: 0,
    availableQtyPcs: 3,
    orderedQty: 25,
    status: 'Active',
    variants: [
      { id: '7-1', name: '700 Gm', mrp: 140, selected: true },
      { id: '7-2', name: '1 Ltr', mrp: 180, selected: false },
    ],
  },
  {
    id: '8',
    name: 'Vijaya Groundnut Oil -1 Ltr Pouch',
    mrp: 165,
    sellingPrice: 145,
    availableQtyCss: 0,
    availableQtyPcs: 2,
    orderedQty: 42,
    status: 'Active',
    variants: [
      { id: '8-1', name: '500 ML', mrp: 85, selected: false },
      { id: '8-2', name: '1 Ltr', mrp: 165, selected: true },
      { id: '8-3', name: '2 Ltr', mrp: 310, selected: false },
    ],
  },
  {
    id: '9',
    name: 'Virat Mustard Oil -1 Ltr, 1 Bottle',
    mrp: 125,
    sellingPrice: 110,
    availableQtyCss: 0,
    availableQtyPcs: 2,
    orderedQty: 18,
    status: 'Active',
    variants: [
      { id: '9-1', name: '500 ML', mrp: 65, selected: false },
      { id: '9-2', name: '1 Ltr', mrp: 125, selected: true },
    ],
  },
  {
    id: '10',
    name: 'Aashirvaad Atta -5 Kg',
    mrp: 210,
    sellingPrice: 195,
    availableQtyCss: 0,
    availableQtyPcs: 1,
    orderedQty: 72,
    status: 'Active',
    variants: [
      { id: '10-1', name: '1 Kg', mrp: 50, selected: false },
      { id: '10-2', name: '5 Kg', mrp: 210, selected: true },
      { id: '10-3', name: '10 Kg', mrp: 400, selected: false },
    ],
  },
  {
    id: '11',
    name: 'Tata Salt -1 Kg',
    mrp: 25,
    sellingPrice: 20,
    availableQtyCss: 2,
    availableQtyPcs: 0,
    orderedQty: 85,
    status: 'Active',
    variants: [
      { id: '11-1', name: '500 Gm', mrp: 13, selected: false },
      { id: '11-2', name: '1 Kg', mrp: 25, selected: true },
      { id: '11-3', name: '2 Kg', mrp: 45, selected: false },
    ],
  },
  {
    id: '12',
    name: 'Britannia Bournvita -500 Gm',
    mrp: 185,
    sellingPrice: 165,
    availableQtyCss: 12,
    availableQtyPcs: 0,
    orderedQty: 35,
    status: 'Active',
    variants: [
      { id: '12-1', name: '200 Gm', mrp: 80, selected: false },
      { id: '12-2', name: '500 Gm', mrp: 185, selected: true },
    ],
  },
  {
    id: '13',
    name: 'Nestlé Nescafé Classic -50 Gm',
    mrp: 140,
    sellingPrice: 125,
    availableQtyCss: 0,
    availableQtyPcs: 1,
    orderedQty: 22,
    status: 'Active',
    variants: [
      { id: '13-1', name: '25 Gm', mrp: 75, selected: false },
      { id: '13-2', name: '50 Gm', mrp: 140, selected: true },
    ],
  },
  {
    id: '14',
    name: 'Amul Butter -500 Gm',
    mrp: 310,
    sellingPrice: 285,
    availableQtyCss: 1,
    availableQtyPcs: 0,
    orderedQty: 48,
    status: 'Active',
    variants: [
      { id: '14-1', name: '200 Gm', mrp: 135, selected: false },
      { id: '14-2', name: '500 Gm', mrp: 310, selected: true },
    ],
  },
  {
    id: '15',
    name: 'Milkmaid Sweetened Condensed Milk -400 Gm',
    mrp: 120,
    sellingPrice: 108,
    availableQtyCss: 0,
    availableQtyPcs: 3,
    orderedQty: 18,
    status: 'Active',
    variants: [
      { id: '15-1', name: '400 Gm', mrp: 120, selected: true },
    ],
  },
  {
    id: '16',
    name: 'MDH Garam Masala -100 Gm',
    mrp: 95,
    sellingPrice: 85,
    availableQtyCss: 0,
    availableQtyPcs: 3,
    orderedQty: 28,
    status: 'Active',
    variants: [
      { id: '16-1', name: '50 Gm', mrp: 50, selected: false },
      { id: '16-2', name: '100 Gm', mrp: 95, selected: true },
      { id: '16-3', name: '200 Gm', mrp: 175, selected: false },
    ],
  },
  {
    id: '17',
    name: 'Everest Chaat Masala -100 Gm',
    mrp: 85,
    sellingPrice: 75,
    availableQtyCss: 28,
    availableQtyPcs: 0,
    orderedQty: 15,
    status: 'Active',
    variants: [
      { id: '17-1', name: '50 Gm', mrp: 45, selected: false },
      { id: '17-2', name: '100 Gm', mrp: 85, selected: true },
    ],
  },
  {
    id: '18',
    name: 'Rajdhani Basmati Rice -1 Kg',
    mrp: 185,
    sellingPrice: 165,
    availableQtyCss: 65,
    availableQtyPcs: 8,
    orderedQty: 52,
    status: 'Active',
    variants: [
      { id: '18-1', name: '500 Gm', mrp: 95, selected: false },
      { id: '18-2', name: '1 Kg', mrp: 185, selected: true },
      { id: '18-3', name: '5 Kg', mrp: 850, selected: false },
    ],
  },
  {
    id: '19',
    name: 'Catch Turmeric Powder -100 Gm',
    mrp: 65,
    sellingPrice: 58,
    availableQtyCss: 0,
    availableQtyPcs: 2,
    orderedQty: 12,
    status: 'Active',
    variants: [
      { id: '19-1', name: '100 Gm', mrp: 65, selected: true },
      { id: '19-2', name: '200 Gm', mrp: 125, selected: false },
    ],
  },
  {
    id: '20',
    name: 'Saffola Active Oil -1 Ltr',
    mrp: 185,
    sellingPrice: 168,
    availableQtyCss: 28,
    availableQtyPcs: 0,
    orderedQty: 35,
    status: 'Active',
    variants: [
      { id: '20-1', name: '500 ML', mrp: 95, selected: false },
      { id: '20-2', name: '1 Ltr', mrp: 185, selected: true },
      { id: '20-3', name: '2 Ltr', mrp: 350, selected: false },
    ],
  },
  {
    id: '21',
    name: 'Sunfeast Dark Fantasy Cookies -100 Gm',
    mrp: 45,
    sellingPrice: 40,
    availableQtyCss: 45,
    availableQtyPcs: 12,
    orderedQty: 28,
    status: 'Active',
    variants: [
      { id: '21-1', name: '75 Gm', mrp: 35, selected: false },
      { id: '21-2', name: '100 Gm', mrp: 45, selected: true },
      { id: '21-3', name: '250 Gm', mrp: 105, selected: false },
    ],
  },
  {
    id: '22',
    name: 'Parle-G Biscuits -250 Gm',
    mrp: 35,
    sellingPrice: 30,
    availableQtyCss: 120,
    availableQtyPcs: 15,
    orderedQty: 85,
    status: 'Active',
    variants: [
      { id: '22-1', name: '100 Gm', mrp: 15, selected: false },
      { id: '22-2', name: '250 Gm', mrp: 35, selected: true },
      { id: '22-3', name: '500 Gm', mrp: 65, selected: false },
    ],
  },
];

export const mockOrders = [
  {
    id: '1',
    tripNumber: 'TS08UG4076',
    tripType: 'Pickup',
    tripDate: '23-09-2026',
    driverName: '',
    driverMobile: '',
    fieldAgent: '',
    fieldAgentMobile: '',
    otpNumber: '4810',
  },
];
