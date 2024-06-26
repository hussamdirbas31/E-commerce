import React, { useContext } from 'react';
import Context from '../../context/Context';

function AddProduct() {
  const context = useContext(Context);
  const { products, setProducts, addProduct } = context;

  return (
    <div>
      <div className='flex  items-center h-screen bg-red-600 '>
        <div className=''>
          <div className=''>
            <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
          </div>
          <div>
            <input
              type='text'
              onChange={(e) => setProducts({ ...products, title: e.target.value })}
              value={products.title}
              name='title'
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em]  text-white placeholder:text-gray-200 outline-none'
              placeholder='Product title'
            />
          </div>
          <div>
            <input
              type='text'
              name='price'
              onChange={(e) => setProducts({ ...products, price: e.target.value })}
              value={products.price}
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em]  text-white placeholder:text-gray-200 outline-none'
              placeholder='Product price'
            />
          </div>
          <div>
            <input
              type='text'
              name='imageurl'
              onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
              value={products.imageUrl}
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em]  text-white placeholder:text-gray-200 outline-none'
              placeholder='Product imageUrl'
            />
          </div>
          <div>
            <input
              type='text'
              name='category'
              onChange={(e) => setProducts({ ...products, category: e.target.value })}
              value={products.category}
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em]  text-white placeholder:text-gray-200 outline-none'
              placeholder='Product category'
            />
          </div>
          <div>
            <textarea
              cols='30'
              rows='10'
              name='description'
              onChange={(e) => setProducts({ ...products, description: e.target.value })}
              value={products.description}
              className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em]  text-white placeholder:text-gray-200 outline-none'
              placeholder='Product description'
            />
          </div>
          <div className='flex justify-center mb-3'>
            <button
              onClick={addProduct}
              className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;