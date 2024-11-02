# Hotel Survey Management System

A web application developed for "Asociación de Hoteles y Moteles de Tepic" to manage and evaluate compliance with Mexican Standard 035 (NOM-035-STPS-2018).

## Overview

This system allows hotel administrators to:

- Manage employee records
- Send and track employee surveys via SMS or direct links 
- Generate compliance reports and statistics
- Add multiple administrator accounts
- Monitor survey completion status
- View detailed analytics and results

## Features

- **Employee Management**: Add, edit and remove employee records
- **Survey Distribution**: Send surveys via SMS or shareable links
- **Multi-Admin Support**: Create and manage multiple administrator accounts
- **Real-time Analytics**: View survey completion rates and compliance metrics
- **Reporting**: Generate detailed reports on NOM-035 compliance
- **Access Control**: Role-based permissions system

## Technology Stack

- **Backend**
  - Node.js
  - Express.js
  - MySQL
  - Morgan (HTTP request logger)
  - Passport.js (Authentication)
  - Express Session
  - Express MySQL Session
  - Express Handlebars
  - Connect Flash (Flash messages)
  - Bcryptjs (Password hashing)
  - Timeago.js (Time formatting)

- **Frontend** 
  - Handlebars
  - Bootstrap
  - JavaScript
  - CSS

- **External Services**
  - Twilio (SMS)
  - Digital Ocean (Hosting)

## Project Structure

The application files are organized in the `/src` folder:

## Mexican 035 oficial docs
Mexican 035 standard oficial docs https://www.dof.gob.mx/nota_detalle.php?codigo=5541828&fecha=23/10/2018#gsc.tab=0