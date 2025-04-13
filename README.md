# Strapt - Secure Transfer and Payment

Strapt is trustless DeFi platform for protected crypto transfers, savings asset to achieve goals and simple streaming payments with a clean UI and UX.

## 🌟 Features

- **Core Functionality**
  - Direct & Protected Transfers
  - Payment Streaming with Milestones
  - DeFi Savings & Staking
  - QR Code Generation & Scanning
  - Username-based Wallet System
  - Decentralized Identity Integration

- **User Experience**
  - Beautiful, Responsive UI
  - Dark/Light Theme Support
  - Mobile-First Design
  - Intuitive Navigation
  - Real-time Balance Updates

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/strapt.git
cd strapt
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd strapt-frontend
npm install

# Install backend dependencies
cd ../strapt-backend
npm install
```

3. Configure environment variables:
```bash
# In strapt-frontend/.env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
VITE_PRIVY_APP_ID=your_privy_app_id
```

4. Start the development server:
```bash
# Frontend
npm run dev

# Backend
npm run dev
```

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for blazing-fast development
- TailwindCSS for styling
- shadcn/ui for component library
- wagmi & viem for Web3 interactions
- RainbowKit for wallet connections
- React Router for navigation
- Tanstack Query for data management

### Backend
- Node.js
- Express
- TypeScript

## 📱 Features in Detail

### Payment Streaming
- Create token streams with customizable rates
- Add milestone-based releases
- Pause, resume, or stop streams
- Real-time streaming progress tracking

### Savings & DeFi
- Multiple protocol integrations
- APY comparison tools
- Goal-based savings
- Auto-compounding options

### Security
- Protected transfers with timelock
- Multi-signature support
- Transaction verification system
- Automated security checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [RainbowKit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Privy](https://privy.io/)
- [Base](https://base.org/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the team at support@strapt.io
