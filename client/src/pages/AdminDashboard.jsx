import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, FileText, User, Check, X, Eye } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('prescriptions');
    const [prescriptions, setPrescriptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [prescRes, prodRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/prescriptions', config),
                    axios.get('http://localhost:5000/api/products')
                ]);
                setPrescriptions(prescRes.data);
                setProducts(prodRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setLoading(false);
            }
        };
        if (user?.role === 'admin') fetchAdminData();
    }, [user]);

    if (user?.role !== 'admin') return <div className="container">Access Denied</div>;

    return (
        <div className="admin-dashboard container">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <LayoutDashboard size={24} />
                    <h2>Admin Panel</h2>
                </div>
                <nav>
                    <button className={activeTab === 'prescriptions' ? 'active' : ''} onClick={() => setActiveTab('prescriptions')}>
                        <FileText size={20} /> Prescriptions
                    </button>
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <Package size={20} /> Manage Products
                    </button>
                </nav>
            </aside>

            <main className="admin-main">
                {loading ? (
                    <div className="loader">Loading Dashboard...</div>
                ) : (
                    <>
                        {activeTab === 'prescriptions' && (
                            <PrescriptionManager prescriptions={prescriptions} setPrescriptions={setPrescriptions} />
                        )}
                        {activeTab === 'products' && (
                            <ProductManager products={products} setProducts={setProducts} />
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

const PrescriptionManager = ({ prescriptions, setPrescriptions }) => (
    <section className="admin-section animate-fade">
        <div className="section-header">
            <h2>Prescription Requests</h2>
            <span className="badge">{prescriptions.length} Total</span>
        </div>
        <div className="table-responsive">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map(p => (
                        <tr key={p._id}>
                            <td>
                                <div className="user-info">
                                    <span className="name">{p.patientName}</span>
                                    <span className="email">{p.user.email}</span>
                                </div>
                            </td>
                            <td className="capitalize">{p.deliveryType}</td>
                            <td><span className={`status-badge ${p.status}`}>{p.status}</span></td>
                            <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                            <td className="actions">
                                <button title="View Image"><Eye size={18} /></button>
                                <button title="Approve" className="text-success"><Check size={18} /></button>
                                <button title="Reject" className="text-error"><X size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

const ProductManager = ({ products }) => (
    <section className="admin-section animate-fade">
        <div className="section-header">
            <h2>Products Inventory</h2>
            <button className="btn btn-primary btn-sm">+ Add Product</button>
        </div>
        <div className="table-responsive">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p._id}>
                            <td className="prod-cell">
                                <img src={p.image} alt="" className="table-img" />
                                <span>{p.name}</span>
                            </td>
                            <td>{p.category}</td>
                            <td>KES {p.price}</td>
                            <td>{p.stockQuantity}</td>
                            <td className="actions">
                                <button>Edit</button>
                                <button className="text-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

export default AdminDashboard;
