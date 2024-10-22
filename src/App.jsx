import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Overview from "./Pages/Overview";
import { useEffect, useState } from "react";
import Tables from "./Pages/Reports";
import Quotation from "./Pages/SalePages/Quotation";
import Invoice from "./Pages/SalePages/Invoice";
import Return from "./Pages/SalePages/Return";
import ListProduc from "./Pages/SetUpPages/ListProduc";
import ListUsers from "./Pages/SetUpPages/ListUsers";
import ProductCategory from "./Pages/SetUpPages/ProductCategory";
import CustomerCategory from "./Pages/SetUpPages/CustomerCategory";
import ListVendors from "./Pages/SetUpPages/Vendors";
import ListCustomer from "./Pages/SetUpPages/Customer";
import GeneralFeilds from "./Pages/SetUpPages/GeneralFeilds";
import GeneralTexes from "./Pages/SetUpPages/GeneralTexes";
import GeneralWarehouses from "./Pages/SetUpPages/GeneralWearhouses";
import LoginPage from "./Pages/LoginSignup/LoginPage";
import SignupPage from "./Pages/LoginSignup/SignupPage";
import CreatCompany from "./Pages/LoginSignup/CreatCompany";
import Order from "./Pages/PurchasePages/Order";
import PrurchaseInvoice from "./Pages/PurchasePages/PrurchaseInvoice";
import PurchaseReturn from "./Pages/PurchasePages/PurchaseReturn";
import PosCheck from "./Pages/PosPages/PosCheck";
import PosDelivery from "./Pages/PosPages/PosDelivery";
import InventoryMovement from "./Pages/Inventory/InventoryMovement";
import InventoryAdjust from "./Pages/Inventory/InventoryAdjust";

function App() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "false"
  ); // Login status
  const [isCompanyCreated, setIsCompanyCreated] = useState(
    localStorage.getItem("companyCreated") === "false"
  ); // Company creation status

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("login", "true");
  };

  const handleCompanyCreation = () => {
    setIsCompanyCreated(true);
    localStorage.setItem("companyCreated", "true");
  };

  useEffect(() => {
    // Update local storage when login or company creation status changes
    localStorage.setItem("login", isLoggedIn);
    localStorage.setItem("companyCreated", isCompanyCreated);
  }, [isLoggedIn, isCompanyCreated]);

  return (
    <Router>
      {isLoggedIn && isCompanyCreated ? (
        <>
          {/* Show Navbar and Sidebar */}
          <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          {/* Show Main content */}
          <Routes>
            <Route path="/dashboard" element={<Overview isOpen={isOpen} />} />
            <Route path="/Reports" element={<Tables />} />
            <Route path="/sales/quotation" element={<Quotation />} />
            <Route path="/sales/invoice" element={<Invoice />} />
            <Route path="/sales/return" element={<Return />} />
            <Route path="/purchases/order" element={<Order />} />
            <Route path="/purchases/invoice" element={<PrurchaseInvoice />} />
            <Route path="/purchases/return" element={<PurchaseReturn />} />
            <Route path="/POS/checkout-counter" element={<PosCheck />} />
            <Route path="/POS/delivery-counter" element={<PosDelivery />} />
            <Route
              path="/inventory/stock-movement"
              element={<InventoryMovement />}
            />
            <Route
              path="/inventory/stock-adjustment"
              element={<InventoryAdjust />}
            />
            <Route path="/List-customers" element={<ListCustomer />} />
            <Route path="/List-vendors" element={<ListVendors />} />
            <Route
              path="/List-products"
              element={<ListProduc isOpen={isOpen} />}
            />
            <Route path="/List-users" element={<ListUsers />} />
            <Route path="/customer-categories" element={<CustomerCategory />} />
            <Route path="/product-categories" element={<ProductCategory />} />
            <Route path="/General-taxes" element={<GeneralTexes />} />
            <Route path="/General-warehouses" element={<GeneralWarehouses />} />
            <Route path="/General-custom-fields" element={<GeneralFeilds />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      ) : (
        // If the user is not logged in or the company is not created
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/createform"
            element={<CreatCompany onCompanyCreate={handleCompanyCreation} />}
          />
          <Route
            path="*"
            element={
              <Navigate to={isLoggedIn ? "/createform" : "/dashboard"} />
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
