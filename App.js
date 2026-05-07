Action: file_editor create /app/frontend/src/App.js --file-text "import React from \"react\";
import \"./App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import { Toaster } from \"sonner\";
import { CartProvider } from \"./context/CartContext\";
import Header from \"./components/Header\";
import Footer from \"./components/Footer\";
import CartDrawer from \"./components/CartDrawer\";
import Home from \"./pages/Home\";
import Shop from \"./pages/Shop\";
import Checkout from \"./pages/Checkout\";
import OrderConfirmation from \"./pages/OrderConfirmation\";

function App() {
  return (
    <div className=\"App\">
      <BrowserRouter>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>
            <Routes>
              <Route path=\"/\" element={<Home />} />
              <Route path=\"/shop\" element={<Shop />} />
              <Route path=\"/shop/:category\" element={<Shop />} />
              <Route path=\"/checkout\" element={<Checkout />} />
              <Route path=\"/order/:id\" element={<OrderConfirmation />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position=\"bottom-right\"
            toastOptions={{
              style: {
                background: \"#FAF9F6\",
                color: \"#1B3B24\",
                border: \"1px solid #D1CFC7\",
                borderRadius: 0,
                fontFamily: \"Work Sans, sans-serif\",
              },
            }}
          />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
"
Observation: Overwrite successful: /app/frontend/src/App.js
