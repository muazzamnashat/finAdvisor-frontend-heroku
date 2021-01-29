import React, { Component } from "react";
import Dashboard from "./containers/Dashboard";
import { connect } from "react-redux";
import { fetchTransactions } from "./actions/fetchTransactions";
import { fetchCategories } from "./actions/fetchCategories";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import { autoLoginUser } from "./actions/userActions";
import {
  fetchTotalSpend,
  fetchTotalIncome,
} from "./actions/transactionsSummary";

class App extends Component {
  state = { counter: 0 };

  componentDidMount() {
    if (localStorage.token) {
      this.props.fetchTransactions();
      this.props.fetchCategories();
      // need autoLoginUser to save user information in redux store and show info on profile section
      this.props.autoLoginUser();
      this.props.fetchTotalSpend();
      this.props.fetchTotalIncome();
    }
  }

  render() {
    return (
      <Router>
        <div>
          <h1>This is working</h1>
          <Switch>
            <Route path="/login">
              {localStorage.token ? <Redirect to="/" /> : <Login />}
            </Route>

            <Route path="/signup">
              {localStorage.token ? <Redirect to="/" /> : <SignUp />}
            </Route>

            {localStorage.token ? (
              <Route
                path="/"
                render={(routerProps) => (
                  <Dashboard
                    {...routerProps}
                    transactions={this.props.transactions}
                  />
                )}
              />
            ) : (
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    userAlreadyLogged: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchCategories,
  autoLoginUser,
  fetchTotalSpend,
  fetchTotalIncome,
})(App);
