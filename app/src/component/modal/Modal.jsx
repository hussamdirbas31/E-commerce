import React, { useState } from 'react';

const Modal = ({ customerInfo, setCustomerInfo, buyNow, colors }) => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!customerInfo.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(customerInfo.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      buyNow();
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="w-full py-3 px-6 rounded-lg font-bold transition-all hover:opacity-90"
        style={{
          backgroundColor: colors.primary,
          color: '#ffffff'
        }}
        onClick={() => setShowModal(true)}
      >
        Proceed to Checkout
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div 
            className="bg-white rounded-lg shadow-lg w-full max-w-md"
            style={{
              backgroundColor: colors.cardBg,
              color: colors.text
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Shipping Information</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: colors.cardBg,
                      color: colors.text,
                      borderColor: errors.name ? 'red' : colors.border
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: colors.cardBg,
                      color: colors.text,
                      borderColor: errors.address ? 'red' : colors.border
                    }}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={customerInfo.pincode}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${errors.pincode ? 'border-red-500' : ''}`}
                      style={{
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                        borderColor: errors.pincode ? 'red' : colors.border
                      }}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={customerInfo.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      style={{
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                        borderColor: errors.phoneNumber ? 'red' : colors.border
                      }}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    style={{
                      borderColor: colors.border
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white rounded hover:opacity-90"
                    style={{
                      backgroundColor: colors.primary
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;