const Category = require("../models/Category");

exports.create = async (req, res) => {
  const cat = await Category.create(req.body);
  res.json(cat);
};

exports.readAll = async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
};

exports.update = async (req, res) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cat);
};

exports.delete = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Supprimée" });
};
