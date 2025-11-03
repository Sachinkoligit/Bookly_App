import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState();

  const getCart = async () => {
    try {
      const res = await axiosInstance.get("userRoutes/getCartBooks");
      setCart(res.data.data);

      const totalammount = res.data.data.reduce(
        (acc, item) => acc + item.price,
        0
      );
      setTotal(totalammount);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (bookId) => {
    try {
      const res = await axiosInstance.put(`userRoutes/deleteToCart/${bookId}`);
      setCart(res.data.data);
      toast.success("Removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  const orderBooks = async () => {
    try {
      const res = await axiosInstance.post("orderRoutes/orderBook");
      setOrder(res.data);
      toast.success("Order is placed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, [cart, order]);

  return (
    <>
      <h1 className="text-4xl p-[30px] pb-0 font-semibold text-zinc-300">
        Your Cart
      </h1>
      <div className="flex flex-col gap-2 p-[20px] px-[30px]">
        {cart &&
          cart.map((data, i) => {
            return (
              <div
                key={i}
                className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center py-[20px] p-[30px] bg-zinc-800 "
                onClick={() => navigate(`/viewBookDetails/${data._id}`)}
              >
                <div className=" bg-zinc-900 flex justify-center items-center">
                  <img src={data.url} className="h-[100px] w-[50px]" />
                </div>
                <div className="flex flex-col mt-3 gap-2 justify-center items-start text-white">
                  <span className="text-2xl font-semibold">{data.title}</span>
                  <span>{data.author}</span>
                </div>
                <div>
                  <span className="text-xl text-white font-semibold">
                    ₹ {data.price}
                  </span>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCart(data._id);
                  }}
                  className="bg-white p-[8px] text-red-500 rounded hover:cursor-pointer"
                >
                  <MdDelete />
                </div>
              </div>
            );
          })}
      </div>
      {cart && cart.length !== 0 && (
        <div className="flex w-full justify-start md:justify-end px-7 py-4">
          <div className="text-white flex flex-col gap-2 rounded-sm items-center w-[50%] md:w-[150px] py-[10px] bg-zinc-700">
            <h1 className="text-xl font-semibold">Total Amount</h1>
            <div className="flex justify-between w-[80%]">
              <span>{cart.length} Books</span>
              <span>₹ {total}</span>
            </div>
            <div>
              <button
                onClick={() => {
                  orderBooks();
                  navigate("/profile/orderHistory");
                }}
                className="text-zinc-900 bg-white rounded px-5 font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="text-center w-full">
          <h1 className="text-3xl text-zinc-400 font-semibold">
            No Books in cart
          </h1>
        </div>
      )}
    </>
  );
}
