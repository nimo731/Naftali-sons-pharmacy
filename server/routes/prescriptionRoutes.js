const express = require('express');
const router = express.Router();
const { uploadPrescription, getMyPrescriptions, getAllPrescriptions } = require('../controllers/prescriptionController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .post(protect, upload.single('image'), uploadPrescription)
    .get(protect, admin, getAllPrescriptions);

router.route('/my').get(protect, getMyPrescriptions);

module.exports = router;
