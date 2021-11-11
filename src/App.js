import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login/Login';
import PrivateRoute from './pages/Login/Private/PrivateRoute/PrivateRoute';
import Resister from './pages/Login/Resister/Resister';
import AllOrders from './pages/Orders/AllOrders/AllOrders';
import MyOrders from './pages/Orders/MyOrders/MyOrders';
import Products from './pages/Products/Products/Products';
import TargetProduct from './pages/Products/TargetProduct/TargetProduct';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <PrivateRoute path="/product/:id">
              <TargetProduct />
            </PrivateRoute>
            <PrivateRoute path='/allOrders'>
              <AllOrders />
            </PrivateRoute>
            <PrivateRoute path="/myOrders">
              <MyOrders />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/resister">
              <Resister />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
