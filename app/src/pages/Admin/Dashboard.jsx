import React, { useContext } from 'react';
import { FaUserTie, FaBoxes, FaShoppingCart, FaUsers } from 'react-icons/fa';
import Context from '../../context/Context';
import Layout from '../Layout/Layout';
import DashboardTab from '../../pages/Admin/DashboardTab';

const Dashboard = () => {
  const context = useContext(Context);
  const { mode } = context; 

  // Colors matching the design system
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    cardBg: mode === 'dark' ? 'rgba(46, 49, 55, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
  };

  const stats = [
    { title: 'Total Products', value: '10', icon: <FaBoxes size={40} /> },
    { title: 'Total Orders', value: '10', icon: <FaShoppingCart size={40} /> },
    { title: 'Total Users', value: '20', icon: <FaUsers size={40} /> },
    { title: 'Revenue', value: '$5,000', icon: <FaUserTie size={40} /> }
  ];

  return (
    <Layout>
      <section className="py-12 px-4" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  color: colors.text,
                  boxShadow: mode === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium">{stat.title}</p>
                    <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                  </div>
                  <div style={{ color: colors.primary }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Tabs */}
          <DashboardTab />
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;