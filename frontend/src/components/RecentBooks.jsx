import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import BookCard from "./BookCard";
import { Loader } from "lucide-react";

export default function RecentBooks() {
  const [data, setData] = useState();

  const showRecentBooks = async () => {
    try {
      const books = await axiosInstance.get("bookRoutes/showRecentBooks");
      setData(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showRecentBooks();
  }, []);

  return (
    <div className="px-4">
      <h4 className="text-3xl pb-2 text-yellow-100">Recently added books</h4>
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
