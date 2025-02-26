import LoginPage from "../src/pages/LoginPage";
import ErrorPage from "../src/pages/ErrorPage";
import IndexPage from "../src/pages/IndexPage";
import RegisterPage from "../src/pages/RegisterPage";
import HomePage from "../src/pages/HomePage";
import GeneratePage from "../src/pages/GeneratePage";
import SavedRecipePage from "../src/pages/SavedRecipePage";
import SavedRecipeViewPage from "../src/pages/SavedRecipeViewPage";
import CollectionsPage from "../src/pages/CollectionsPage";
import CollectionsViewPage from "../src/pages/CollectionsViewPage";
import CollectionsAddPage from "../src/pages/CollectionsAddPage";
import RecipeOfTheDayPage from "../src/pages/RecipeOfTheDayPage";
import SettingsPage from "../src/pages/SettingsPage";

import Logout from "../src/pages/Logout";
import SideBar from "../src/components/SideBar";
import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/home",
    element: <PrivateRoute><SideBar /><HomePage /></PrivateRoute>
  },
  {
    path: "/generate",
    element:  <PrivateRoute><SideBar /><GeneratePage /> </PrivateRoute>
  },
  {
    path: "/savedrecipes",
    element:  <PrivateRoute><SideBar /><SavedRecipePage /> </PrivateRoute>
  },
  {
    path: "/savedrecipes/:id",
    element:  <PrivateRoute><SideBar /><SavedRecipeViewPage /> </PrivateRoute>
  },
  {
    path: "/collections",
    element: <PrivateRoute><SideBar /><CollectionsPage /> </PrivateRoute>
  },
  {
    path: "/collections/:id",
    element: <PrivateRoute><SideBar /><CollectionsViewPage /> </PrivateRoute>
  },
  {
    path: "/collections/:id/add",
    element: <PrivateRoute><SideBar /><CollectionsAddPage /> </PrivateRoute>
  },
  {
    path: "/recipeoftheday/",
    element: <PrivateRoute><SideBar /><RecipeOfTheDayPage /> </PrivateRoute>
  },
  {
    path: "/settings",
    element: <PrivateRoute><SideBar /><SettingsPage /></PrivateRoute>
  },
  {
    path: "/logout",
    element: <PrivateRoute><Logout/></PrivateRoute>
  }
];

export default routes;
