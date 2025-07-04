import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useAuth } from '../../context/AuthContext'; // Fixed import
import Layout from '../../component/layout/Layout';

const Orders = () => {
  const { user } = useAuth(); // Now using the hook
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(fireDB, 'orders'),
          where('userid', '==', user.uid),
          orderBy('date', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p>Please sign in to view your orders</p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading your orders...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#800020]">
          Order History
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg shadow-md p-6">
                <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order.paymentId?.slice(-6) || order.id?.slice(-6)}
                    </h2>
                    <p className="text-gray-600">
                      {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${order.totalAmount?.toFixed(2)}</p>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status || 'processing'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>{order.addressInfo?.name}</p>
                  <p>{order.addressInfo?.address}</p>
                  <p>{order.addressInfo?.pincode}</p>
                  <p>Phone: {order.addressInfo?.phoneNumber}</p>
                </div>

                <h3 className="font-semibold mb-3">Products</h3>
                <div className="space-y-4">
                  {order.cartItems?.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-gray-600 text-sm">
                          {item.description?.slice(0, 50)}...
                        </p>
                      </div>
                      <div className="text-right">
                        <p>${item.price?.toFixed(2)} x {item.quantity || 1}</p>
                        <p className="font-medium">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;