import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userAuth = async (req, res, next) => {
  // Primeiro tenta pegar o token do cookie
  let token = req.cookies?.token;

  // Se não tiver no cookie, tenta pegar do header Authorization (Bearer)
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user not found" });
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
