const Article = require("../models/Article");

exports.create = async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
};

exports.readAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;        // رقم الصفحة
      const limit = parseInt(req.query.limit) || 10;     // عدد العناصر في كل صفحة
      const skip = (page - 1) * limit;
  
      const articles = await Article.find()
        .skip(skip)
        .limit(limit)
        .populate("categorie");
  
      const total = await Article.countDocuments();
      const totalPages = Math.ceil(total / limit);
  
      res.json({
        currentPage: page,
        totalPages,
        totalArticles: total,
        articles
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.readOne = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("categorie");
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
exports.update = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(article);
};

exports.delete = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Supprimé" });
};
