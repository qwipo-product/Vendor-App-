# BMS Vendor Application

A complete Business Management System (BMS) Vendor Dashboard built with React + TypeScript.

## Features

✅ **Login Page** - Email/password authentication
✅ **Orders Dashboard** - Main dashboard after login
✅ **My SKUs Page** - Product listing with:
  - Search and filter functionality
  - CSV download capability
  - Pagination (25 items per page)
  - Click to view/edit details

✅ **SKU Details Page** - Full SKU management:
  - Stock management (cases, pieces)
  - Pricing management (MRP, Selling Price)
  - Detailed SKU information
  - Tax details and configuration
  - Packaging and inventory settings
  - Image management

✅ **Mock Data** - 25+ pre-loaded SKUs with complete data
✅ **Responsive Design** - Works on desktop and tablet
✅ **Professional UI** - Enterprise-grade styling with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React

## Setup Instructions

### 1. Install Dependencies

```bash
cd "C:\Users\Admin\Desktop\Claude Clone\BMS-Vendor-App"
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## Application Flow

1. **Login** → Enter any email/password (mock auth)
2. **Orders Dashboard** → Main page after login
3. **Products Dropdown** → Click to expand
4. **My SKUs** → View all products in table format
5. **Click Product Row** → View/Edit SKU details
6. **Update Stock/Price** → Make changes and click Update buttons

## Mock Credentials

You can use any email/password combination to log in:
- Email: `vendor@example.com`
- Password: `password123`

(Or any other values - it's mock authentication)

## Project Structure

```
BMS-Vendor-App/
├── src/
│   ├── pages/
│   │   ├── Login.tsx          # Login page
│   │   ├── Dashboard.tsx      # Orders dashboard
│   │   ├── MySKUs.tsx         # Products listing
│   │   └── SKUDetails.tsx     # SKU details/edit
│   ├── components/
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── data/
│   │   └── mockData.ts        # Mock SKU data (25+ items)
│   ├── App.tsx                # Main app with routing
│   ├── main.tsx               # React entry point
│   └── index.css              # Tailwind CSS
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## Features Ready for Enhancement

Once this flow is working, you can add:

- Backend API integration
- Real authentication (JWT, OAuth)
- Database connectivity
- User profile management
- Advanced filters and sorting
- Bulk operations
- Real-time notifications
- Analytics and reporting
- And more!

## Quick Start Command

If using Claude Code:
```
/preview_start "BMS Vendor Dev Server"
```

Or manually:
```bash
cd "C:\Users\Admin\Desktop\Claude Clone\BMS-Vendor-App"
npm install
npm run dev
```

## Next Steps

Tell me what enhancements you'd like to add:
- Backend integration?
- Additional features?
- UI/UX improvements?
- Performance optimizations?

The application is ready for expansion! 🚀
