// React libs
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// Components
var App = require('./components/app');
var Splash = require('./components/splash');
var Admin = require('./components/admin/admin');
var SignIn = require('./components/auth/signIn');
var SignUp = require('./components/auth/signUp');
var Forgot = require('./components/auth/forgot');
var Confirm = require('./components/auth/confirm');
var ResetPassword = require('./components/auth/resetPassword');
var Auth = require('./components/auth');
var Dashboard = require('./components/dashboard/dashboard');
var Explore = require('./components/explore/explore');
var Connect = require('./components/connect/connect');
var Play = require('./components/play');
var ExploreV2 = require('./components/exploreV2/explore');

var routes = (
  <Route component={App} path='/'>
    <IndexRoute component={Splash}/>
    <Route component={Admin} path='admin' />
    <Route component={SignIn} path='signin' />
    <Route component={SignUp} path='signup' />
    <Route component={Forgot} path='forgot' />
    <Route component={Confirm} path='confirm/:username/:token' />
    <Route component={ResetPassword} path='reset-password/:username/:token' />
    <Route component={Auth} path='dashboard'>
      <IndexRoute component={Dashboard} />
      <Route component={Explore} path='explore' />
      <Route component={Connect} path='connect' />
      <Route component={Play} path='play' />
      <Route component={ExploreV2} path='explorev2' />
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>, root);
});
