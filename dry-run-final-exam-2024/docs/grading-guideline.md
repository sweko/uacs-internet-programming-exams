# Grading guideline for the final exam

## General grading criteria

- **Correctness**: The correctness of your code will be evaluated by running it. If the code has small errors that do not affect the results, they will be ignored. However, if the code has errors that affect the results, points will be not be awarded.

- **Code quality**: The code quality will be evaluated based on the following criteria:
  - **Readability**: The code should be easy to read and understand. This means that it should be well formatted and that it should contain comments that explain what the code does, where needed.
  - **Modularity**: The code should be divided into functions and classes that are easy to understand and reuse.
  - **Naming**: The code should be well named. Each function and class should have a name that describes what it does.
  - **Efficiency**: The code should be efficient. This means that it should not perform unnecessary computations and that it should not use more memory than necessary.


## Grading Table

| Task | Points |
| ---- | ------ |
| Build Status | 5 |
| Routing | 20 |
| Components | 40 |
| Services | 30 |
| Models | 10 |
| Forms | 20 |
| Observables | 20 |
| Extra | 30 |
| **Total** | **175** |

### Build Status

- **5 points**: The build status is passing.
- **0 points**: The build status is failing.

### Routing

- **5 points**: The application has all the correct routes, even if the components are not functional. The routes are defined in the correct order.
- **5 points**: The application uses child routes to define the routes.
- **5 points**: The application uses injection of a Router (with appropriate code).
- **5 points**: The application uses injection of a Route (with appropriate code).

### Components

- **5 points**: The application has a functional header component.
- **5 points**: The application has a functional footer component.
- **5 points**: The frontend of the list component is functional.
- **5 points**: The backed of the list component suplies data and functionality to the frontend.
- **5 points**: The component(s) for adding and editing items are designed and functional.
- **5 points**: The component(s) for viewing item details are functional.
- **5 points**: The application has a functional about component.
- **5 points**: The application has a functional statistics component.

### Services

- **15 points**: The application has a functional service that communicates with the backend.
- **5 points**: The service manages the overall state of the application.
- **5 points**: The service manages mapping between the frontend and the backend.
- **5 points**: The service manages the data flow between the components and the backend.

### Models

- **5 points**: The models for the application are well defined.
- **5 points**: There is mapping functionality that manages the models.

### Forms

- **5 points**: The application has a functional form (whethen using reactive or template-driven forms).
- **5 points**: The form's markup is operational (ngModel or formControls).
- **5 points**: The form has acceptable validation and error handling.
- **5 points**: The submission of the form is handled correctly.

### Observables

- **10 points**: The application uses observables to manage the data flow between the components and the services.
- **5 points**: The application uses observables to manage the data flow between the components and the routing.
- **5 points**: The application uses unsubscribing to manage the observables.

### Extra

- **30 points**: These points are awarded for extra functionality that is not required by the assignment, or marked as bonus. The points are awarded based on the complexity of the extra functionality. Additionally, these points are available for implementing a functionallity especially well, even if it is required by the assignment.


All the points are awarded based on the criteria described above. The points are not awarded based on the number of features implemented. For example, if the application has all the required features, but the code is not readable nor functional, the points will not be awarded. Similarly, if the application has only a few features, but the code is well written, the points will be awarded. All the points are "up to", meaning that the points will be awarded based on the quality of the code. For example, if the code is well written, but it is missing some features, the points will be partially awarded based on the quality of the code.

The maximum number of points that can be awarded is 175, however the final grade will be capped at 100 points. This means that if you get between 100 and 175 points, you will get 100 points for the final exam.
