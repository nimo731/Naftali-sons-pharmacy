const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientName: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Cloudinary URL
    notes: { type: String },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'ready', 'delivered'],
        default: 'pending'
    },
    deliveryType: { type: String, enum: ['delivery', 'pickup'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
