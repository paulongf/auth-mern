import User from "../models/user.model.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: error.message + " Error fetching all users",
      });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete himself",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message + " Error deleting user",
    });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params; 
    const { role } = req.body; 

    if (!role || !["ADMIN", "MANAGER", "USER"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot change their own role",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: "-password -__v" }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `Role updated to ${role}`,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

