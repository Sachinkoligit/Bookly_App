import { useNavigate } from "react-router-dom";

export default function BookCard({ data }) {
  const navigate = useNavigate();
  return (
    <div
      className="hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-center p-[20px] bg-zinc-800 "
      onClick={() => navigate(`/viewBookDetails/${data._id}`)}
    >
      <div className="px-[55px] bg-zinc-900 flex justify-center items-center">
        <img src={data.url} className="h-[190px] w-[150px]" />
      </div>
      <div className="flex flex-col mt-3 gap-2 justify-center items-start text-white">
        <span className="text-2xl font-semibold">{data.title}</span>
        <span>{data.author}</span>
        <span className="text-xl font-semibold">₹ {data.price}</span>
      </div>
    </div>
  );
}
