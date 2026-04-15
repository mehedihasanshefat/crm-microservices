const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
};

exports.getLeads = async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
};
