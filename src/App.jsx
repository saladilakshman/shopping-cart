import Homepage from "./pages/homepage";
import Cart from "./pages/cart";
import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/header";
function App() {
  return (
    <div className="container mx-auto py-3 px-2">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
