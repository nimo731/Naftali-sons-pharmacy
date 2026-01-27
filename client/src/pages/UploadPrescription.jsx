import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, Truck, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UploadPrescription.css';

const UploadPrescription = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [patientName, setPatientName] = useState(user?.name || '');
    const [notes, setNotes] = useState('');
    const [deliveryType, setDeliveryType] = useState('delivery');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('patientName', patientName);
        formData.append('notes', notes);
        formData.append('deliveryType', deliveryType);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            };
            await axios.post('http://localhost:5000/api/prescriptions', formData, config);
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            console.error('Upload failed:', error);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="upload-success container animate-fade">
                <CheckCircle size={80} color="var(--success)" />
                <h1>Upload Successful!</h1>
                <p>Your prescription has been received and is being reviewed by our pharmacists.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="upload-page container">
            <div className="upload-grid">
                <div className="upload-info">
                    <h1>Upload Prescription</h1>
                    <p className="subtitle">Convenient medication delivery starts here.</p>

                    <div className="info-steps">
                        <div className="step">
                            <div className="step-num">1</div>
                            <div>
                                <h3>Capture Photo</h3>
                                <p>Take a clear photo of your handwritten or printed prescription.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">2</div>
                            <div>
                                <h3>Fill Details</h3>
                                <p>Provide patient name and any specific notes for the pharmacist.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-num">3</div>
                            <div>
                                <h3>We Deliver</h3>
                                <p>Once verified, we'll deliver your meds or notify you for pickup.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="upload-form glass" onSubmit={handleSubmit}>
                    <div className="file-upload-zone">
                        {preview ? (
                            <div className="preview-container">
                                <img src={preview} alt="Prescription preview" />
                                <button type="button" className="btn-remove" onClick={() => { setFile(null); setPreview(null); }}>Change Image</button>
                            </div>
                        ) : (
                            <label className="upload-label">
                                <Upload size={48} />
                                <span>Click to upload or drag image</span>
                                <p>JPG, PNG or PDF (Max 5MB)</p>
                                <input type="file" onChange={handleFileChange} required hidden />
                            </label>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Patient Name</label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            rows="3"
                            placeholder="e.g. Any allergies, preferred brand, or delivery instructions"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="delivery-toggle">
                        <button
                            type="button"
                            className={`toggle-btn ${deliveryType === 'delivery' ? 'active' : ''}`}
                            onClick={() => setDeliveryType('delivery')}
                        >
                            <Truck size={20} /> Home Delivery
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${deliveryType === 'pickup' ? 'active' : ''}`}
                            onClick={() => setDeliveryType('pickup')}
                        >
                            <Package size={20} /> Store Pickup
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading || !file}>
                        {loading ? 'Processing...' : 'Submit Prescription'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPrescription;
