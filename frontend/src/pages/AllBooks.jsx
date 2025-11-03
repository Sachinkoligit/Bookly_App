import { Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import BookCard from "../components/BookCard";

export default function AllBooks() {
  const [data, setData] = useState();
  const [searchBook, setSearchBook] = useState();

  const showRecentBooks = async () => {
    try {
      const books = await axiosInstance.get("bookRoutes/showBooks");
      setData(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showSearchBooks = async () => {
    try {
      const books = await axiosInstance.get(
        `bookRoutes/showSearchBook/${searchBook}`
      );
      setData(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchBtn = async () => {
    try {
      showSearchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showRecentBooks();
  }, [searchBook]);
  return (
    <div className="min-h-screen pb-10 px-10 pt-5 bg-zinc-900">
      <div className="flex justify-between items-center ">
        <input
          type="text"
          placeholder="Search Book"
          className="px-3 w-[95%] py-3 text-xl rounded bg-zinc-800 outline-none text-white "
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
        />
        <button
          className="bg-zinc-800 p-[13px] rounded"
          onClick={() => searchBtn()}
        >
          <Search className="text-white" />
        </button>
      </div>
      <h4 className="text-3xl pt-5 pb-5 text-yellow-100">All Books</h4>
      {!data && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="my-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {data &&
          data.map((items, i) => {
            return <BookCard key={i} data={items} />;
          })}
      </div>
    </div>
  );
}
