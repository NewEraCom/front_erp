# Readme

## Introduction
This project is a Vue.js application designed with modularity and scalability in mind. It follows a structured approach to organizing files and directories, ensuring that components, services, and utilities are easy to locate and maintain. The structure supports multiple modules, such as HR, Sales, Logistics, Finance, Project Management, each encapsulating its own components and services.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure
```
src/
|-- components/ (shared components across modules)
|-- modules/
    |-- HR/
        |-- components/ (HR-specific components)
        |-- services/ (HR-specific services like API calls)
        |-- HR.vue (HR module entry component)
    |-- Sales/
        |-- ...
    |-- Logistics/
        |-- ...
    |-- Finance/
        |-- ...
    |-- ProjectManagement/
        |-- ...
|-- services/
    |-- authService.js (handles authentication and role permissions)
    |-- apiService.js (handles all API requests)
|-- utils/ (utility functions)
|-- store/ (Vuex store, if using Vuex for state management)
    |-- modules/
        |-- hr.js
        |-- sales.js
        ...
|-- router/
    |-- index.js (Vue Router configuration, with role-based route guards)

```
## Naming Conventions and Rules
To maintain consistency and clarity throughout the project, the following rules need to be respected:

1-Vue Component Files: All files ending with .vue must be named using PascalCase with at least two words. For example, UserCard.vue or InvoiceList.vue. This rule ensures that component names are descriptive and follow Vue's recommended naming convention.

2-Folders: All folders should be named in PascalCase or start with an uppercase letter. This convention distinguishes directories from files and makes it clear when a name represents a collection of related files or a specific functionality. For example, Components/, Services/, or ProjectManagement/.

3-JavaScript and TypeScript Files: Files with .js or .ts extensions should be named using snake_case. This approach is chosen to differentiate script files from component files and to follow a common naming convention for scripts. For example, api_service.js or auth_service.ts.

4-Variables: Variable names should be in lowercase for single-word names, and camelCase for variables containing two or more words. This rule applies to all variables used within .js, .ts, and .vue files to ensure consistency and readability in the codebase. For example, username or accessToken.

## Conclusion
Following these rules and structure will help maintain the project's integrity, scalability, and readability as it grows. It allows developers to quickly navigate the codebase, understand the organization of modules, and adhere to a consistent coding standard that promotes best practices in Vue.js development.

