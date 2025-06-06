import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
