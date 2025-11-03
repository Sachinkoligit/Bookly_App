import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function EditBook() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [data, setData] = useState();
  const [book, setBook] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    languages: "",
  });
  const handleSubmit = async () => {
    try {
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

      await axiosInstance.put(`/bookRoutes/updateBook/${data._id}`, book);
      navigate("/allBooks");
      toast.success("Book updated successfully");
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

  const getBook = async () => {
    try {
      const book = await axiosInstance.get(`bookRoutes/showBook/${bookId}`);
      setData(book.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  useEffect(() => {
    if (data) {
      setBook({
        url: data.url,
        title: data.title,
        author: data.author,
        price: data.price,
        desc: data.desc,
        languages: data.languages,
      });
    }
  }, [data]);

  return (
    <>
      {data && (
        <>
          <h1 className="text-2xl text-white text-left p-5">Update Book</h1>
          <div className="bg-zinc-900 flex justify-center items-center px-1 md:px-5">
            <div className="bg-zinc-800 p-6 w-[90%] md:w-[100%] text-zinc-300">
              <div className="pt-3 flex flex-col gap-3 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div>input]:p-2 [&_div>input]:outline-none">
                <div>
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={book.url}
                    onChange={(e) => setBook({ ...book, url: e.target.value })}
                    placeholder="Enter image URL"
                    className="bg-zinc-900"
                    required
                  />
                </div>
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={book.title}
                    onChange={(e) =>
                      setBook({ ...book, title: e.target.value })
                    }
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
                    onChange={(e) =>
                      setBook({ ...book, author: e.target.value })
                    }
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
                    onClick={() => handleSubmit()}
                    className="bg-blue-500 text-white py-2 rounded transition duration-150 hover:bg-blue-800"
                  >
                    Update Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
