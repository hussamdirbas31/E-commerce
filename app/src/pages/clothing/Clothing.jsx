import React, { useContext, useState, useMemo } from 'react';
import Products from '../../component/Products/Products';
import Layout from '../Layout/Layout';
import FilterBar from '../../component/filterBar/FilterBar';
import Context from '../../context/Context';

const Clothing = () => {
  const { product = [] } = useContext(Context);
  const [currentCategory, setCurrentCategory] = useState('All');

  // Memoized extraction of unique, non-empty categories
  const categories = useMemo(() => {
    const categorySet = new Set();
    
    product.forEach(item => {
      if (item?.category?.trim()) {
        categorySet.add(item.category.trim());
      }
    });

    return Array.from(categorySet).sort(); // Sort categories alphabetically
  }, [product]);

  // Memoized filtered products with case-insensitive comparison
  const filteredProducts = useMemo(() => {
    if (!currentCategory || currentCategory.toLowerCase() === 'all') {
      return product;
    }
    
    return product.filter(item => 
      item?.category && 
      item.category.toLowerCase() === currentCategory.toLowerCase()
    );
  }, [product, currentCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setCurrentCategory(category || 'All');
  };

  return (
    <Layout>
      <div className="py-12">
        <FilterBar 
          categories={categories}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {filteredProducts.length > 0 ? (
          <Products products={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Clothing;