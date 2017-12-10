// This component handles the App template used on every page.
import React from "react";
import { Route } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import CoursesPage from "./course/CoursesPage";
import ManageCoursePage from "./course/ManageCoursePage"; //eslint-disable-line import/no-named-as-default
import { getAllCourses, saveCourse } from "../api/mockCourseApi";
import { getAllAuthors } from "../api/mockAuthorApi";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      authors: []
    };
  }

  loadCourses = () => {
    return getAllCourses().then(courses => this.setState({ courses }));
  };

  loadAuthors = () => {
    return getAllAuthors().then(authors => this.setState({ authors }));
  };

  onSaveCourse = courseToSave => {
    return saveCourse(courseToSave).then(course => {
      const courses = courseToSave.id
        ? [...this.state.courses.filter(c => c.id !== courseToSave.id), course]
        : [...this.state.courses, course];
      this.setState({ courses });
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <Header loading={false} />
        <Route exact path="/" component={HomePage} />
        {/* pattern for passing props to route via render instead of component: https://github.com/ReactTraining/react-router/issues/4105 */}
        <Route
          path="/courses"
          render={props => (
            <CoursesPage
              courses={this.state.courses}
              loadCourses={this.loadCourses}
              {...props}
            />
          )}
        />
        <Route
          path="/course/:id"
          render={props => (
            <ManageCoursePage
              authors={this.state.authors}
              loadAuthors={this.loadAuthors}
              saveCourse={this.onSaveCourse}
              {...props}
            />
          )}
        />
        <Route
          path="/course"
          render={props => (
            <ManageCoursePage
              authors={this.state.authors}
              loadAuthors={this.loadAuthors}
              saveCourse={this.onSaveCourse}
              {...props}
            />
          )}
          exact
        />
      </div>
    );
  }
}

export default App;
