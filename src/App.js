import './App.css';
import logo from './logo.svg';
import BookList from './pages/BookList.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-4xl drop-shadow-sm'>
          React Library
        </p>
        <BookList />
      </header>
    </div>
  );
}

export default App;
