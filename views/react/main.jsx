// React libs
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// Components
var App = require('./components/app');
var Dashboard = require('./components/dashboard');
var Splash = require('./components/splash');
var About = require('./components/about');
var SignIn = require('./components/signIn');
var SignUp = require('./components/signUp');
var Admin = require('./components/admin');
var Profile = require('./components/profile');
var DataStreamDetail = require('./components/dataStreamDetail');
var DashboardLanding = require('./components/dashboardLanding');

// once user auth is added just nest all the user paths with wildcard
// doing the above will also prevent you from having to include navbar on every view
var routes = (
  <Route component={App} path='/'>
    <IndexRoute component={Splash} ></IndexRoute>
    <Route component={Admin} path='/admin' ></Route>
    <Route component={About} path='/about' ></Route>
    <Route component={SignIn} path='/signin' ></Route>
    <Route component={SignUp} path='/signup' ></Route>
    <Route component={Dashboard} path='/dashboard' >
      <IndexRoute component={DashboardLanding} ></IndexRoute>
      <Route component={Profile} path='/profile' ></Route>
      <Route component={DataStreamDetail} path='formdetail'></Route>
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>, root);
});
