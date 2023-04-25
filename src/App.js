import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AddBook from "./pages/AddBook";
import AllBooks from "./pages/AllBooks";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UpdateBook from "./pages/UpdateBook";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container mx-auto">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<AllBooks />} />
              <Route path="/add" element={<AddBook />} />
              <Route path="/update/:id" element={<UpdateBook />} />
              <Route path="/books/:id" element={<Detail />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
