import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Link to="/sub">Sub</Link>
        {this.props.children}
      </div>
    )
  };
}

class Sub extends React.Component {
  render() {
    return (
      <h2>React Router Tested</h2>
    );
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="sub" component={Sub} />
    </Route>
  </Router>,
  document.getElementById('react-root'));
