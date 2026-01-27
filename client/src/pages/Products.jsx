import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', 'Medication', 'Wellness', 'Personal Care', 'Baby Care'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="products-page container">
            <header className="products-header">
                <h1>Health <span>&</span> Wellness Catalog</h1>
                <p>Find the medications and products you need.</p>
            </header>

            <div className="products-controls">
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="loader">Loading products...</div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="no-results">No products found matching your search.</div>
                    )}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ product }) => (
    <div className="product-card glass animate-fade">
        <div className="product-image">
            <img src={product.image} alt={product.name} />
            {product.category && <span className="category-tag">{product.category}</span>}
        </div>
        <div className="product-info">
            <h3>{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <div className="product-footer">
                <span className="price">KES {product.price}</span>
                <button className="btn btn-primary btn-sm">
                    <ShoppingCart size={18} /> Add
                </button>
            </div>
        </div>
    </div>
);

export default Products;
