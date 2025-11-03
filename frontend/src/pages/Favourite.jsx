import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export default function Favourite() {
  const navigate = useNavigate();
  const [fav, setFav] = useState();

  const getFavourites = async () => {
    try {
      const res = await axiosInstance.get("userRoutes/getFavourite");
      setFav(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      {fav && fav.length !== 0 && (
        <h1 className="pb-8 block md:hidden text-left text-3xl font-semibold text-zinc-400">
          Favourite Books
        </h1>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-4">
        {fav &&
          fav.map((data, i) => {
            return (
              <div
                key={i}
                className="hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-center p-[20px] bg-zinc-800 "
                onClick={() => navigate(`/viewBookDetails/${data._id}`)}
              >
                <div className="px-[40px] bg-zinc-900 flex justify-center items-center">
                  <img src={data.url} className="h-[190px] w-[150px]" />
                </div>
                <div className="flex flex-col mt-3 gap-2 justify-center items-start text-white">
                  <span className="text-2xl font-semibold">{data.title}</span>
                  <span>{data.author}</span>
                  <span className="text-xl font-semibold">₹ {data.price}</span>
                </div>
              </div>
            );
          })}
      </div>
      {fav && fav.length === 0 && (
        <div className="text-center w-full">
          <h1 className="text-3xl text-zinc-400 font-semibold text-left">
            No Favourite Books
          </h1>
        </div>
      )}
    </>
  );
}
