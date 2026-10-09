# SGBL Vendor Mobile App - React Native

## Overview
A complete React Native mobile application for SGBL vendor management with Stock Alert features.

## Features Implemented

### ✅ Authentication
- Mobile number login (10 digits)
- OTP verification (6-digit code)
- Auto-login redirects to Orders page

### ✅ Bottom Tab Navigation
- **Orders** - View all orders with trip details
- **Catalog** - Browse and manage products
- **Deliveries** - View delivery status
- **My Account** - Profile and logout

### ✅ Stock Alert System (MOBILE EXCLUSIVE)
- **On-Login Alert Modal**: Shows all products needing attention
- Displays count of Out of Stock and Low Stock items
- Shows product details with status badges
- Direct Edit button for each product in the alert
- Edit modal for stock and price updates
- Real-time notifications on status changes
- Stock status calculated: OUT_OF_STOCK (0), LOW_STOCK (1-3), NORMAL_STOCK (4+)

### ✅ Catalog Screen
- Product listing with search
- Filter options (Status, Category, Brand)
- Price details (MRP, Selling Price)
- Stock quantity display
- Product variants with selection status
- Edit button for each product

### ✅ SKU Edit Modal
- Stock section: Available Cases, Available Pieces, Total Available
- Pricing section: MRP, Selling Price
- Update Stock button
- Update Price button  
- Back navigation
- Automatic notification on stock status changes

### ✅ Notification System
- Toast notifications on top of screen
- Color-coded by type (success/error/warning/info)
- Auto-dismiss after 5 seconds
- Shows stock and price updates

## Project Structure

```
src/
├── app/                      # Expo Router screens
│   ├── index.tsx            # Entry point (redirects based on auth)
│   ├── _layout.tsx          # Root layout with providers
│   ├── auth/                # Authentication screens
│   │   ├── login.tsx        # Mobile number input
│   │   ├── otp.tsx          # OTP verification
│   │   └── _layout.tsx      # Auth navigation
│   └── (tabs)/              # Main app screens (tab navigation)
│       ├── _layout.tsx      # Tab layout with Stock Alert Modal
│       ├── orders.tsx       # Orders listing
│       ├── catalog.tsx      # Product catalog
│       ├── deliveries.tsx   # Deliveries screen
│       └── account.tsx      # My Account & Logout
├── components/              # Reusable components
│   ├── StockAlertModal.tsx  # Stock alert popup on login
│   ├── SKUEditModal.tsx     # Edit stock/price details
│   └── NotificationToast.tsx # Toast notifications
├── context/                 # React Context providers
│   ├── AppContext.tsx       # Auth & stock alert state
│   └── NotificationContext.tsx # Notification management
└── data/                    # Mock data & utilities
    └── mockData.ts          # Products, stock status logic
```

## Login Credentials
- Mobile Number: Any 10 digits
- OTP: `123456` or any 6 digits

## Stock Status Logic
- **OUT_OF_STOCK**: 0 pieces
- **LOW_STOCK**: 1-3 pieces  
- **NORMAL_STOCK**: 4+ pieces

## Running the App

### Web Preview
```bash
cd "C:\Users\Admin\Desktop\Claude Clone\SGBL-Vendor-Mobile-App"
npm run web
```
Opens at http://localhost:19006

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Development Mode
```bash
npm start
```
Press `w` for web, `i` for iOS, `a` for Android

## Key Differences from Web App
✅ Native mobile UI optimized for touch
✅ Bottom tab navigation (mobile standard)
✅ Mobile-optimized forms and modals
✅ Swipe-friendly interfaces
✅ Separate from web app - no interference
✅ Same Stock Alert feature with mobile UX
✅ Native notifications system

## Technologies Used
- React Native 0.86.3
- Expo 57.0.24
- Expo Router (Navigation)
- React 19.2.3
- TypeScript
- Context API (State Management)

## Features Status
- ✅ Login/OTP flow
- ✅ Tab navigation
- ✅ Stock alerts on login
- ✅ Product catalog
- ✅ Stock/Price editing
- ✅ Notifications
- ✅ Real-time stock updates
- ✅ My Account & Logout

## Notes
- This is a completely separate app from the web version
- Runs on different stack (React Native vs React)
- Shares same mock data structure but independent instance
- Can run simultaneously with web app without interference
