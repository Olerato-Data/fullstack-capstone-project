# GiftLink-Capstone-Full-Stack-MongoDB-JS-React-REST-API
Written by Brian McCarthy

## Certification
**Capstone Project for IBM Full-Stack JavaScript Developer Certification**
[View Accomplishment](https://www.coursera.org/account/accomplishments/specialization/TCMT9VQG11D0)

### 12 Course Certificates Completed
* Introduction to Software Engineering
* Introduction to HTML, CSS, & JavaScript
* Getting Started with Git and GitHub
* JavaScript Programming Essentials
* Developing Front-End Apps with React
* Developing Back-End Apps with Node.js and Express
* Get Started with Cloud Native, DevOps, Agile, and NoSQL
* Introduction to Containers w/ Docker, Kubernetes & OpenShift
* Application Development using Microservices and Serverless
* Node.js & MongoDB: Developing Back-end Database Applications
* JavaScript Full Stack Capstone Project
* Software Developer Career Guide and Interview Preparation

### Skills Gained
Ajax, Application Deployment, Azure DevOps, CI/CD, Cloud Deployment, Cloud-Native Computing, Database Design, Git (Version Control System), Istio, JavaScript, Kubernetes, Node.JS

## Introduction
GiftLink is a full-stack web application designed to connect users who want to give away household items they no longer needed with users who preferred to recycle or find free items instead of purchasing new ones. This project promotes sustainability and community sharing.

## Capstone Project Summary
In the capstone project, you developed a full-stack web application called GiftLink that connected users who wanted to give away household items they no longer needed with users who preferred to recycle or find free items instead of purchasing new ones.

You modeled data using a NoSQL database (MongoDB), implemented secure user authentication with JSON Web Tokens (JWTs), and developed key features such as item listings, search functionality, detailed item views, comments, and editable user profiles. The backend was built with Node.js and Express, while the frontend used React components that interacted with your APIs.

You containerized the application using Docker and prepared it for deployment. Throughout the project, you applied Agile and DevOps practices, including version control with Git and GitHub, and compiled your implementation and documentation into markdown files stored in a dedicated GitHub repository for the project. You modeled data using a NoSQL database (MongoDB), implemented user authentication with secure login and registration flows, and developed features for item listings, search, and reviews with concurrency-safe operations.

The frontend was provided as React components and integrated with your back-end services, which were developed using Node.js and Express. The application exposed REST APIs, was containerized with Docker, and prepared for deployment alongside the provided frontend. Throughout the project, you also applied Agile and DevOps practices, including Git and GitHub version control.

As part of the project's various assignments, you compiled your implementation and documentation into markdown files and uploaded them to a dedicated GitHub repository for this project.

## Technologies
- **Frontend**: React, Tailwind CSS, Lucide-React
- **Backend**: Node.js, Express
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens), BCrypt.js
- **Logging**: Pino, Pino-HTTP

## Languages
- JavaScript (ESM)
- HTML
- CSS (Tailwind)

## Features
- User Registration and Login
- Gift Listings (Add, View, List)
- Advanced Search (Name, Category, Condition, Age)
- User Profile Management
- Sentiment Analysis for Reviews

## File Structure
- `/src`: Frontend React components and context
- `/server`: Backend Express server routes, and database configuration
- `/server/routes`: API endpoints for gifts, authentication, and search
- `/server/db.js`: MongoDB connection logic
- `app.js`: Express application setup and middleware
- `index.js`: Main entry point for the server
- `package.json`: Project dependencies and scripts
