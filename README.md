# Bug tracker application

Bug tracker a simple web application for tracking bugs and storing them in database (simulated by Csv). Frontend consists of form to collect bug and list of existing bugs.

It includes a front-end built with Vite, React and Material-UI, a back-end powered by Node.js and Express, and is managed within an Nx monorepo. The project uses TypeScript for type safety, Prettier for code formatting, ESLint for linting, and Jest for unit testing.

Disclaimer: This is small exercise not a real application.

## How to use

Application is very simple, it consists of simple page containg both bug tracking form and list of all reported bugs.
Bug is added to list and csv when form is submitted, mandatory field is only id (although, I other rules could be added). If user enters existing ID, warning is displayed. If form with existing bug ID is submitted, "Are you sure" dialog is displayed. If user continues, bug with such ID is deleted.

On the other side, the application contains list of all bugs. If it was real application, filters would be handy, in this case only action available in the list is to delete the bug.

## Start the application using NX

1. Install dependencies `npm i`
2. Run the API using `nx serve api` and keep it running
3. In anothe terminal Run the frontend project using `nx serve bug-tracker-frontend`, application will start on <http://localhost:4201/>

### Unit tests

To run tests use `nx test` command e.g. `nx test bug-tracker-frontend` or `nx test bug-tracker-csv-utils`

### E2E tests

- API tests - Run `nx e2e api-e2e` to run API tests
- Nx creates skeleton project for Frontend Cypress tests, but I didn't manage to write any. So this time it is empty.
