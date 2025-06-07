import React from 'react';
import Products from '../../component/Products/Products';
import Layout from '../Layout/Layout';

const Clothing = () => {
  return (
    <Layout>
      <div className="py-12">
        <Products />
      </div>
    </Layout>
  );
};

export default Clothing;