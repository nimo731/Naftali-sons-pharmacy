import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, FileText, User, Check, X, Eye, MessageSquare, Trash2 } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('prescriptions');
    const [prescriptions, setPrescriptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [prescRes, prodRes, msgRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/prescriptions', config),
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/messages', config)
                ]);
                setPrescriptions(prescRes.data);
                setProducts(prodRes.data);
                setMessages(msgRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setLoading(false);
            }
        };
        if (user?.role === 'admin') fetchAdminData();
    }, [user]);

    if (user?.role !== 'admin') return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Access Denied</div>;

    return (
        <div className="admin-dashboard container-fluid">
            <aside className="admin-sidebar shadow-lg">
                <div className="sidebar-header">
                    <LayoutDashboard size={24} />
                    <h2>Admin Panel</h2>
                </div>
                <nav>
                    <button className={activeTab === 'prescriptions' ? 'active' : ''} onClick={() => setActiveTab('prescriptions')}>
                        <FileText size={20} /> Prescriptions
                    </button>
                    <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
                        <MessageSquare size={20} /> Messages
                    </button>
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <Package size={20} /> Products
                    </button>
                </nav>
            </aside>

            <main className="admin-main">
                {loading ? (
                    <div className="loader">Loading Dashboard...</div>
                ) : (
                    <div className="admin-content-card glass animate-fade">
                        {activeTab === 'prescriptions' && (
                            <PrescriptionManager prescriptions={prescriptions} />
                        )}
                        {activeTab === 'messages' && (
                            <MessageManager messages={messages} />
                        )}
                        {activeTab === 'products' && (
                            <ProductManager products={products} />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

const MessageManager = ({ messages }) => (
    <section className="admin-section">
        <div className="section-header">
            <h2>Inquiries & Messages</h2>
            <span className="badge">{messages.length} Pending</span>
        </div>
        <div className="table-responsive">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(m => (
                        <tr key={m._id}>
                            <td>
                                <div className="user-info">
                                    <span className="name">{m.name}</span>
                                    <span className="email">{m.email}</span>
                                </div>
                            </td>
                            <td className="msg-subject">{m.subject}</td>
                            <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                            <td className="actions">
                                <button title="Read Message"><Eye size={18} /></button>
                                <button title="Delete" className="text-error"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

const PrescriptionManager = ({ prescriptions }) => (
    <section className="admin-section">
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
    <section className="admin-section">
        <div className="section-header">
            <h2>Inventory</h2>
            <button className="btn btn-primary btn-sm">+ Add Product</button>
        </div>
        <div className="table-responsive">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
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
                            <td className="actions">
                                <button className="text-primary">Edit</button>
                                <button className="text-error"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

export default AdminDashboard;
