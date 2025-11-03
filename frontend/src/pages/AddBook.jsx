import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

export default function AddBook() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [book, setBook] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    languages: "",
  });
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "booksImg");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dnfuwt7kv/image/upload",
        data
      );
      book.url = uploadRes.data.url;
      if (
        book.url === "" ||
        book.title === "" ||
        book.author === "" ||
        book.price === "" ||
        book.desc === "" ||
        book.languages === ""
      ) {
        toast.error("All Fields are required");
        return;
      }

      await axiosInstance.post("bookRoutes/addBook", book);
      navigate("/allBooks");
      toast.success("Book added successfully");
      setBook({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        languages: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 flex justify-center items-center">
      <div className="bg-zinc-800 p-6 w-[90%] md:w-[90%] text-zinc-300">
        <h1 className="text-2xl text-white">Add Book</h1>
        <div className="pt-3 flex flex-col gap-3 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div>input]:p-2 [&_div>input]:outline-none">
          <div>
            <label>Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-zinc-900"
              required
            />
          </div>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              placeholder="Book title"
              className="bg-zinc-900"
              required
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              placeholder="Author name"
              className="bg-zinc-900"
              required
            />
          </div>
          <div></div>
          <div className="flex !flex-row w-full justify-between gap-5">
            <div className="w-[46%]">
              <label>Languages</label>
              <input
                type="text"
                value={book.languages}
                onChange={(e) =>
                  setBook({ ...book, languages: e.target.value })
                }
                placeholder="e.g. English, Hindi"
                className="bg-zinc-900"
                required
              />
            </div>
            <div className="w-[46%]">
              <label>Price</label>
              <input
                type="number"
                value={book.price}
                onChange={(e) =>
                  setBook({ ...book, price: Number(e.target.value) })
                }
                placeholder="Price"
                className="bg-zinc-900"
                required
              />
            </div>
          </div>
          <div>
            <label>Description</label>
            <textarea
              rows={4}
              className="bg-zinc-900 p-2 outline-none"
              placeholder="Book description"
              value={book.desc}
              onChange={(e) => setBook({ ...book, desc: e.target.value })}
              required
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 rounded transition duration-150 hover:bg-blue-800"
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
