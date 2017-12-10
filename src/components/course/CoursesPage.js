import React from "react";
import PropTypes from "prop-types";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    if (this.props.courses.length === 0) this.props.loadCourses();
  }

  redirectToAddCoursePage = () => {
    this.props.history.push("/course");
  };

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />

        <CourseList courses={this.props.courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  // Used to trigger a load of courses by the parent if no courses have been loaded yet.
  loadCourses: PropTypes.func.isRequired
};

export default CoursesPage;
