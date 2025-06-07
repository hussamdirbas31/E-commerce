import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import Layout from '../../component/layout/Layout';
import Modal from '../../component/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { collection, addDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

const Cart = () => {
  const context = useContext(Context);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Calculate total amount
  const [totalAmount, setTotalAmount] = useState(0);
  const shipping = 100;
  const grandTotal = shipping + totalAmount;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    const temp = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
    setTotalAmount(temp);
  }, [cartItems]);

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  const buyNow = async () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.pincode || !customerInfo.phoneNumber) {
      return alert('Please fill all the required fields');
    }

    const addressInfo = {
      ...customerInfo,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    };

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your actual key
      key_secret: "YOUR_RAZORPAY_SECRET", // Replace with your actual secret
      amount: parseInt(grandTotal * 100),
      currency: 'INR',
      order_receipt: 'order_rcptid_' + customerInfo.name,
      name: 'Artizia',
      description: 'Purchase from Artizia',
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;
        const user = JSON.parse(localStorage.getItem('user')) || { user: {} };

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
          email: user.user?.email || '',
          userid: user.user?.uid || '',
          paymentId,
          totalAmount: grandTotal,
          status: 'completed'
        };

        try {
          await addDoc(collection(fireDB, 'orders'), orderInfo);
          // Clear cart after successful order
          cartItems.forEach(item => dispatch(deleteFromCart(item)));
          alert('Order placed successfully!');
        } catch (error) {
          console.error('Error saving order:', error);
          alert('There was an error processing your order');
        }
      },
      theme: {
        color: '#800020' // Using your maroon theme color
      }
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  // Colors matching the design system
  const colors = {
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    cardBg: mode === 'dark' ? 'rgb(32 33 34)' : '#ffffff',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
    primary: '#800020',
    primaryHover: '#5c0018'
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center" style={{ color: colors.text }}>
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: colors.text }}>Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex flex-col sm:flex-row gap-4 p-4 mb-4 rounded-lg shadow"
                    style={{
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm my-2">{item.description}</p>
                      <p className="font-bold">${item.price}</p>
                    </div>
                    <button
                      onClick={() => deleteCart(item)}
                      className="self-start sm:self-center text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div
                  className="p-6 rounded-lg shadow sticky top-4"
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text
                  }}
                >
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>${totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>

                  <Modal 
                    customerInfo={customerInfo}
                    setCustomerInfo={setCustomerInfo}
                    buyNow={buyNow}
                    colors={colors}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;