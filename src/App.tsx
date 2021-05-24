import './App.css';

import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container">
        <Sidebar />
        <main>
          <h2>Replace me with your own code!</h2>
        </main>
      </div>
    </>
  );
}

export default App;
