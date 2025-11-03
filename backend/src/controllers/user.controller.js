import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username === "" || email === "" || password === "" || address === "") {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password must be greater than 5 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      address,
    });
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json({ message: "User not exists" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "none", // needed for cross-site cookies
      secure: true, // ✅ boolean, not string
    });

    res.status(200).json(validUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const user = req.user;
    const updatedUser = await User.findByIdAndUpdate(user._id, { address });
    res.status(200).json({ message: "User updated Successfully" }, updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;
    const favourite = await User.findById(userId);
    const favArray = favourite.favourites;
    if (favArray.includes(bookId)) {
      return res.status(400).json({ message: "Already in the favourite" });
    }
    favArray.push(bookId);
    await User.findByIdAndUpdate(userId, { favourites: favArray });
    const user = await User.findById(userId);
    res.status(200).json({ message: "Added to favourite" }, user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavourite = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId);
    const favArray = user.favourites.filter(
      (book) => book.toString() !== bookId
    );
    console.log(favArray);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      favourites: favArray,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavourite = async (req, res) => {
  try {
    const favouriteBooks = await req.user.populate("favourites");
    res.status(200).json({ data: favouriteBooks.favourites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userCart = req.user.cart;
    const { bookId } = req.params;
    if (userCart.includes(bookId)) {
      return res.status(400).json({ message: "Already in cart" });
    }
    userCart.push(bookId);
    await User.findByIdAndUpdate(req.user._id, { cart: userCart });
    const user = await User.findById(req.user._id);
    res.status(200).json({ message: "Added to cart" }, { data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteToCart = async (req, res) => {
  try {
    const cart = req.user.cart;
    const { bookId } = req.params;
    const cartArray = cart.filter((book) => book.toString() !== bookId);
    const user = await User.findByIdAndUpdate(req.user._id, {
      cart: cartArray,
    });
    res.status(200).json({ message: "Deleted from cart" }, { data: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getCartBooks = async (req, res) => {
  try {
    const user = await req.user.populate("cart");
    const userCart = user.cart;
    res.status(200).json({ data: userCart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
