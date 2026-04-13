# Baofeng 2.0 - Ecommerce App

A complete ecommerce mobile application built with React Native and Expo for Baofeng products.

## Project Structure

```
Baofeng2.0-App/
├── src/
│   ├── App.js                 # Main app component with navigation setup
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   ├── navigation/
│   │   └── HomeNavigator.js   # Bottom tab navigation
│   └── screens/
│       ├── auth/
│       │   ├── SplashScreen.js
│       │   ├── LoginScreen.js
│       │   └── OtpScreen.js
│       └── home/
│           ├── HomeScreen.js
│           ├── CategoriesScreen.js
│           ├── OrdersScreen.js
│           ├── CartScreen.js
│           └── ProfileScreen.js
├── assets/                    # App icons and images (to be added)
├── app.json                   # Expo configuration
├── babel.config.js            # Babel configuration
├── index.js                   # Entry point
├── package.json               # Dependencies
└── README.md                  # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Steps

1. **Navigate to project directory:**
   ```bash
   cd Baofeng2.0-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on device/emulator:**
   - **Android:** Press `a` in the terminal
   - **iOS:** Press `i` in the terminal (macOS only)
   - **Web:** Press `w` in the terminal

## Features

### Authentication Flow
- **Splash Screen**: Brand introduction with loading animation
- **Login Screen**: Mobile number-based login with multiple input options
- **OTP Screen**: 6-digit OTP verification with auto-focus and resend functionality

### Home Screen
- Search bar for products
- Promotional banners
- News & updates section
- Shop by categories
- Featured products grid with ratings and pricing

### Categories
- Main category listing
- Sub-category organization
- Product filtering by category
- Add to cart functionality

### Orders
- Order history with status tracking
- Filtering by order status (All, Pending, Delivered, Cancelled)
- Order details and items count
- Order date and total price display

### Cart
- Product listing with images and prices
- Quantity adjustment (increment/decrement)
- Remove item functionality
- Promo code input
- Price summary with subtotal, shipping, and tax calculations
- Checkout button

### Profile
- User information display
- Account stats (total spent, orders, rating)
- Quick action shortcuts
- Account management options
- Support and help section
- Logout functionality

## Key Dependencies

- **@react-navigation/native** - Navigation library
- **@react-navigation/bottom-tabs** - Bottom tab navigator
- **@react-navigation/native-stack** - Stack navigation
- **react-native-vector-icons** - Icon library
- **expo-status-bar** - Status bar styling
- **axios** - API requests (optional)

## Configuration

### API Integration
Update the API endpoint in `src/context/AuthContext.js` and screen components:
```javascript
const API_URL = 'https://your-api.com';
```

### Colors & Styling
Primary color: `#0066CC` (Blue)
Secondary color: `#FFB800` (Orange)
Text color: `#1A1A1A` (Dark Gray)

### Environment Variables
Create a `.env` file in the root directory:
```
API_URL=https://your-api.com
API_KEY=your-api-key
```

## Screens Overview

### Auth Screens
1. **Splash Screen**: 2-second loading with branding
2. **Login Screen**: Phone number input with validation
3. **OTP Screen**: 6-digit OTP entry with timer and resend option

### Home Screens (with Bottom Tabs)
1. **Home**: Main dashboard with featured products
2. **Categories**: Browse products by category
3. **Orders**: View order history and status
4. **Cart**: Manage shopping cart and checkout
5. **Profile**: User account and settings

## Development Notes

### State Management
- Using React Context API for authentication state
- Local component state for UI interactions
- Ready for Redux/MobX integration if needed

### Navigation Flow
```
Splash
  ↓
Login → OTP
  ↓
Home (Bottom Tabs)
├── Home
├── Categories
├── Orders
├── Cart
└── Profile
```

### Styling
- Using React Native StyleSheet for performance
- Responsive design with Dimensions API
- Color scheme: Material Design Blue

## Future Enhancements

- [ ] User authentication with backend API
- [ ] AsyncStorage for persistent login
- [ ] Payment gateway integration
- [ ] Real product images
- [ ] Push notifications
- [ ] Search and filter functionality
- [ ] Wishlist feature
- [ ] Review and ratings system
- [ ] Multi-language support
- [ ] Dark mode

## Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

## Troubleshooting

### Port Already in Use
```bash
expo start -c
```

### Clear Cache
```bash
npm start -- --clear
```

### Module Not Found
```bash
npm install --save [package-name]
```

## License
Proprietary - Baofeng 2.0

## Support
For support and issues, contact: support@baofeng.com

## Version History

### v1.0.0 (Initial Release)
- Basic app structure with 5 screens
- Bottom tab navigation
- Authentication flow
- Product listing and cart functionality
- User profile management
