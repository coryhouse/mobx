// This component handles the App template used on every page.
import React from "react";
import { Route } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import CoursesPage from "./course/CoursesPage";
import ManageCoursePage from "./course/ManageCoursePage"; //eslint-disable-line import/no-named-as-default

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header loading={false} />
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:id" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} exact />
      </div>
    );
  }
}

export default App;
