const Company = require('../models/company.model');

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRevenue = async (req, res) => {
  try {
    // This would need more complex logic for revenue calculation
    // For now, return placeholder
    const revenue = [
      { company_id: 1, company_name: 'Tech Corp', revenue: 5000 },
      { company_id: 2, company_name: 'Design Inc', revenue: 3000 }
    ];
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const approveCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.approve(id);
    res.json({ message: 'Company approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCompanies, getRevenue, approveCompany };