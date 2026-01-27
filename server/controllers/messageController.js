const Message = require('../models/Message');

// @desc    Send a message
// @route   POST /api/messages
exports.sendMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all messages (Admin only)
// @route   GET /api/messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a message (Admin only)
// @route   DELETE /api/messages/:id
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            await message.remove();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
