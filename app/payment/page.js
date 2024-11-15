"use client";
import React from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      // Create an order on the server
      const orderResponse = await axios.post('/api/create-order', {
        amount: 5000, // Amount in paise (50000 paise = 500 INR)
      });

      const { orderId } = orderResponse.data;

      // Initialize Razorpay payment
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
        amount: 50000, // Amount in paise
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: orderId,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Gateway</h1>
        <button
          onClick={handlePayment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;