const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];  // استخراج التوكن من header
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // التحقق من التوكن
    req.user = decoded;  // إضافة بيانات المستخدم إلى الطلب
    next();  // السماح بإتمام الطلب
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });  // إذا كان التوكن غير صالح
  }
};
