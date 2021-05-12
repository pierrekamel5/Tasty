import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';
import OrdersScreen from '../Screens/Orderscreen';
import Checkout from '../Screens/Checkout';
import Landingpage from '../Screens/Landingpage';
import RestaurantMenu from '../Screens/RestaurantMenu';
import Feedback from '../Screens/Feedback';
import Addfeedback from '../Components/Addfeedback';
import Makereservation from '../Screens/Makereservation';
import RestaurantsDetails from '../Screens/RestaurantsDetails';
import Privacypolicy from '../Screens/Privacypolicy';
import RecipeTypesScreen from '../Screens/RecipeTypesScreen';
import Recipes from '../Screens/Recipes';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import RestaurantsScreen from '../AdminScreens/RestaurantsScreen';
import RestaurantDetailsScreen from '../AdminScreens/RestaurantDetailsScreen';
import MenuScreen from '../AdminScreens/MenuScreen';
import ReservationsScreen from '../AdminScreens/ReservationsScreen';
import UsersScreen from '../AdminScreens/UsersScreen';
import RestaurantPhotosScreen from '../AdminScreens/RestaurantPhotosScreen';
export let userRoutes =
<Switch>
    <Route path="/" exact>
      <Landingpage />
    </Route>
    <Route path="/restaurant/:placeId">
      <RestaurantMenu />
    </Route>
    <Route path="/cart" exact>
      <OrdersScreen />
    </Route>
    <Route path="/restaurants" exact>
      <RestaurantsDetails />
    </Route>
    <Route path="/recipes" exact>
      <RecipeTypesScreen />
    </Route>
    <Route path="/recipes/:recipeId" exact>
      <Recipes />
    </Route>
    <Route path="/privacypolicy" exact>
      <Privacypolicy />
    </Route>
    <Route path="/reservation" exact>
      <Makereservation />
    </Route>
    <Route path="/feedbacks" exact>
      <Feedback />
    </Route>
    <Route path="/feedbacks/reviewus">
      <Addfeedback />
    </Route>
    <Route path="/cart/checkout">
      <Checkout />
    </Route>
    <Redirect to="/" />
  </Switch>

export let adminRoutes =
<Switch>
<Route path="/users" exact>
      <UsersScreen />
    </Route>
    <Route path="/reservations" exact>
      <ReservationsScreen />
    </Route>
    <Route path="/restaurant" exact>
      <RestaurantsScreen />
    </Route>
    <Route path="/restaurant/:id" exact>
      <RestaurantDetailsScreen />
    </Route>
    <Route path="/restaurant/:id/menu" exact>
      <MenuScreen />
    </Route>
    <Route path="/restaurant/:id/photos" exact>
      <RestaurantPhotosScreen />
    </Route>
    <Route path="/feedbacks" exact>
      <Feedback />
    </Route>
    <Redirect to="/restaurant" />
  </Switch>

export let anonymousRoutes =
<Switch>
<Route path="/auth">
  <Login />
</Route>
<Route path="/register">
  <Register />
</Route>
<Redirect to="/auth" />
</Switch>