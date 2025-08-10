# CRM Frontend

A modern, responsive Customer Relationship Management (CRM) frontend application built for real estate and property management operations. This application provides comprehensive tools for managing leads, properties, deals, and customer relationships.

## 🚀 Features

- **Lead Management** - Track and manage customer leads through the sales pipeline
- **Property Management** - Manage residential, commercial, and land properties
- **Deal Processing** - Handle deal negotiations and commission tracking
- **Project Management** - Organize properties by projects and developers
- **User Authentication** - Secure login with JWT token management
- **Dashboard Analytics** - Real-time insights and reporting
- **Responsive Design** - Mobile-first approach with dark/light theme support
- **Master Data Management** - Manage builders, locations, and other reference data

## 🛠️ Technology Stack

### Core Technologies

- **React 19.1.0** - Modern frontend framework
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 6.3.5** - Fast build tool and development server
- **React Router 7.6.3** - Client-side routing

### UI & Styling

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible headless UI components
- **shadcn/ui** - Pre-built component library (New York style)
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management system

### State Management

- **Redux Toolkit 2.8.2** - Predictable state management
- **Redux Persist** - State persistence across sessions
- **React Hook Form 7.60.0** - Performant form handling
- **Zod 3.25.74** - Schema validation

### Data & API

- **Axios 1.10.0** - HTTP client for API communication
- **TanStack Table** - Powerful data table management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components
│   ├── custom/         # Custom business components
│   └── data-table/     # Table components
├── pages/              # Route components
│   ├── Authentication/ # Login, register pages
│   ├── Dashboard/      # Dashboard views
│   ├── leads/          # Lead management
│   ├── property/       # Property management
│   └── Masters/        # Master data pages
├── store/              # Redux state management
├── repositories/       # API layer
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── router/             # Routing configuration
├── context/            # React context providers
├── helpers/            # Helper functions
├── enums/              # TypeScript enums
├── config/             # Configuration files
└── utils/              # Utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd crm-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration values.

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run knip         # Check for unused code
```

## 🔧 Configuration

### API Configuration

- **Base URL**: `http://localhost:3001`
- **API Documentation**: `http://localhost:3001/api-docs`
- The application expects a REST API backend with JWT authentication

### Theme Configuration

- Supports light and dark themes
- Theme preference is persisted in localStorage
- Configurable through the theme context

### Path Aliases

- `@/*` maps to `./src/*` for clean imports
- Configured in both Vite and TypeScript

## 🏗️ Architecture

### State Management

- Redux Toolkit for global state
- Feature-based slice organization
- Redux Persist for state persistence
- Separate slices for leads, properties, users, etc.

### API Layer

- Repository pattern for API calls
- Axios interceptors for authentication
- Error handling and response transformation
- Type-safe API interfaces

### Component Architecture

- Atomic design principles
- Separation of UI and business logic
- Reusable component library
- Consistent naming conventions

### Routing

- Protected and public route separation
- Role-based access control
- Lazy loading for performance

## 🎨 UI Components

Built with shadcn/ui components including:

- Forms (Input, Select, Checkbox, etc.)
- Navigation (Dropdown, Tabs, etc.)
- Feedback (Dialog, Alert, Toast, etc.)
- Data Display (Table, Avatar, etc.)
- Layout (Separator, Scroll Area, etc.)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based responsive design
- Touch-friendly interface
- Optimized for various screen sizes

## 🔒 Security

- JWT token-based authentication
- Protected routes with authentication guards
- Secure API communication
- Input validation with Zod schemas

## 🧪 Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Knip for unused code detection
- Consistent coding standards

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
