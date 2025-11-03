import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AllOrders() {
  const navigate = useNavigate();
  const [order, setOrders] = useState();
  const [status, setStatus] = useState();

  const getAllOrders = async () => {
    try {
      const res = await axiosInstance.get("orderRoutes/getAllOrder");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrders = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`orderRoutes/updateOrder/${orderId}`, {
        status: newStatus,
      });
      toast.success("Orders Updated Successfully");
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      console.log(order.status);
    }
  }, []);

  return (
    <>
      {order && (
        <div className="hidden md:block p-0 md:py-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-7 md:gap-2">
            <div className="hidden md:block md:w-[3%]">
              <h1 className="text-center">
                <h1>Sr.</h1>
              </h1>
            </div>
            <div className="w-[28%]">Books</div>
            <div className="w-[20%]">
              <h1>User_Name</h1>
            </div>
            <div className="w-[35%]">
              <h1>Address</h1>
            </div>
            <div className="w-[10%]">Price</div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[18%] md:w-[5%] ">
              <h1>Mode</h1>
            </div>
          </div>
        </div>
      )}
      {order &&
        order.map((item, i) => (
          <div
            key={i}
            // onClick={() => navigate(`/viewBookDetails/${item.book._id}`)}
            className="hidden bg-zinc-800 w-full rounded py-2 px-4 md:flex flex-row gap-7 md:gap-4 hover:bg-zinc-900 hover:cursor-pointer"
          >
            <div className="hidden md:block md:w-[3%]">
              <h1 className="text-center">
                <h1>{i + 1}</h1>
              </h1>
            </div>
            <div className="w-[28%]">{item.book.title}</div>
            <div className="w-[20%]">
              <h1>{item.user.username}</h1>
            </div>
            <div className="w-[35%]">
              <h1>{item.user.address}</h1>
            </div>
            <div className="w-[10%]">₹ {item.book.price}</div>
            <div className="w-[16%]">
              <select
                className="bg-zinc-900 p-[3px] w-[110px]"
                onClick={(e) => e.stopPropagation()}
                value={item.status}
                onChange={(e) => {
                  updateOrders(item._id, e.target.value);
                }}
              >
                <option value="Order Placed" className="bg-zinc-900">
                  Order Placed
                </option>
                <option value="Out for delivery" className="bg-zinc-900">
                  Out for delivery
                </option>
                <option value="Delivered" className="bg-zinc-900">
                  Delivered
                </option>
                <option value="Cancelled" className="bg-zinc-900">
                  Cancelled
                </option>
              </select>
            </div>
            <div className="w-[18%] md:w-[5%] ">
              <h1>C.O.D</h1>
            </div>
          </div>
        ))}
      <div className="md:hidden flex flex-col bg-zinc-900 gap-[20px]">
        {order &&
          order.map((item, i) => (
            <div
              key={i}
              className="md:hidden flex justify-center items-center bg-zinc-900 gap-[100px]"
            >
              <div
                // onClick={() => navigate(`/viewBookDetails/${item.book._id}`)}
                className=" bg-zinc-800 w-[80%] rounded py-1 px-4 flex flex-col items-start gap-1 hover:cursor-pointer"
              >
                {/* <div className="">
                <h1 className="text-center">
                  <h1>{i + 1}</h1>
                </h1>
              </div> */}
                <div className="flex flex-row justify-between w-full">
                  <div>Title : </div>
                  <div className="w-[120px]">{item.book.title}</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>User Name : </div>
                  <div className="w-[120px]">{item.user.username}</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>Address : </div>
                  <div className="w-[120px]">{item.user.address}</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>Price : </div>
                  <div className="w-[120px]">₹ {item.book.price}</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>Status : </div>
                  <select
                    className="bg-zinc-900 p-[3px] w-[120px]"
                    onClick={(e) => e.stopPropagation()}
                    value={item.status}
                    onChange={(e) => {
                      updateOrders(item._id, e.target.value);
                    }}
                  >
                    <option value="Order Placed" className="bg-zinc-900">
                      Order Placed
                    </option>
                    <option value="Out for delivery" className="bg-zinc-900">
                      Out for delivery
                    </option>
                    <option value="Delivered" className="bg-zinc-900">
                      Delivered
                    </option>
                    <option value="Cancelled" className="bg-zinc-900">
                      Cancelled
                    </option>
                  </select>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>Mode : </div>
                  <div className="w-[120px]">C.O.D</div>
                </div>
              </div>
            </div>
          ))}
      </div>
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
