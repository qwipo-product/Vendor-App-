export const LOW_STOCK_THRESHOLD = 3;

export type StockStatus = 'OUT_OF_STOCK' | 'LOW_STOCK' | 'NORMAL_STOCK';

export interface SKU {
  id: string;
  productName: string;
  mrp: number;
  sellingPrice: number;
  orderedQty: number;
  invoiceQty: number;
  availableQty: number;
  cases: number;
  pieces: number;
  brand: string;
  stock: {
    availableCases: number;
    availablePieces: number;
    totalAvailablePieces: number;
    piecesPerCase: number;
  };
  pricing: {
    mrp: number;
    sellingPrice: number;
    pricingRules: number;
  };
  details: {
    shortName: string;
    barCode: string;
    longDescription: string;
    shortDescription: string;
    uom: string;
    packageType: string;
    sellingUnit: number;
  };
  tax: {
    country: string;
    taxCategory: string;
    taxRate: number;
    caseRate: number;
    hsnCode: string;
  };
  packaging: {
    upc: string;
    innerPackQty: number;
    minOrderQty: number;
    maxOrderQty: number;
    displayOrder: number;
    pickupOrder: number;
    packageType: string;
  };
  images: {
    permanent?: string;
    optional1?: string;
    optional2?: string;
    optional3?: string;
    optional4?: string;
  };
  status: 'Active' | 'Inactive';
}

