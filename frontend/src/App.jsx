import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./pages/ViewBookDetails";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/useAuthStore";
import Favourite from "./pages/Favourite";
import Order from "./pages/Order";
import Setting from "./pages/Setting";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  const { authUser } = useAuthStore();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editBook/:bookId" element={<EditBook />} />
          <Route path="/cart" element={authUser ? <Cart /> : <Home />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Home />}>
            {authUser && authUser.role === "admin" ? (
              <Route index element={<AllOrders />} />
            ) : (
              <Route index element={<Favourite />} />
            )}
            <Route path="orderHistory" element={<Order />} />
            <Route path="settings" element={<Setting />} />
            <Route
              path="addBook"
              element={
                authUser && authUser.role === "admin" ? <AddBook /> : <Home />
              }
            />
          </Route>
          <Route
            path="/viewBookDetails/:bookId"
            element={<ViewBookDetails />}
          />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
