# Search Sticker Tracking Application

## Overview
A BLE (Bluetooth Low Energy) search sticker tracking application for monitoring and managing adhesive tracking devices. The application supports use cases in offices (asset finding), factories (tool tracking), and luxury shops (anti-tamper).

## Recent Changes
- **2025-10-02**: Initial Replit setup
  - Fixed storage interface to use Sticker schema instead of User schema
  - Implemented API routes for sticker CRUD operations (GET, POST, PATCH, DELETE)
  - Updated frontend Dashboard and Devices pages to use real API instead of mock data
  - Configured Replit deployment with autoscale
  - Added Netlify deployment configuration

## Project Architecture

### Technology Stack
- **Frontend**: React with Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Data Layer**: In-memory storage (MemStorage) with Drizzle ORM schema
- **Build System**: Vite for frontend, esbuild for backend

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/  # UI components (StatsCard, StickerCard, etc.)
│   │   ├── pages/       # Route pages (Dashboard, Devices, Documentation, More)
│   │   └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # In-memory data storage
│   └── vite.ts       # Vite integration for dev mode
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle schema for stickers
└── attached_assets/  # PDF documentation
```

### Key Features
- **Dashboard**: Overview with stats cards showing total stickers, active devices, low battery alerts, and BLE device count
- **Devices**: Full device list with search, filtering, and sorting capabilities
- **Documentation**: Product information and technical specifications
- **Real-time Tracking**: Monitor battery levels, signal strength (RSSI), and last seen timestamps

### API Endpoints
- `GET /api/stickers` - Get all stickers
- `GET /api/stickers/:id` - Get single sticker by ID
- `POST /api/stickers` - Create new sticker
- `PATCH /api/stickers/:id` - Update sticker
- `DELETE /api/stickers/:id` - Delete sticker

### Database Schema (Stickers Table)
- `id` - UUID primary key
- `name` - Sticker name
- `macAddress` - Unique MAC address
- `batteryLevel` - Battery percentage (0-100)
- `rssi` - Signal strength indicator
- `assetName` - Associated asset name
- `location` - Physical location
- `lastSeen` - Last seen timestamp
- `status` - Device status (active, low battery, inactive)

## Development
- Run: `npm run dev` - Starts development server on port 5000
- Build: `npm run build` - Builds for production
- Start: `npm start` - Runs production build

## Deployment
- **Replit**: Configured with autoscale deployment
- **Netlify**: Configuration available in netlify.toml

## Current State
Application is fully functional with:
- Working API backend
- Interactive frontend with search and filtering
- Sample data for testing
- Configured for both Replit and Netlify deployment
