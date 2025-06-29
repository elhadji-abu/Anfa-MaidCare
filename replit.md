# MaidCare Pro - Maid Hiring Management System

## Overview

MaidCare Pro is a comprehensive full-stack web application for managing domestic helper services in Garissa. It provides a public-facing website for customers to request services and an admin dashboard for managing bookings, maids, and service categories. The application is built with modern web technologies and follows a clean, modular architecture.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Shadcn/ui with Radix UI primitives and Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API endpoints with JSON responses

### Development Setup
- **Environment**: Replit-optimized with development banners and cartographer
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Build Process**: Vite for frontend bundling, esbuild for backend bundling

## Key Components

### Database Schema
The application uses five main entities:
- **Users**: Admin authentication with username/password
- **Categories**: Service categories (housekeeping, babysitting, caregiving)
- **Maids**: Domestic helper profiles with availability status
- **Bookings**: Service requests with status tracking
- **Pages**: CMS for managing static content

### Authentication System
- Session-based authentication for admin users
- Login/logout functionality with session management
- Protected routes for admin dashboard access
- Role-based access control (admin role)

### Public Interface
- Landing page with hero section and service overview
- Service request modal for booking appointments
- Contact form for general inquiries
- Responsive design for mobile and desktop

### Admin Dashboard
- Dashboard metrics showing booking statistics
- Booking management with status updates
- Maid profile management
- Service category management
- Tabbed interface for organized administration

## Data Flow

1. **Public User Journey**:
   - User visits landing page
   - Browses available services
   - Submits service request through modal
   - Receives booking confirmation with tracking number

2. **Admin Workflow**:
   - Admin logs in to dashboard
   - Views pending booking requests
   - Assigns maids to approved bookings
   - Manages maid profiles and availability
   - Updates service categories as needed

3. **API Communication**:
   - Frontend makes RESTful API calls to backend
   - TanStack Query handles caching and state synchronization
   - Real-time updates through query invalidation
   - Error handling with toast notifications

## External Dependencies

### Frontend Libraries
- **UI Framework**: React with extensive Radix UI component library
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Hookform Resolvers
- **Validation**: Zod for schema validation
- **Styling**: Tailwind CSS with class-variance-authority
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Session Store**: connect-pg-simple for PostgreSQL sessions
- **Database Provider**: @neondatabase/serverless for connection
- **Schema Validation**: Drizzle-zod for type-safe validation

### Development Tools
- **Build Tools**: Vite and esbuild for optimized bundling
- **Type Checking**: TypeScript with strict mode enabled
- **Development Server**: tsx for TypeScript execution
- **Database Migrations**: Drizzle Kit for schema management

## Deployment Strategy

### Build Process
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Database: Drizzle migrations applied via `db:push` command

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- PostgreSQL database required for production deployment
- Session secret and other sensitive config via environment variables

### Production Deployment
- Single-command build process combining frontend and backend
- Static asset serving through Express in production
- Database migrations managed through Drizzle Kit
- Environment-specific configuration for development vs production

## Changelog

```
Changelog:
- June 29, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```