import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./PrivateRoute";
import Login from "../../login/login";
import UserForm from "../../user_form/user_form";
import Dashboard from "../../dashboard/Dashboard";
//import AppIndex from '../app_index/index';
import SearchList from "../../search_list/search_list";
class Routes extends Component {
  render() {
    let user = JSON.parse(localStorage.getItem("user")) || {};
    return (
      <div className="content">
        <Switch>
          {user.hasOwnProperty("authToken") ? null : (
            <Route path="/login" component={Login} />
          )}
          {user.hasOwnProperty("authToken") ? null : <Redirect to="/login" />}
          <ProtectedRoute exact path="/user-form" component={UserForm} />
          <ProtectedRoute exact path="/search-list" component={SearchList} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}
export default Routes;
