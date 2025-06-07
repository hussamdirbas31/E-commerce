import React, { useContext } from 'react';
import Context from '../../context/Context';
import Card1 from '../Card1/Card1';

const ProductCard = () => {
  const { product, mode } = useContext(Context);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {product.slice(0, 4).map((item) => (
          <Card1
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.imageUrl}
            productId={item.id}
            item={item}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;