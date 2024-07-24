# ghbugtracker

Bug tracker a simple web application for tracking bugs and storing them in database (simulated by Csv). Frontend consists of form to collect bug and list of existing bugs.

It includes a front-end built with Vite, React and Material-UI, a back-end powered by Node.js and Express, and is managed within an Nx monorepo. The project uses TypeScript for type safety, Prettier for code formatting, ESLint for linting, and Jest for unit testing.

Disclaimer: This is small exercise not a real application.

## How to use

Application is very simple, it consists of simple page containg both bug tracking form and list of all reported bugs.
Bug is added to list and csv when form is submitted, mandatory field is only id (although, I other rules could be added). If user enters existing ID, warning is displayed. If form with existing bug ID is submitted, "Are you sure" dialog is displayed. If user continues, bug with such ID is deleted.

On the other side, the application contains list of all bugs. If it was real application, filters would be handy, in this case only action available in the list is to delete the bug.

## Start the application using NX

1. Install dependencies `npm i`
2. Run the API using `nx serve api`
3. Run the frontend project using `nx serve bug-tracker-frontend`, application will start on <http://localhost:4201/>
