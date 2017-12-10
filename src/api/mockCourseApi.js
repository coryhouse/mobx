import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref:
      "http://www.pluralsight.com/courses/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref:
      "http://www.pluralsight.com/courses/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref:
      "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = course => {
  return replaceAll(course.title, " ", "-");
};

export function getAllCourses() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], courses));
    }, delay);
  });
}

export function getCourseById(id) {
  return new Promise((resolve, reject) => {
    const course = courses.find(c => c.id === id);
    if (!course) {
      reject(`Course not found with ID of ${id}.`);
    }
    setTimeout(() => {
      resolve(Object.assign({}, course));
    });
  });
}

export function saveCourse(courseToSave) {
  // clone to avoid mutating reference passed in.
  const course = { ...courseToSave };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation
      const minCourseTitleLength = 1;
      if (course.title.length < minCourseTitleLength) {
        reject(`Title must be at least ${minCourseTitleLength} characters.`);
      }

      if (course.id) {
        const existingCourseIndex = courses.findIndex(a => a.id === course.id);
        courses.splice(existingCourseIndex, 1, course);
      } else {
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new courses in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        course.id = generateId(course);
        course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        courses.push(course);
      }

      resolve(course);
    }, delay);
  });
}

export function deleteCourse(courseId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const indexOfCourseToDelete = courses.findIndex(
        course => course.courseId === courseId
      );
      courses.splice(indexOfCourseToDelete, 1);
      resolve();
    }, delay);
  });
}
