// This component handles the App template used on every page.
import React from "react";
import { Route } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import CoursesPage from "./course/CoursesPage";
import ManageCoursePage from "./course/ManageCoursePage"; //eslint-disable-line import/no-named-as-default
import { getAllCourses, saveCourse, getCourseById } from "../api/mockCourseApi";
import { getAllAuthors } from "../api/mockAuthorApi";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      authors: [],
      loading: 0
    };
  }

  componentDidMount() {
    this.loadAuthors();
    this.loadCourses();
  }

  loadCourses = () => {
    this.updateLoadingCount("+");
    return getAllCourses().then(courses => {
      this.updateLoadingCount("-");
      return this.setState({ courses });
    });
  };

  loadAuthors = () => {
    this.updateLoadingCount("+");
    return getAllAuthors().then(authors => {
      this.updateLoadingCount("-");
      return this.setState({ authors });
    });
  };

  loadCourseById = id => {
    this.updateLoadingCount("+");
    return getCourseById(id).then(course => {
      this.updateLoadingCount("-");
      return course;
    });
  };

  updateLoadingCount = operator => {
    this.setState(state => {
      return {
        loading: operator === "+" ? state.loading + 1 : state.loading - 1
      };
    });
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
    const { loading, courses, authors } = this.state;
    return (
      <div className="container-fluid">
        <Header loading={loading > 0} />
        <Route exact path="/" component={HomePage} />
        {/* pattern for passing props to route via render instead of component: https://github.com/ReactTraining/react-router/issues/4105 */}
        <Route
          path="/courses"
          render={props => (
            <CoursesPage
              courses={courses}
              loadCourses={this.loadCourses}
              {...props}
            />
          )}
        />
        <Route
          path="/course/:id"
          render={props => (
            <ManageCoursePage
              authors={authors}
              loadCourseById={this.loadCourseById}
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
              authors={authors}
              loadCourseById={this.loadCourseById}
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
