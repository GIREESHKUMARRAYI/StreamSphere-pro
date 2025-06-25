# 🚀 Payment Integration Setup Guide

## **StreamSphere OTT Platform - Subscription & Payment System**

This guide will help you set up the complete payment integration with subscription plans for your StreamSphere platform.

---

## **📋 Prerequisites**

1. **Node.js** (v16 or higher)
2. **MongoDB** (running locally or cloud)
3. **Razorpay Account** (for payment processing)

---

## **🔧 Backend Setup**

### **1. Install Dependencies**
```bash
npm install razorpay
```

### **2. Environment Variables**
Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/videoverse

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

### **3. Frontend Environment Variables**
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
```

---

## **💳 Razorpay Setup**

### **1. Create Razorpay Account**
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account
3. Complete KYC verification

### **2. Get API Keys**
1. Go to **Settings** → **API Keys**
2. Generate a new key pair
3. Copy the **Key ID** and **Key Secret**
4. Update your `.env` file with these values

### **3. Test Mode vs Live Mode**
- **Test Mode**: Use `rzp_test_` keys for development
- **Live Mode**: Use `rzp_live_` keys for production

---

## **🗄️ Database Setup**

### **1. Seed Subscription Plans**
```bash
cd backend
node seedPlans.js
```

This will create the following plans:
- **Basic Plan**: ₹99/month (1 screen, 480p)
- **Standard Plan**: ₹249/month (2 screens, 720p) ⭐ Most Popular
- **Premium Plan**: ₹399/month (4 screens, 4K)
- **Student Plan**: ₹59/month (1 screen, 720p)
- **Annual Plan**: ₹999/year (Standard features, 20% discount)

### **2. Seed Admin User**
```bash
cd backend
node seedAdmin.js
```

Admin credentials:
- **Email**: admin@streamsphere.com
- **Password**: Admin@123

---

## **🚀 Running the Application**

### **1. Start Backend**
```bash
node start-backend.js
```

### **2. Start Frontend**
```bash
npm run dev
```

### **3. Access the Application**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:8080/admin

---

## **📱 User Flow**

### **1. New User Registration**
1. User signs up at `/signup`
2. User is redirected to `/plans` to choose subscription
3. User selects a plan and clicks "Subscribe"
4. Razorpay payment gateway opens
5. User completes payment
6. Subscription is activated and user is redirected to `/dashboard`

### **2. Existing User**
1. User logs in at `/login`
2. If no active subscription, redirected to `/plans`
3. If active subscription, redirected to `/dashboard`

### **3. Subscription Management**
- **View Plans**: `/plans`
- **Manage Subscription**: `/account`
- **Cancel Subscription**: Available in account settings

---

## **🔒 Security Features**

### **1. Payment Verification**
- Server-side signature verification
- Payment status validation
- Duplicate payment prevention

### **2. Subscription Protection**
- Grace period for expired subscriptions
- Auto-renewal management
- Usage tracking and limits

### **3. User Authentication**
- JWT-based authentication
- Protected routes
- Role-based access control

---

## **📊 Subscription Plans**

| Plan | Price | Screens | Quality | Downloads | Features |
|------|-------|---------|---------|-----------|----------|
| **Basic** | ₹99/month | 1 | 480p | None | Basic streaming |
| **Standard** | ₹249/month | 2 | 720p | 5 | Offline viewing, Priority support |
| **Premium** | ₹399/month | 4 | 4K | Unlimited | All features, TV access |
| **Student** | ₹59/month | 1 | 720p | 2 | Student email required |
| **Annual** | ₹999/year | 2 | 720p | 5 | 20% discount, Standard features |

---

## **🛠️ API Endpoints**

### **Plans**
- `GET /api/plans` - Get all active plans
- `GET /api/plans/:id` - Get specific plan
- `POST /api/plans` - Create plan (Admin only)
- `PUT /api/plans/:id` - Update plan (Admin only)
- `DELETE /api/plans/:id` - Delete plan (Admin only)

### **Subscriptions**
- `GET /api/subscriptions/current` - Get user's current subscription
- `GET /api/subscriptions/history` - Get subscription history
- `POST /api/subscriptions/create-order` - Create payment order
- `POST /api/subscriptions/verify-payment` - Verify payment
- `POST /api/subscriptions/cancel` - Cancel subscription
- `POST /api/subscriptions/reactivate` - Reactivate subscription

---

## **🎨 Frontend Components**

### **1. SubscriptionPlans.jsx**
- Plan selection interface
- Billing cycle toggle (Monthly/Yearly)
- Payment integration with Razorpay
- Responsive design

### **2. Features**
- Beautiful gradient backgrounds
- Interactive plan cards
- Real-time price calculation
- Payment status feedback

---

## **🔧 Customization**

### **1. Modify Plans**
Edit `backend/seedPlans.js` to change:
- Plan prices
- Features
- Billing cycles
- Discounts

### **2. Styling**
Modify `src/pages/SubscriptionPlans.css` to customize:
- Colors and gradients
- Layout and spacing
- Animations and transitions

### **3. Payment Gateway**
The system is designed to easily switch between:
- Razorpay (current)
- Stripe
- PayPal
- Other payment gateways

---

## **🚨 Troubleshooting**

### **1. Payment Issues**
- Verify Razorpay keys are correct
- Check network connectivity
- Ensure proper CORS configuration
- Verify payment signature

### **2. Database Issues**
- Ensure MongoDB is running
- Check connection string
- Verify database permissions

### **3. Frontend Issues**
- Clear browser cache
- Check console for errors
- Verify environment variables

---

## **📞 Support**

For issues or questions:
1. Check the console logs
2. Verify all environment variables
3. Ensure all dependencies are installed
4. Test with Razorpay test mode first

---

## **🎉 Success!**

Your StreamSphere OTT platform now has:
- ✅ Complete subscription system
- ✅ Payment integration with Razorpay
- ✅ Beautiful plan selection UI
- ✅ Secure payment processing
- ✅ Subscription management
- ✅ User authentication
- ✅ Admin panel for plan management

**Happy streaming! 🎬** 