import React from "react";
import { Redirect } from "react-router-dom";
import CourseForm from "./CourseForm";
import { getCourseById } from "../../api/mockCourseApi";
import { getAllAuthors } from "../../api/mockAuthorApi";
import toastr from "toastr";

export class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {},
      errors: {},
      saving: false,
      redirect: false,
      authors: []
    };
  }

  componentDidMount() {
    const courseId = this.props.match.params.id; // from the path `/course/:id`

    getCourseById(courseId).then(course => {
      this.setState({ course });
    });

    getAllAuthors().then(authors => {
      this.setState({ authors });
    });
  }

  updateCourseState = event => {
    const field = event.target.name;
    // Fix: Clone state to avoid manipulating below.
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course: course });
  };

  courseFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = "Title must be at least 5 characters.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  saveCourse = event => {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions
      .saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  };

  redirect = () => {
    this.setState({ saving: false, redirect: true });
    toastr.success("Course saved.");
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/courses" />;
    }

    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        allAuthors={this.state.authors}
        saving={this.state.saving}
      />
    );
  }
}

export default ManageCoursePage;
