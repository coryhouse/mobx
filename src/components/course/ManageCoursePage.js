import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import CourseForm from "./CourseForm";
import { getCourseById } from "../../api/mockCourseApi";

import toastr from "toastr";

export class ManageCoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        id: "",
        title: "",
        watchHref: "",
        authorId: "",
        length: "",
        category: ""
      },
      errors: {},
      saving: false,
      redirect: false
    };
  }

  componentDidMount() {
    if (this.props.authors.length === 0) this.props.loadAuthors();
    const courseId = this.props.match.params.id; // from the path `/course/:id`
    if (courseId) {
      getCourseById(courseId).then(course => {
        this.setState({ course });
      });
    }
  }

  updateCourseState = event => {
    const field = event.target.name;
    let course = { ...this.state.course };
    course[field] = event.target.value;
    return this.setState({ course });
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
    this.props
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
        authors={this.props.authors.map(author => {
          return {
            text: `${author.firstName} ${author.lastName}`,
            value: author.id
          };
        })}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired
};

export default ManageCoursePage;
