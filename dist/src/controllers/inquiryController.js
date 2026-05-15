const Inquiry = require('../models/Inquiry');

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: inquiries.length,
      data: { inquiries },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createInquiry = async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { inquiry: newInquiry },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!inquiry) return res.status(404).json({ status: 'fail', message: 'No inquiry found' });
    res.status(200).json({ status: 'success', data: { inquiry } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ status: 'fail', message: 'No inquiry found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
