import { Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import CollectionPage from './Pages/CollectionPage'
import ProductDetail from './components/Products/ProductDetail'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './Pages/OrderConfirmationPage'
import OrderDetailPages from './Pages/OrderDetailPages'
import AdminLayout from './components/Layout/AdminLayout'
import AdminHomePage from './components/Admin/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import OrdersManagement from './components/Admin/OrdersManagement'
import ProductEditpage from './components/Admin/ProductEditpage'
import AddProductPage from './components/Admin/AddProductPage'

import { Provider } from 'react-redux'
import store from './redux/store'
import ProtectedRoute from './components/Common/ProtectedRoute'


const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        {/* user layout  */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route
            path="collection/:collection"
            element={<CollectionPage />}
          ></Route>
          <Route path="products/:id" element={<ProductDetail />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route
            path="order-confirmation"
            element={<OrderConfirmationPage />}
          ></Route>
          <Route path="order/:id" element={<OrderDetailPages />}></Route>
          {/* admin layout  */}
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={"admin"}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHomePage />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/edit/:id" element={<ProductEditpage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="orders" element={<OrdersManagement />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App