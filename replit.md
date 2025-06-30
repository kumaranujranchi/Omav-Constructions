# Omav Construction Website

## Overview

This is a full-stack web application for Omav Construction, a construction company based in East and North India. The application provides a comprehensive platform showcasing the company's services, projects, and capabilities while offering interactive tools for potential clients.

## System Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query for server state management
- **Authentication**: Passport.js with local strategy for admin authentication
- **Deployment**: Configured for Replit deployment with production optimizations

## Key Components

### Frontend Architecture
- **Routing**: wouter for lightweight client-side routing
- **UI Components**: Custom components built with Radix UI primitives and styled with Tailwind CSS
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Theme**: Professional design system with custom color palette and typography

### Backend Architecture
- **RESTful API**: Express.js server with structured route handling
- **Session Management**: Express sessions with memory store for development
- **Error Handling**: Centralized error handling middleware
- **Data Storage**: Abstracted storage interface supporting both in-memory and database storage

### Database Schema
The application uses three main entities:
- **Users**: Admin authentication with role-based access
- **Contact Forms**: Lead capture with detailed construction requirements
- **Projects**: Portfolio showcase with categorization and metadata

## Data Flow

1. **Client Requests**: Users interact with React components that make API calls through TanStack Query
2. **API Layer**: Express.js routes handle business logic and data validation
3. **Data Storage**: Drizzle ORM manages database operations with type safety
4. **Response Handling**: Structured JSON responses with consistent error formatting

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless deployment
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast bundling for production builds

### External Services
- **SendGrid**: Email service integration for contact form notifications
- **Object Storage**: Replit's object storage for file management

## Deployment Strategy

The application is configured for seamless deployment on Replit:

1. **Development**: Uses Vite dev server with hot module replacement
2. **Build Process**: 
   - Frontend: Vite builds React app to `dist/public`
   - Backend: esbuild bundles server code to `dist/index.js`
3. **Production**: Serves static files with Express fallback to SPA routing
4. **Database**: Configured for PostgreSQL with automatic connection handling

## Changelog

- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.