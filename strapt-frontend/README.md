# Strapt Frontend

Frontend application for the Strapt Web3 financial platform.

## Development

### Environment Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with the following variables:
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here
VITE_PRIVY_APP_ID=your_privy_app_id
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Build

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

### Development Tools

- ESLint for code linting
- TypeScript for type checking
- Tailwind CSS for styling
- Vite for bundling and development server

### Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Base UI components from shadcn/ui
│   ├── profile/   # Profile-related components
│   └── transfer/  # Transfer-related components
├── contexts/      # React contexts
├── hooks/         # Custom React hooks
├── lib/          # Utility functions and configurations
├── pages/        # Route components
└── providers/    # Global providers and wrappers
```

### Package Scripts

- `dev`: Start development server
- `build`: Production build
- `build:dev`: Development build
- `lint`: Run ESLint
- `preview`: Preview production build locally

### Component Library

We use shadcn/ui components with custom styling. Configure component settings in `components.json`.

### Styling

- TailwindCSS for utility-first styling
- Custom theme configuration in `tailwind.config.ts`
- Global styles in `src/index.css`

### Blockchain Integration

- RainbowKit for wallet connection
- wagmi for blockchain interactions
- Support for multiple networks including Base Sepolia
- Privy for Web3 auth

### Mobile Support

- Responsive design with mobile-first approach
- iOS and Android compatible
- Touch-friendly UI components
