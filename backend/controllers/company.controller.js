const Company = require('../models/company.model');

const getProfile = async (req, res) => {
  try {
    const company = await Company.findByManagerId(req.user.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const company = await Company.findByManagerId(req.user.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const updateData = req.body;
    if (req.file) {
      updateData.logo_url = req.file.path; // Cloudinary URL
    }

    await Company.updateProfile(company.id, updateData);
    res.json({ message: 'Company profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, updateProfile };