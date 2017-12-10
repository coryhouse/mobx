import React from "react";
import { getAllCourses } from "../../api/mockCourseApi";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    if (this.state.courses.length > 0) return;
    getAllCourses().then(courses => {
      this.setState({ courses });
    });
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

        <CourseList courses={this.state.courses} />
      </div>
    );
  }
}

export default CoursesPage;
