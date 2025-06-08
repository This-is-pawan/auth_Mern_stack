const { user_models } = require("../models/userModels");

exports.getData = async (req, res) => {
  try {
  const userId = req.userId;
    const userAvaliable = await user_models.findById(userId );
    if (!userAvaliable) {
      res.json({ success: false, message: "user data is not avaliable" });
    }
    
    return res.status(200).json({
      success: true,
      msg: "User is available",
      userData: {
      name: userAvaliable.name,
      email: userAvaliable.email,
      isAccountVerified: userAvaliable.isAccountVerified,
    },
  });
} catch (error) {
  res.json({ success: false, message: error.message });
}
};
