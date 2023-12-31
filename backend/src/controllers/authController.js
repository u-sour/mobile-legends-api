import User from "../models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authController = {
  register: async (req, res) => {
    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password_confirm,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !password_confirm ||
      !first_name ||
      !last_name
    ) {
      return res.status(422).json({ message: "Invalid fields" });
    }
    if (password !== password_confirm)
      return res.status(422).json({ message: "Passwords do not match" });
    const userExists = await User.exists({ email }).exec();
    if (userExists) return res.sendStatus(409);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        username,
        password: hashedPassword,
        first_name,
        last_name,
      });
      return res.sendStatus(201);
    } catch (error) {
      return res.status(400).json({ message: "Could not register" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Invalid fields" });
    }
    // find user doc by email
    const user = await User.findOne({ email }).exec();
    if (!user)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect." });
    // checking password
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect." });

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1800s",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    user.refresh_token = refreshToken;
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    }

    if (process.env.PROJECT_MODE === 'Production') {
      cookieOptions.sameSite = "None"
      cookieOptions.secure = true
    }

    res.cookie("refresh_token", refreshToken, cookieOptions);
    res.json({ access_token: accessToken });
  },
  logout: async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.refresh_token) return res.sendStatus(204);

    const refreshToken = cookies.refresh_token;
    const user = await User.findOne({ refresh_token: refreshToken }).exec();
    const cookieOptions = {
      httpOnly: true,
      secure: false,
    }

    if (process.env.PROJECT_MODE === 'Production') {
      cookieOptions.sameSite = "None"
      cookieOptions.secure = true
    }

    if (!user) {
      res.clearCookie("refresh_token", cookieOptions);
      return res.sendStatus(204);
    }

    user.refresh_token = null;
    await user.save();

    res.clearCookie("refresh_token", cookieOptions);
    res.sendStatus(204);
  },
  refresh: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.refresh_token) return res.sendStatus(401);

    const refreshToken = cookies.refresh_token;

    const user = await User.findOne({ refresh_token: refreshToken }).exec();

    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.id !== decoded.id) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1800s" }
        );

        res.json({ access_token: accessToken });
      }
    );
  },
  user: async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
  },
};
export default authController;
