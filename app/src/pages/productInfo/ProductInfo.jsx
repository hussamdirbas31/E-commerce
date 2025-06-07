import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import Context from '../../context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../component/loader/Loader';

function ProductInfo() {
    const { id } = useParams();
    const { mode, product } = useContext(Context);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    // Color scheme matching the design system
    const colors = {
        primary: '#800020',
        primaryHover: '#5c0018',
        background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
        text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
        textSecondary: mode === 'dark' ? '#d1d1d1' : '#4a4a4a',
        border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
        cardBg: mode === 'dark' ? 'rgb(32 33 34)' : '#ffffff',
    };

    useEffect(() => {
        if (product.length > 0) {
            const foundProduct = product.find(item => item.id === id);
            setProductData(foundProduct || null);
            setLoading(false);
        }
    }, [id, product]);

    const handleAddToCart = () => {
        if (!productData) return;
        
        dispatch(addToCart({
            title: productData.title,
            price: productData.price,
            description: productData.description,
            image: productData.imageUrl,
            productId: productData.id,
            quantity: 1
        }));
        toast.success('Item added to cart!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
                    <LoadingSpinner />
                </div>
            </Layout>
        );
    }

    if (!productData) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
                    <div className="text-center p-8 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>Product Not Found</h2>
                        <p style={{ color: colors.textSecondary }}>
                            The product you're looking for doesn't exist or may have been removed.
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    const { title, price, description, imageUrl, category } = productData;

    return (
        <Layout>
            <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
                <div className="container mx-auto px-4 py-12 lg:py-24">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Product Image */}
                        <div className="lg:w-1/2">
                            <div className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
                                <img
                                    alt={title}
                                    className="w-full h-auto max-h-[500px] object-cover"
                                    src={imageUrl || "https://via.placeholder.com/800x800"}
                                    style={{ borderColor: colors.border }}
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="lg:w-1/2" style={{ color: colors.text }}>
                            <h2 className="text-sm font-medium mb-2" style={{ color: colors.primary }}>
                                {category || 'CATEGORY'}
                            </h2>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                                {title || 'Product Title'}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            fill={i < 4 ? colors.primary : "none"}
                                            stroke={colors.primary}
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span style={{ color: colors.textSecondary }}>4 Reviews</span>
                            </div>

                            {/* Description */}
                            <div className="mb-8 pb-8 border-b" style={{ borderColor: colors.border }}>
                                <p className="leading-relaxed">
                                    {description || 'Product description not available.'}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-3xl font-bold" style={{ color: colors.primary }}>
                                    ${price || '0.00'}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={handleAddToCart}
                                    className="flex-1 py-3 px-6 rounded-lg font-bold transition-colors duration-300"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: '#ffffff',
                                        ':hover': { backgroundColor: colors.primaryHover }
                                    }}
                                >
                                    Add To Cart
                                </button>
                                <button 
                                    className="py-3 px-6 rounded-lg border font-medium transition-colors duration-300"
                                    style={{
                                        borderColor: colors.primary,
                                        color: colors.primary,
                                        ':hover': { backgroundColor: colors.primary, color: '#ffffff' }
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductInfo;