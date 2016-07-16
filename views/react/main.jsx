// React libs
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// Components
var App = require('./components/app');
var Splash = require('./components/splash');
var SignIn = require('./components/auth/signIn');
var SignUp = require('./components/auth/signUp');
var Admin = require('./components/admin/admin');
var Dashboard = require('./components/dashboard/dashboard');
var Auth = require('./components/auth');

var routes = (
  <Route component={App} path='/'>
    <IndexRoute component={Splash} />
    <Route component={Admin} path='/admin' />
    <Route component={SignIn} path='/signin' />
    <Route component={SignUp} path='/signup' />
    <Route component={Auth} path='/dashboard' >
      <IndexRoute component={Dashboard} />
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>, root);
});
