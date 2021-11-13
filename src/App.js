import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import MyOrders from './pages/Dashboard/Orders/MyOrders/MyOrders';
import Home from './pages/Home/Home/Home';
import Feedback from './pages/Login/Feedback/Feedback';
import Login from './pages/Login/Login/Login';
import PrivateRoute from './pages/Login/Private/PrivateRoute/PrivateRoute';
import Resister from './pages/Login/Resister/Resister';
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
            <PrivateRoute path="/feedback">
              <Feedback />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
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
