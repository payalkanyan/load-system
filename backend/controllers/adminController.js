const User = require("../models/User");
const Load = require("../models/Load");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Error fetching users" });
  }
};

exports.getAllLoads = async (req, res) => {
  try {
    const loads = await Load.find().populate("shipperId", "name email");
    res.json(loads);
  } catch (error) {
    res.status(400).json({ error: "Error fetching loads" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting user" });
  }
};
