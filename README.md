# Utility Payment Application

A streamlined application for managing and paying utility bills. This project offers users an intuitive interface to handle their utility expenses efficiently.

Deploy is available at: https://utility-pay.vercel.app/

## Features

### User Authentication

- **Login & Logout**: Secure authentication with session management.
- **Profile Management**: Update personal details, including full name, phone number, and addresses.

### Utility Service Management

- **View Available Services**: Users can browse a list of available utility services.
- **Track Service Usage**: Detailed information about consumed units and associated costs.
- **Automatic Calculations**: Total cost for services is automatically calculated based on usage and unit price.

### Bill Payments

- **Payment History**: View a list of past payments with service details.
- **Pending Payments**: List and pay for outstanding bills.
- **Discounts and Offers**: Integrated discount system for specific payment conditions.

### Password Recovery

- **Phone Verification**: OTP-based recovery process for forgotten passwords.
- **New Password Setup**: Allows users to securely reset their password with validation.

### Miscellaneous

- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: User-friendly error messages for validation and server-side issues.

## Technology Stack

- **Frontend**: React with Next.js framework
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Form Validation**: `react-hook-form` with Zod schema validation
- **Backend**: Node.js and Express (if applicable, otherwise remove)
- **Database**: (Specify database technology if implemented, e.g., PostgreSQL, MongoDB)
- **API Integration**: Fetch API for client-server communication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:3000.
