const User = require('../models/mongoDBModel');

// CREATE a new user
exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      mobileNumber,
      password,
      address,
    } = req.body;

    const profilePhoto = req.file ? req.file.filename : '';

    const user = new User({
      firstName,
      lastName,
      email,
      dob,
      mobileNumber,
      password,
      address,
      profilePhoto,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // omit password
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// UPDATE user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      firstName,
      lastName,
      email,
      dob,
      mobileNumber,
      password,
      address,
    } = req.body;

    const profilePhoto = req.file ? req.file.filename : undefined;

    const updatePayload = {
      firstName,
      lastName,
      email,
      dob,
      mobileNumber,
      password,
      address,
    };

    if (profilePhoto) {
      updatePayload.profilePhoto = profilePhoto;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};



exports. getAjaxUsers = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === "asc" ? 1 : -1;

  const columns = [
    "firstName",
    "lastName",
    "email",
    "dob",
    "mobileNumber",
    "address",
    
  ];

  const sortField = columns[colIndex] || "firstName";

  const query = {
    $or: [
      { firstName: { $regex: searchValue, $options: "i" } },
      { lastName: { $regex: searchValue, $options: "i" } },
      { email: { $regex: searchValue, $options: "i" } },
      { address: { $regex: searchValue, $options: "i" } },
    ],
  };

  try {
    const total = await User.countDocuments();
    const filtered = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ [sortField]: dir })
      .skip(start)
      .limit(length);

    const data = users.map((user, i) => [
      start + i + 1,
      user.firstName,
      user.lastName,
      user.email,
      user.dob?.toISOString().split("T")[0] || "", // Optional format
      user.mobileNumber,
      user.address,
       user._id,
    ]);

    res.json({
      draw,
      recordsTotal: total,
      recordsFiltered: filtered,
      data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};