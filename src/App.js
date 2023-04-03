import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import About from "./pages/About";
import AddBook from "./pages/AddBook";
import BookList from "./pages/BookList";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="container">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/update/:id" element={<UpdateBook />} />
            <Route path="/books/:id" element={<Detail />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
