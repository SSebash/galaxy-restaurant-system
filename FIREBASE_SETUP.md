# Firebase Setup Guide for Galaxy Restaurant System

## Overview
This guide will help you set up Firebase for the Galaxy Restaurant System. The application has been fully integrated with Firebase Firestore for data persistence.

## Prerequisites
- Node.js and npm installed
- Firebase account (create one at https://firebase.google.com/)
- Basic knowledge of Firebase console

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "galaxy-restaurant")
4. Enable Google Analytics if desired (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In the Firebase Console, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose your preferred location (select one close to your users)
4. Start in "Test mode" for development (you can change security rules later)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In the Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. In the "General" tab, scroll down to "Your apps"
4. Click the web icon (</>) to register a web app
5. Enter an app nickname (e.g., "Galaxy Restaurant Web")
6. Click "Register app"
7. Firebase will provide you with configuration data. Copy the firebaseConfig object.

## Step 4: Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```bash
cp .env.local.example .env.local
```

Edit the `.env.local` file with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the placeholder values with your actual Firebase configuration.

## Step 5: Configure Firestore Security Rules

For development, you can use these permissive rules. **For production, you should implement proper security rules.**

1. Go to Firestore Database > Rules
2. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

## Step 6: Initialize Sample Data (Optional)

If you want to start with sample data, you can run the initialization function. Create a temporary file to run it:

```javascript
// temp-init.js
import { initializeSampleData } from './src/lib/firebase-init.js'

initializeSampleData().then(() => {
  console.log('Initialization complete')
  process.exit(0)
}).catch((error) => {
  console.error('Initialization failed:', error)
  process.exit(1)
})
```

Run it with:
```bash
node temp-init.js
```

## Step 7: Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Open the application in your browser
3. Check the browser console for Firebase connection status
4. Try creating, updating, and deleting products, recipes, orders, etc.

## Step 8: Production Security Rules (Important!)

For production, implement proper security rules. Here's an example:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Recipes collection
    match /recipes/{recipeId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    
    // Tables collection
    match /tables/{tableId} {
      allow read, write: if request.auth != null;
    }
    
    // Inventory movements collection
    match /inventoryMovements/{movementId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Common Issues:

1. **Permission Denied Errors**
   - Make sure your Firestore security rules allow read/write access
   - Check that your environment variables are correctly set
   - Verify your Firebase project is properly configured

2. **Connection Issues**
   - Check your internet connection
   - Verify Firebase project settings
   - Ensure you're using the correct project ID

3. **Data Not Persisting**
   - Check browser console for errors
   - Verify Firestore rules aren't blocking writes
   - Ensure Firebase app is properly initialized

### Debug Steps:

1. Open browser developer tools
2. Check the Console tab for Firebase errors
3. Check the Network tab for failed API requests
4. Verify Firebase configuration in browser localStorage

## Features Now Using Firebase

✅ **Products Management**
- Create, read, update, delete products
- Real-time inventory tracking
- Stock level monitoring

✅ **Recipes Management**
- Create, read, update, delete recipes
- Ingredient management
- Preparation instructions

✅ **Orders Management**
- Create, read, update, delete orders
- Order status tracking
- Table assignment

✅ **Tables Management**
- Create, read, update, delete tables
- Status management (Available, Occupied, Reserved, Maintenance)
- Capacity tracking

✅ **Inventory Movements**
- Track stock ins and outs
- Movement history
- Reference tracking (purchases, recipes, waste, adjustments)

✅ **Reports & Analytics**
- All 33 reports now work with live Firebase data
- Real-time dashboard metrics
- Historical data analysis

## Next Steps

1. Set up Firebase Authentication for user management
2. Implement proper security rules for production
3. Set up Firebase Storage for file uploads (receipts, images)
4. Configure Firebase Functions for complex business logic
5. Set up Firebase Hosting for deployment

## Support

If you encounter any issues during setup:
1. Check Firebase documentation
2. Review browser console errors
3. Verify environment variables
4. Check Firestore security rules
5. Ensure proper Firebase project configuration