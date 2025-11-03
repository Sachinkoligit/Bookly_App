import Hero from "../components/Hero";
import RecentBooks from "../components/RecentBooks";
import "../index.css";

export default function Home() {
  return (
    <div className="bg-zinc-900 text-white px-6 md:px-10 py-8 h-auto">
      <Hero />
      <RecentBooks />
    </div>
  );
}
