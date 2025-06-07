import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Context from '../../context/Context';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function DashboardTab() {
  const context = useContext(Context);
  const { mode, product, edithandle, deleteProduct } = context;

  // Colors matching the design system
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    cardBg: mode === 'dark' ? 'rgba(46, 49, 55, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
    tabActive: mode === 'dark' ? '#800020' : '#800020',
    tabInactive: mode === 'dark' ? '#2a2a2a' : '#e8e8e8'
  };

  const goToAdd = () => {
    window.location.href = '/addproduct';
  };

  return (
    <div className="bg-opacity-90 rounded-xl border p-6" 
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border
      }}>
      <Tabs defaultIndex={0}>
        <TabList className="flex flex-wrap gap-4 mb-8">
          <Tab>
            <button
              type="button"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: colors.tabInactive,
                color: colors.text,
                borderBottom: `3px solid ${colors.tabActive}`
              }}
            >
              <div className="flex gap-2 items-center">
                <MdOutlineProductionQuantityLimits /> Products
              </div>
            </button>
          </Tab>
          <Tab>
            <button
              type="button"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: colors.tabInactive,
                color: colors.text,
                borderBottom: `3px solid ${colors.tabActive}`
              }}
            >
              <div className="flex gap-2 items-center">
                <AiFillShopping /> Orders
              </div>
            </button>
          </Tab>
          <Tab>
            <button
              type="button"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: colors.tabInactive,
                color: colors.text,
                borderBottom: `3px solid ${colors.tabActive}`
              }}
            >
              <div className="flex gap-2 items-center">
                <FaUser /> Users
              </div>
            </button>
          </Tab>
        </TabList>

        {/* Products Tab */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Product Details
            </h2>
            <div className="flex justify-end mb-6">
              <button
                onClick={goToAdd}
                className="px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: colors.primary,
                  color: '#ffffff'
                }}
              >
                <div className="flex gap-2 items-center">
                  Add Product <FaCartPlus size={20} />
                </div>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ 
                    backgroundColor: mode === 'dark' ? '#2a2a2a' : '#f5f5f5',
                    color: colors.text
                  }}>
                    <th className="px-6 py-4 text-left">S.No</th>
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => (
                    <tr 
                      key={item.id}
                      className="border-b"
                      style={{ 
                        borderColor: colors.border,
                        color: colors.text
                      }}
                    >
                      <td className="px-6 py-4">{index + 1}.</td>
                      <td className="px-6 py-4">
                        <img className="w-16 h-16 object-cover rounded" src={item.imageUrl} alt={item.title} />
                      </td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">{item.price}$</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <button
                            onClick={() => deleteProduct(item)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                          <Link 
                            to="/updateproduct" 
                            onClick={() => edithandle(item)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Order Details
            </h2>
            {/* Order table implementation would go here */}
          </div>
        </TabPanel>

        {/* Users Tab */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              User Details
            </h2>
            {/* User table implementation would go here */}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DashboardTab;