export function getStockStatus(cases: number, pieces: number): StockStatus {
  if (cases === 0 && pieces === 0) return 'OUT_OF_STOCK';
  if (cases > 3 || pieces > 3) return 'NORMAL_STOCK';
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

export const mockSKUs: SKU[] = [
  {
    id: '1',
    productName: 'Goldfresh Sunflower Oil -15 Ltr, 1 Tin',
    mrp: 2500,
    sellingPrice: 2285,
    orderedQty: 19,
    invoiceQty: 0,
    availableQty: 19,
    cases: 0,
    pieces: 0,
    brand: 'Goldfresh',
    stock: { availableCases: 0, availablePieces: 0, totalAvailablePieces: 0, piecesPerCase: 1 },
    pricing: { mrp: 2500, sellingPrice: 2285, pricingRules: 0 },
    details: { shortName: 'Goldfresh 15L', barCode: '8250121443232W21', longDescription: 'Premium sunflower oil', shortDescription: 'Goldfresh 15L', uom: 'Tin', packageType: 'Ltr', sellingUnit: 15 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Tin' },
    images: {},
    status: 'Active'
  },
  {
    id: '2',
    productName: 'Deepking Pooja Oil -400 Ml, 1 Bottle',
    mrp: 90,
    sellingPrice: 62,
    orderedQty: 32,
    invoiceQty: 0,
    availableQty: 32,
    cases: 0,
    pieces: 2,
    brand: 'Deepking',
    stock: { availableCases: 0, availablePieces: 2, totalAvailablePieces: 2, piecesPerCase: 20 },
    pricing: { mrp: 90, sellingPrice: 62, pricingRules: 0 },
    details: { shortName: 'Deepking 400ML', barCode: '8250121443232W21', longDescription: 'Deepking pooja oil', shortDescription: 'Deepking 400ML', uom: 'Bottle', packageType: 'Ml', sellingUnit: 400 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  },
  {
    id: '3',
    productName: 'Deepking Pooja Oil -200 Ml, 1 Bottle',
    mrp: 54,
    sellingPrice: 30,
    orderedQty: 80,
    invoiceQty: 0,
    availableQty: 80,
    cases: 0,
    pieces: 3,
    brand: 'Deepking',
    stock: { availableCases: 0, availablePieces: 3, totalAvailablePieces: 3, piecesPerCase: 20 },
    pricing: { mrp: 54, sellingPrice: 30, pricingRules: 0 },
    details: { shortName: 'Deepking 200ML', barCode: '8250121443232W21', longDescription: 'Deepking pooja oil 200ml', shortDescription: 'Deepking 200ML', uom: 'Bottle', packageType: 'Ml', sellingUnit: 200 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  },
  {
    id: '4',
    productName: 'Freedom Refined Sunflower Oil -500 Ml Pouch',
    mrp: 103,
    sellingPrice: 86,
    orderedQty: 60,
    invoiceQty: 0,
    availableQty: 60,
    cases: 0,
    pieces: 0,
    brand: 'Freedom',
    stock: { availableCases: 0, availablePieces: 0, totalAvailablePieces: 0, piecesPerCase: 20 },
    pricing: { mrp: 103, sellingPrice: 86, pricingRules: 0 },
    details: { shortName: 'Freedom 500ML', barCode: '8250121443232W21', longDescription: 'Freedom refined sunflower oil', shortDescription: 'Freedom 500ML', uom: 'Pouch', packageType: 'Ml', sellingUnit: 500 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '5',
    productName: 'Freedom Refined Sunflower Oil 1 Ltr Pet Bottle',
    mrp: 195,
    sellingPrice: 178,
    orderedQty: 24,
    invoiceQty: 0,
    availableQty: 24,
    cases: 2,
    pieces: 0,
    brand: 'Freedom',
    stock: { availableCases: 0, availablePieces: 2, totalAvailablePieces: 2, piecesPerCase: 20 },
    pricing: { mrp: 195, sellingPrice: 178, pricingRules: 0 },
    details: { shortName: 'Freedom 1L', barCode: '8250121443232W21', longDescription: 'Freedom 1 liter pet bottle', shortDescription: 'Freedom 1L', uom: 'Pet Bottle', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  },
  {
    id: '6',
    productName: 'Freedom Refined Sunflower Oil 1 Ltr Pouch',
    mrp: 215,
    sellingPrice: 174.5,
    orderedQty: 544,
    invoiceQty: 0,
    availableQty: 544,
    cases: 34,
    pieces: 0,
    brand: 'Freedom',
    stock: { availableCases: 0, availablePieces: 1280, totalAvailablePieces: 1280, piecesPerCase: 20 },
    pricing: { mrp: 215, sellingPrice: 174.5, pricingRules: 0 },
    details: { shortName: 'Freedom 1L Pouch', barCode: '8250121443232W21', longDescription: 'Freedom 1 liter pouch', shortDescription: 'Freedom 1L Pouch', uom: 'Pouch', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '7',
    productName: 'Freedom Refined Sunflower Oil 5 Ltr Pet Jar',
    mrp: 1020,
    sellingPrice: 901,
    orderedQty: 8,
    invoiceQty: 0,
    availableQty: 8,
    cases: 2,
    pieces: 0,
    brand: 'Freedom',
    stock: { availableCases: 0, availablePieces: 152, totalAvailablePieces: 152, piecesPerCase: 1 },
    pricing: { mrp: 1020, sellingPrice: 901, pricingRules: 0 },
    details: { shortName: 'Freedom 5L Jar', barCode: '8250121443232W21', longDescription: 'Freedom 5 liter pet jar', shortDescription: 'Freedom 5L Jar', uom: 'Jar', packageType: 'Ltr', sellingUnit: 5 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Jar' },
    images: {},
    status: 'Active'
  },
  {
    id: '8',
    productName: 'Freedom Rice Brand Oil 1 Ltr Pouch',
    mrp: 210,
    sellingPrice: 170.5,
    orderedQty: 16,
    invoiceQty: 0,
    availableQty: 16,
    cases: 1,
    pieces: 0,
    brand: 'Freedom',
    stock: { availableCases: 1, availablePieces: 0, totalAvailablePieces: 20, piecesPerCase: 20 },
    pricing: { mrp: 210, sellingPrice: 170.5, pricingRules: 0 },
    details: { shortName: 'Freedom Rice 1L', barCode: '8250121443232W21', longDescription: 'Freedom rice bran oil', shortDescription: 'Freedom Rice 1L', uom: 'Pouch', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '9',
    productName: 'Gold Drop Refined Sunflower Oil 1 Ltr Box',
    mrp: 231,
    sellingPrice: 173.75,
    orderedQty: 608,
    invoiceQty: 0,
    availableQty: 608,
    cases: 38,
    pieces: 0,
    brand: 'Gold Drop',
    stock: { availableCases: 0, availablePieces: 38, totalAvailablePieces: 38, piecesPerCase: 16 },
    pricing: { mrp: 231, sellingPrice: 173.75, pricingRules: 0 },
    details: { shortName: 'Gold Drop 1L', barCode: '8250121443232W21', longDescription: 'Gold Drop refined sunflower oil', shortDescription: 'Gold Drop 1L', uom: 'Box', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 16, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Box' },
    images: {},
    status: 'Active'
  },
  {
    id: '10',
    productName: 'Gold Drop Refined Sunflower Oil 15 Ltr Tin',
    mrp: 2835,
    sellingPrice: 2620,
    orderedQty: 6,
    invoiceQty: 0,
    availableQty: 6,
    cases: 0,
    pieces: 6,
    brand: 'Gold Drop',
    stock: { availableCases: 0, availablePieces: 1, totalAvailablePieces: 1, piecesPerCase: 1 },
    pricing: { mrp: 2835, sellingPrice: 2620, pricingRules: 0 },
    details: { shortName: 'Gold Drop 15L', barCode: '8250121443232W21', longDescription: 'Gold Drop 15 liter tin', shortDescription: 'Gold Drop 15L', uom: 'Tin', packageType: 'Ltr', sellingUnit: 15 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Tin' },
    images: {},
    status: 'Active'
  },
  {
    id: '11',
    productName: 'Gold Drop Refined Sunflower Oil 5 Ltr Jar',
    mrp: 1188,
    sellingPrice: 898,
    orderedQty: 16,
    invoiceQty: 0,
    availableQty: 16,
    cases: 4,
    pieces: 0,
    brand: 'Gold Drop',
    stock: { availableCases: 0, availablePieces: 2, totalAvailablePieces: 2, piecesPerCase: 1 },
    pricing: { mrp: 1188, sellingPrice: 898, pricingRules: 0 },
    details: { shortName: 'Gold Drop 5L Jar', barCode: '8250121443232W21', longDescription: 'Gold Drop 5 liter jar', shortDescription: 'Gold Drop 5L Jar', uom: 'Jar', packageType: 'Ltr', sellingUnit: 5 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Jar' },
    images: {},
    status: 'Active'
  },
  {
    id: '12',
    productName: 'Goldfresh Sunflower Oil -350 Gm, 1 Pouch',
    mrp: 82,
    sellingPrice: 62,
    orderedQty: 96,
    invoiceQty: 0,
    availableQty: 96,
    cases: 3,
    pieces: 0,
    brand: 'Goldfresh',
    stock: { availableCases: 0, availablePieces: 3, totalAvailablePieces: 3, piecesPerCase: 1 },
    pricing: { mrp: 82, sellingPrice: 62, pricingRules: 0 },
    details: { shortName: 'Goldfresh 350GM', barCode: '8250121443232W21', longDescription: 'Goldfresh 350 gram pouch', shortDescription: 'Goldfresh 350GM', uom: 'Pouch', packageType: 'Gm', sellingUnit: 350 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '13',
    productName: 'Goldfresh Sunflower Oil -500 Ml, 1 Pouch',
    mrp: 97,
    sellingPrice: 77,
    orderedQty: 96,
    invoiceQty: 0,
    availableQty: 96,
    cases: 3,
    pieces: 0,
    brand: 'Goldfresh',
    stock: { availableCases: 0, availablePieces: 3, totalAvailablePieces: 3, piecesPerCase: 1 },
    pricing: { mrp: 97, sellingPrice: 77, pricingRules: 0 },
    details: { shortName: 'Goldfresh 500ML', barCode: '8250121443232W21', longDescription: 'Goldfresh 500 ml pouch', shortDescription: 'Goldfresh 500ML', uom: 'Pouch', packageType: 'Ml', sellingUnit: 500 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '14',
    productName: 'Goldfresh Sunflower Oil -700 Gm, 1 Pouch',
    mrp: 155,
    sellingPrice: 122,
    orderedQty: 48,
    invoiceQty: 0,
    availableQty: 48,
    cases: 3,
    pieces: 0,
    brand: 'Goldfresh',
    stock: { availableCases: 0, availablePieces: 3, totalAvailablePieces: 3, piecesPerCase: 1 },
    pricing: { mrp: 155, sellingPrice: 122, pricingRules: 0 },
    details: { shortName: 'Goldfresh 700GM', barCode: '8250121443232W21', longDescription: 'Goldfresh 700 gram pouch', shortDescription: 'Goldfresh 700GM', uom: 'Pouch', packageType: 'Gm', sellingUnit: 700 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '15',
    productName: 'Goldfresh Sunflower Oil 1 Ltr Pouch',
    mrp: 171,
    sellingPrice: 155,
    orderedQty: 48,
    invoiceQty: 0,
    availableQty: 48,
    cases: 3,
    pieces: 0,
    brand: 'Goldfresh',
    stock: { availableCases: 0, availablePieces: 3, totalAvailablePieces: 3, piecesPerCase: 1 },
    pricing: { mrp: 171, sellingPrice: 155, pricingRules: 0 },
    details: { shortName: 'Goldfresh 1L Pouch', barCode: '8250121443232W21', longDescription: 'Goldfresh 1 liter pouch', shortDescription: 'Goldfresh 1L Pouch', uom: 'Pouch', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '16',
    productName: 'Nice Gold Refined Palmolien Oil -15 Ltr, 1 Tin',
    mrp: 2700,
    sellingPrice: 2220,
    orderedQty: 1,
    invoiceQty: 0,
    availableQty: 1,
    cases: 0,
    pieces: 1,
    brand: 'Nice Gold',
    stock: { availableCases: 0, availablePieces: 1, totalAvailablePieces: 1, piecesPerCase: 1 },
    pricing: { mrp: 2700, sellingPrice: 2220, pricingRules: 0 },
    details: { shortName: 'Nice Gold 15L', barCode: '8250121443232W21', longDescription: 'Nice Gold refined palmolien oil', shortDescription: 'Nice Gold 15L', uom: 'Tin', packageType: 'Ltr', sellingUnit: 15 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Tin' },
    images: {},
    status: 'Active'
  },
  {
    id: '17',
    productName: 'Panchratan Deepam Oil -100 Ml, Pet Bottle',
    mrp: 45,
    sellingPrice: 20,
    orderedQty: 60,
    invoiceQty: 0,
    availableQty: 60,
    cases: 1,
    pieces: 0,
    brand: 'Panchratan',
    stock: { availableCases: 0, availablePieces: 1, totalAvailablePieces: 1, piecesPerCase: 20 },
    pricing: { mrp: 45, sellingPrice: 20, pricingRules: 0 },
    details: { shortName: 'Panchratan 100ML', barCode: '8250121443232W21', longDescription: 'Panchratan deepam oil 100ml', shortDescription: 'Panchratan 100ML', uom: 'Pet Bottle', packageType: 'Ml', sellingUnit: 100 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  },
  {
    id: '18',
    productName: 'Panchratan Deepam Oil -200 Ml, Pet Bottle',
    mrp: 72,
    sellingPrice: 30,
    orderedQty: 40,
    invoiceQty: 0,
    availableQty: 40,
    cases: 1,
    pieces: 0,
    brand: 'Panchratan',
    stock: { availableCases: 0, availablePieces: 3, totalAvailablePieces: 3, piecesPerCase: 20 },
    pricing: { mrp: 72, sellingPrice: 30, pricingRules: 0 },
    details: { shortName: 'Panchratan 200ML', barCode: '8250121443232W21', longDescription: 'Panchratan deepam oil 200ml', shortDescription: 'Panchratan 200ML', uom: 'Pet Bottle', packageType: 'Ml', sellingUnit: 200 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 20, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  },
  {
    id: '19',
    productName: 'Sunsure Sunflower Oil -350 Gm, 1 Pouch',
    mrp: 75,
    sellingPrice: 61.5,
    orderedQty: 288,
    invoiceQty: 0,
    availableQty: 288,
    cases: 9,
    pieces: 0,
    brand: 'Sunsure',
    stock: { availableCases: 0, availablePieces: 9, totalAvailablePieces: 9, piecesPerCase: 1 },
    pricing: { mrp: 75, sellingPrice: 61.5, pricingRules: 0 },
    details: { shortName: 'Sunsure 350GM', barCode: '8250121443232W21', longDescription: 'Sunsure 350 gram pouch', shortDescription: 'Sunsure 350GM', uom: 'Pouch', packageType: 'Gm', sellingUnit: 350 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '20',
    productName: 'Sunsure Sunflower Oil -700 Gm, 1 Pouch',
    mrp: 140,
    sellingPrice: 122,
    orderedQty: 160,
    invoiceQty: 0,
    availableQty: 160,
    cases: 10,
    pieces: 0,
    brand: 'Sunsure',
    stock: { availableCases: 0, availablePieces: 10, totalAvailablePieces: 10, piecesPerCase: 1 },
    pricing: { mrp: 140, sellingPrice: 122, pricingRules: 0 },
    details: { shortName: 'Sunsure 700GM', barCode: '8250121443232W21', longDescription: 'Sunsure 700 gram pouch', shortDescription: 'Sunsure 700GM', uom: 'Pouch', packageType: 'Gm', sellingUnit: 700 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '21',
    productName: 'Sunsure Sunflower Oil -15 Kg, 1 Tin',
    mrp: 2900,
    sellingPrice: 2550,
    orderedQty: 5,
    invoiceQty: 0,
    availableQty: 5,
    cases: 0,
    pieces: 5,
    brand: 'Sunsure',
    stock: { availableCases: 0, availablePieces: 5, totalAvailablePieces: 5, piecesPerCase: 1 },
    pricing: { mrp: 2900, sellingPrice: 2550, pricingRules: 0 },
    details: { shortName: 'Sunsure 15KG', barCode: '8250121443232W21', longDescription: 'Sunsure 15 kilogram tin', shortDescription: 'Sunsure 15KG', uom: 'Tin', packageType: 'Kg', sellingUnit: 15 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Tin' },
    images: {},
    status: 'Active'
  },
  {
    id: '22',
    productName: 'Sunsure Sunflower Oil -4 Ltr, 1 Can',
    mrp: 750,
    sellingPrice: 584,
    orderedQty: 28,
    invoiceQty: 0,
    availableQty: 28,
    cases: 7,
    pieces: 0,
    brand: 'Sunsure',
    stock: { availableCases: 0, availablePieces: 7, totalAvailablePieces: 7, piecesPerCase: 1 },
    pricing: { mrp: 750, sellingPrice: 584, pricingRules: 0 },
    details: { shortName: 'Sunsure 4L', barCode: '8250121443232W21', longDescription: 'Sunsure 4 liter can', shortDescription: 'Sunsure 4L', uom: 'Can', packageType: 'Ltr', sellingUnit: 4 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Can' },
    images: {},
    status: 'Active'
  },
  {
    id: '23',
    productName: 'Sunsure Sunflower Oil 2 Ltr Pet Bottle',
    mrp: 380,
    sellingPrice: 290,
    orderedQty: 54,
    invoiceQty: 0,
    availableQty: 54,
    cases: 6,
    pieces: 0,
    brand: 'Sunsure',
    stock: { availableCases: 0, availablePieces: 6, totalAvailablePieces: 6, piecesPerCase: 1 },
    pricing: { mrp: 380, sellingPrice: 290, pricingRules: 0 },
    details: { shortName: 'Sunsure 2L', barCode: '8250121443232W21', longDescription: 'Sunsure 2 liter pet bottle', shortDescription: 'Sunsure 2L', uom: 'Pet Bottle', packageType: 'Ltr', sellingUnit: 2 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  },
  {
    id: '24',
    productName: 'Vijaya Groundnut Oil 1 Ltr Pouch',
    mrp: 180,
    sellingPrice: 172.7,
    orderedQty: 32,
    invoiceQty: 0,
    availableQty: 32,
    cases: 2,
    pieces: 0,
    brand: 'Vijaya',
    stock: { availableCases: 0, availablePieces: 2, totalAvailablePieces: 2, piecesPerCase: 1 },
    pricing: { mrp: 180, sellingPrice: 172.7, pricingRules: 0 },
    details: { shortName: 'Vijaya 1L', barCode: '8250121443232W21', longDescription: 'Vijaya groundnut oil 1 liter', shortDescription: 'Vijaya 1L', uom: 'Pouch', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Pouch' },
    images: {},
    status: 'Active'
  },
  {
    id: '25',
    productName: 'Virat Mustard Oil 1 Ltr, 1 Bottle',
    mrp: 251,
    sellingPrice: 170,
    orderedQty: 24,
    invoiceQty: 0,
    availableQty: 24,
    cases: 2,
    pieces: 0,
    brand: 'Virat',
    stock: { availableCases: 0, availablePieces: 2, totalAvailablePieces: 2, piecesPerCase: 1 },
    pricing: { mrp: 251, sellingPrice: 170, pricingRules: 0 },
    details: { shortName: 'Virat 1L', barCode: '8250121443232W21', longDescription: 'Virat mustard oil 1 liter', shortDescription: 'Virat 1L', uom: 'Bottle', packageType: 'Ltr', sellingUnit: 1 },
    tax: { country: 'India', taxCategory: 'Taxable supply', taxRate: 5, caseRate: 0, hsnCode: '15121910' },
    packaging: { upc: '360', innerPackQty: 1, minOrderQty: 1, maxOrderQty: 999, displayOrder: 168, pickupOrder: 21, packageType: 'Bottle' },
    images: {},
    status: 'Active'
  }
];
