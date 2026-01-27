const Prescription = require('../models/Prescription');

// @desc    Upload prescription
// @route   POST /api/prescriptions
exports.uploadPrescription = async (req, res) => {
    const { patientName, notes, deliveryType } = req.body;
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const prescription = new Prescription({
            user: req.user._id,
            patientName,
            imageUrl: req.file.path,
            notes,
            deliveryType
        });

        const createdPrescription = await prescription.save();
        res.status(201).json(createdPrescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user prescriptions
// @route   GET /api/prescriptions/my
exports.getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ user: req.user._id });
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all prescriptions (Admin only)
// @route   GET /api/prescriptions
exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({}).populate('user', 'name email');
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
