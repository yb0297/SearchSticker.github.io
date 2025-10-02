# Search Sticker Tracking Application

## Overview
A BLE (Bluetooth Low Energy) search sticker tracking application for monitoring and managing adhesive tracking devices. The application supports use cases in offices (asset finding), factories (tool tracking), and luxury shops (anti-tamper).

## Recent Changes
- **2025-10-02**: Initial Replit setup and feature development
  - Fixed storage interface to use Sticker schema instead of User schema
  - Implemented API routes for sticker CRUD operations (GET, POST, PATCH, DELETE)
  - Updated frontend Dashboard and Devices pages to use real API instead of mock data
  - Configured Replit deployment with autoscale
  - Added Netlify deployment configuration
  - **Integrated Proximity Radar**: Canvas-based radar detector showing sticker proximity based on RSSI signal strength
  - **Added Geographic Map**: Leaflet.js integration for viewing sticker locations on OpenStreetMap
  - **Created Client-Safe Types**: Separated type definitions in shared/types.ts to fix browser build issues
  - **Updated Schema**: Added latitude/longitude fields for location tracking

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
│   │   ├── pages/       # Route pages (Dashboard, Devices, Radar, Map, Documentation, More)
│   │   └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # In-memory data storage with seed data
│   └── vite.ts       # Vite integration for dev mode
├── shared/           # Shared types and schemas
│   ├── schema.ts     # Drizzle schema for stickers (server-only)
│   └── types.ts      # Client-safe TypeScript types
└── attached_assets/  # Documentation files
```

### Key Features
- **Dashboard**: Overview with stats cards showing total stickers, active devices, low battery alerts, and BLE device count
- **Devices**: Full device list with search, filtering, sorting, and add sticker functionality
- **Proximity Radar**: Canvas-based circular radar detector showing sticker proximity based on RSSI signal strength with animated sweep effect
- **Geographic Map**: Interactive OpenStreetMap showing sticker locations with detailed popups (for future GPS integration)
- **Documentation**: Comprehensive product information including technical specifications, cost analysis, and risk assessment
- **Real-time Tracking**: Monitor battery levels, signal strength (RSSI), and last seen timestamps
- **Analytics**: Charts showing battery distribution, sector breakdown, and device statistics

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
- `rssi` - Signal strength indicator (dBm)
- `assetName` - Associated asset name
- `location` - Physical location text
- `latitude` - GPS latitude coordinate (optional)
- `longitude` - GPS longitude coordinate (optional)
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
- Working REST API backend with full CRUD operations
- Interactive frontend with 6 pages (Dashboard, Devices, Radar, Map, Documentation, More)
- Proximity radar detector using Canvas API for RSSI-based visualization
- Geographic map integration using Leaflet.js and OpenStreetMap
- Sample data with 4 stickers showing various states and signal strengths
- Responsive design with dark theme
- Configured for both Replit and Netlify deployment

## How It Works
The Search Sticker web app simulates a BLE tracking system:
1. Each sticker broadcasts its ID, battery level, and signal strength (RSSI)
2. The backend stores sticker data with location and status information
3. The **Radar** page shows proximity detection based on RSSI values (like a sonar detector)
4. The **Map** page shows geographic locations (for future GPS gateway integration)
5. Users can search, filter, and monitor all tracked stickers in real-time
