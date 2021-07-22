import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import { API_ROOT, GET, GET_ALL_APPOINTMENTS } from "./constants";
import { FETCH_API_CALL } from "./services";

function App() {
  useEffect(() => {
    const getData = async () => {
      const data = await FETCH_API_CALL({
        endpoint: `${API_ROOT}${GET_ALL_APPOINTMENTS}`,
        method: GET,
      });
      // for testing purpose will remove later
      console.log("Data", data);
    };
    getData();
  });
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
