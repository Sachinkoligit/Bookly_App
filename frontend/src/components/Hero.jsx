import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate=useNavigate();
  return (
    <div className="h-[75vh] flex flex-col md:flex-row justify-center items-center gap-[30px] md:gap-0">
      <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Explore stories worth reading
        </h1>
        <p className="mt-4 text-center lg:text-left text-xl text-zinc-300">
          Find exciting stories, helpful knowledge, and lots of inspiration in
          our selected book collection
        </p>
        <div className="mt-8">
          <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full" onClick={()=>navigate("/allBooks")}>
            Discover Books
          </button>
        </div>
      </div>
      <div className="w-full lg:w-[50%] h-auto lg:h-[100%] flex items-center justify-center">
        <img
          src="/hero.png"
          alt="heroImg"
          className="h-[200px] w-[500px] md:h-[350px] md:w-[650px]"
        />
      </div>
    </div>
  );
}
