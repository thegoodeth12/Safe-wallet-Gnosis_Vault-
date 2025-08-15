# Gnosis Vault Dashboard - Safe Multisig Management System

## Overview

This is a comprehensive Safe multisig vault management dashboard built with modern web technologies. The application provides a unified interface for managing multiple Safe wallets across different blockchain networks, with real-time proposal tracking, GitHub Actions integration, and comprehensive monitoring capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Storage**: In-memory storage with interface for future database integration
- **Development**: Hot module replacement via Vite integration

### Component Structure
The application follows a modular component architecture with:
- Dashboard-specific components in `client/src/components/dashboard/`
- Reusable UI components in `client/src/components/ui/` (shadcn/ui)
- Custom hooks in `client/src/hooks/`
- API utilities in `client/src/lib/`

## Key Components

### Data Models
The application manages four core entities:
1. **Safes**: Multi-signature wallets with network, balance, and threshold information
2. **Proposals**: Transaction proposals with signature tracking and execution status
3. **Activities**: Audit trail of all system actions and changes
4. **System Status**: Health monitoring for external services and integrations

### API Endpoints
- `GET/POST /api/safes` - Safe wallet management
- `GET/POST/PATCH /api/proposals` - Proposal lifecycle management
- `GET/POST /api/activities` - Activity logging and retrieval
- `GET/PATCH /api/system-status` - System health monitoring

### Dashboard Features
- **Vault Overview**: Multi-chain Safe wallet status and balances
- **Proposals Table**: Real-time proposal tracking with signature progress
- **Activity Sidebar**: Recent actions and system status monitoring
- **System Status**: Service health indicators for GitHub Actions, Vercel, and Replit

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from Express API
2. **API Processing**: Express routes validate input and interact with storage layer
3. **Storage Operations**: Memory-based storage implements standardized interface
4. **Real-time Updates**: Automatic refetching keeps dashboard current
5. **State Management**: Query cache provides optimistic updates and error handling

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives, Lucide icons
- **Styling**: Tailwind CSS, class-variance-authority
- **Forms**: React Hook Form with Zod validation

### Database and ORM
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: Neon Database (serverless PostgreSQL)
- **Schema**: Shared schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database schema management

### Development Tools
- **Build**: Vite with TypeScript support
- **Linting**: TypeScript compiler for type checking
- **Development**: tsx for TypeScript execution
- **Replit Integration**: Runtime error overlay and cartographer plugins

### Safe/Blockchain Integration
The application is designed to integrate with:
- Safe (Gnosis Safe) multisig wallets
- Multiple blockchain networks (Ethereum, Arbitrum, Polygon)
- GitHub Actions for automated workflows
- Discord/Telegram for notifications

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Environment variable `DATABASE_URL` for connection
- **Hot Reloading**: Full-stack development with file watching

### Production Build
- **Frontend**: Vite build outputs to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Deployment**: Single Node.js process serving both frontend and API

### Environment Configuration
- **Development**: `NODE_ENV=development` with debug logging
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: PostgreSQL connection via `DATABASE_URL`

### Platform Integration
- **Replit**: Native development environment support
- **Vercel**: Ready for serverless deployment
- **GitHub Actions**: Automated workflows for Safe proposal management

The application architecture prioritizes developer experience with hot reloading, type safety, and modern tooling while maintaining production readiness with optimized builds and scalable deployment options.