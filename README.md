# 📩 Messaging App
Welcome to my Myssaging App, a web application built to practice building a chat platform with all the database structure as well as account management

![messaging](https://github.com/WizzzStark/messaging-app/assets/85120579/7cddd6e1-fc53-4a49-8e4e-b5a5e2bfc458)

## 🌟 Features

- **📁 Chat with other users:** Chat with any other user in the web.
- **👤 User profile:** Profile settings including name, photo, connected accounts, active devices, change password, etc...

## 🛠 Technologies Used

- **🖥 Frontend:** NextJS
- **🔐 Authentication:** Clerk
- **📊 Database Management:** Convex

## 📦 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 
- npm

### Setting Up the Project

1. **Clone the Repository**

```bash
git clone https://github.com/WizzzStark/messaging-app
cd messaging-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env.local` file at the root of your project and add the necessary environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=
```
4. **Run de Backend**
```bash
npx convex dev
```

5. **Run the Development Server**

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000). Navigate to this URL to view the application.

