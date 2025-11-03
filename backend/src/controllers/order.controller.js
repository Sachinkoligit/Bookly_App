import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const orderBook = async (req, res) => {
  try {
    const userId = req.user._id;
    let userCart = await req.user.cart;
    console.log(userCart.length);
    for (let i = 0; i < userCart.length; i++) {
      await Order.create({
        user: userId,
        book: userCart[i],
      });

      await User.findByIdAndUpdate(userId, { $push: { orders: userCart[i] } });
    }
    userCart = [];
    await User.findByIdAndUpdate(userId, { cart: userCart });
    res.status(200).json({ message: "Order is placed" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const userOrders = await Order.find({ user: userId })
      .populate("user")
      .populate("book");
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const userOrders = await Order.find()
      .populate("user")
      .populate("book")
      .sort({ createdAt: -1 });
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateOrder = async (req, res) => {
  try {
    if (req.user.role != "admin") {
      return res.status(400).json({ message: "Not a Admin" });
    }
    const { orderId } = req.params;
    const { status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
