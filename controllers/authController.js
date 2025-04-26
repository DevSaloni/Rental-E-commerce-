const bcrypt = require('bcrypt');
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 🔒 hashing
    
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword, // 🔐 save hashed
      phone,
      address,
    });

    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  // Sample login logic
  exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      email: user.email,
      role: user.role, // <-- IMPORTANT
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
