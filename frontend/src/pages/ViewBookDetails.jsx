import { useNavigate, useParams } from "react-router-dom";
import { Globe, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthStore } from "../Store/useAuthStore";
import toast from "react-hot-toast";
import EditBook from "./EditBook";

export default function ViewBookDetails() {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();
  const { bookId } = useParams();
  const [data, setData] = useState();
  const [fav, setFav] = useState(false);
  const [cart, setCart] = useState(false);

  const showBook = async () => {
    try {
      const book = await axiosInstance.get(`bookRoutes/showBook/${bookId}`);
      setData(book.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavourite = async () => {
    try {
      const userFav = authUser.favourites;
      if (userFav.includes(bookId)) {
        setFav(true);
      } else {
        setFav(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkCart = async () => {
    try {
      const userFav = authUser.cart;
      if (userFav.includes(bookId)) {
        setCart(true);
      } else {
        setCart(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFavourite = async () => {
    try {
      await axiosInstance.put(`/userRoutes/addFavourite/${bookId}`);
      toast.success("Added in favourites");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteFavourite = async () => {
    try {
      await axiosInstance.put(`/userRoutes/deleteFavourite/${bookId}`);
      toast.success("Remove from favourites");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const addToCart = async () => {
    try {
      await axiosInstance.put(`/userRoutes/addToCart/${bookId}`);
      toast.success("Added in cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteToCart = async () => {
    try {
      await axiosInstance.put(`/userRoutes/deleteToCart/${bookId}`);
      toast.success("Remove from cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteBook = async () => {
    try {
      await axiosInstance.delete(`/bookRoutes/deleteBook/${bookId}`);
      toast.success("Book is removed");
      navigate("/allBooks");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    showBook();
    if (authUser) {
      checkFavourite();
      checkCart();
      checkAuth();
    }
  }, [authUser]);

  return (
    <>
      {data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
          <div className="bg-zinc-800 rounded p-2 md:p-4 h-[65vh] md:h-[88vh] w-full md:w-[50%] flex  flex-col md:flex-row justify-center items-center gap-3 md:gap-10">
            <img src={data.url} className="h-[50vh] md:h-[70vh]" />
            {authUser && authUser.role === "user" && (
              <div className="flex flex-row gap-20  md:h-full md:pt-12">
                <button
                  onClick={() => {
                    fav === false ? addFavourite() : deleteFavourite();
                    setFav((fav) => !fav);
                  }}
                  className={`bg-white rounded-full h-[40px] text-2xl md:text-2xl ${
                    fav === true ? "text-red-700" : "text-black"
                  } p-2`}
                >
                  <FaHeart />
                </button>
                <button
                  onClick={() => {
                    cart === false ? addToCart() : deleteToCart();
                    setCart((cart) => !cart);
                  }}
                  className={`bg-white rounded-full h-[40px] text-2xl md:text-2xl ${
                    cart === true ? "text-blue-700" : "text-black"
                  } p-2`}
                >
                  <FaShoppingCart />
                </button>
              </div>
            )}

            {authUser && authUser.role === "admin" && (
              <div className="flex flex-row gap-20  md:h-full md:pt-12">
                <button
                  onClick={() => {
                    setFav((fav) => !fav);
                    navigate(`/editBook/${bookId}`);
                  }}
                  className={`bg-white rounded-full h-[40px] text-2xl md:text-2xl text-green-600
                   p-2`}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setCart((cart) => !cart);
                    deleteBook();
                  }}
                  className={`bg-white rounded-full h-[40px] text-2xl md:text-2xl text-red-600 p-2`}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>

          <div className="p-4 w-full md:w-[50%]">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">{data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl text-justify">
              {data.desc}
            </p>
            <p className="text-zinc-400 flex gap-2 mt-4">
              <Globe /> {data.languages}
            </p>
            <p className="text-zinc-100 text-3xl mt-4 font-semibold">
              Price : ₹ {data.price}
            </p>
          </div>
        </div>
      )}
      {!data && <Loader />}
    </>
  );
}
