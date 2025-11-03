import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  const [order, setOrder] = useState();

  const getUserOrder = async () => {
    try {
      const res = await axiosInstance.get("orderRoutes/getUserOrder");
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <>
      {order && (
        <div className=" p-0 md:py-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-7 md:gap-2">
            <div className="hidden md:block md:w-[3%]">
              <h1 className="text-center">
                <h1>Sr.</h1>
              </h1>
            </div>
            <div className="w-[23%] md:w-[28%]">Books</div>
            <div className="hidden md:block md:w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[15%] md:w-[8%]">Price</div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[15%] md:w-[5%] ">
              <h1>Mode</h1>
            </div>
          </div>
        </div>
      )}
      {order &&
        order.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/viewBookDetails/${item.book._id}`)}
            className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-7 md:gap-4 hover:bg-zinc-900 hover:cursor-pointer"
          >
            <div className="hidden md:block md:w-[3%]">
              <h1 className="text-center">
                <h1>{i + 1}</h1>
              </h1>
            </div>
            <div className="w-[23%] md:w-[28%]">{item.book.title}</div>
            <div className="hidden md:block md:w-[45%]">
              <h1>{item.book.desc.slice(0, 50)} .....</h1>
            </div>
            <div className="w-[15%] md:w-[8%]">₹ {item.book.price}</div>
            <div className="w-[18%] md:w-[16%]">
              <h1
                className={`${
                  item.status === "Order Placed"
                    ? "text-yellow-300"
                    : item.status === "Cancelled"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {item.status}
              </h1>
            </div>
            <div className="w-[15%] md:w-[5%] ">
              <h1>C.O.D</h1>
            </div>
          </div>
        ))}
      {order && order.length === 0 && (
        <div className="text-center w-full">
          <h1 className="text-3xl text-zinc-400 font-semibold">
            No Order History
          </h1>
        </div>
      )}
    </>
  );
}
