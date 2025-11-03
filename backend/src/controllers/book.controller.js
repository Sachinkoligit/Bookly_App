import jwt from "jsonwebtoken";
import Book from "../models/book.model.js";
import bcrypt from "bcrypt";

export const showBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showSearchBook = async (req, res) => {
  try {
    const { title } = req.params;

    const books = await Book.find({
      title: { $regex: title, $options: "i" },
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No matching books found" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const showBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(400).json({ message: "Not a Admin" });
    }
    const { url, title, author, price, desc, languages } = req.body;
    const book = await Book.create({
      url,
      title,
      author,
      price,
      desc,
      languages,
    });
    res.status(200).json({ message: "Book Added Successfully" }, book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(400).json({ message: "Not a Admin" });
    }

    const { bookId } = req.params;
    const { url, title, author, price, desc, languages } = req.body;
    await Book.findByIdAndUpdate(bookId, {
      url,
      title,
      author,
      price,
      desc,
      languages,
    });
    const updateBook = await Book.findById(bookId);
    res.status(200).json(updateBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
