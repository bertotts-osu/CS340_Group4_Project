# Project Backend

## Overview
This directory houses the backend of the application. The backend is built with **Spring Boot** and **Java** and compiled with **Maven**. The backend provides APIs to interact with the database and other services. Below, you'll find the steps to run the application in both development and production environments.

### Prerequisites
- Ensure you have **Java 17** installed. You can download it from [here](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).
- Ensure you have **Maven** installed. You can download it from [here](https://maven.apache.org/download.cgi).

## Development Setup
Follow these steps to get the backend running on a local machine for development:
- Install the dependencies and build the project
  - mvn clean install
- Run the application
  - mvn spring-boot:run

## Production Setup
Follow these steps to get the backend running on the production server:
- Generate the Production build (this will create a jar file in the target folder)
  - mvn clean package
- Run the generated jar file (nohup makes serves the file independent of your server session)
  - nohup java -jar target/<jar file name>.jar &
- Terminate the production session (for linux server)
    - pkill -u $(whoami) -f 'java'

## Citation
- Date: 12/09/2024
- Based on: The starting project structure was largely influenced by examples provided in the book, "Spring Start Here". Specific implementations of the controllers, models, etc. were all original but again based on topics covered in the book.
- Source URL: https://learning.oreilly.com/library/view/spring-start-here/9781617298691/