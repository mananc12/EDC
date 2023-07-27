## Running the "add_new_week" Project

### Prerequisites

* `Node.js and NPM (Node Package Manager):` You can download and install Node.js from the official website: https://nodejs.org/. NPM comes bundled with Node.js.
* `Nodemon:` Nodemon is a tool that automatically restarts your Node.js application when it detects changes in your code. You can install nodemon by running the following command:
  ```bash
  npm install -g nodemon
  ```
### Setup

1. `Download the Project Zip:` Click on the link provided to download the zip file of the "add_new_week" project.
2. `Extract the Zip:` After downloading the zip file, extract its contents to a location of your choice on your computer.
3. `Navigate to Project Directory:`
   ```bash
   cd /path/to/add_new_week
   ```
4. Using the terminal or command prompt, change your current working directory to the "backend" folder:

   ```bash
   cd /path/to/add_new_week/backend
   ```
4. `Install Backend Dependencies:` Next, install the backend dependencies by running the following command:
   ```bash   
   npm install
   ```
5. Using the terminal or command prompt, change your current working directory to the "frontend" folder:

   ```bash
   cd /path/to/add_new_week/frontend
   ```
6. `Install Frontend Dependencies:` Next, install the frontend dependencies by running the following command:
   ```bash   
   npm install
   ```

### Running the Backend Server

1. `Open a Terminal:` Open a new terminal or command prompt window.
2. `Navigate to the "backend" folder:` Change your current working directory to the "backend" folder inside the "add_new_week" project folder:

   ```bash
   cd /path/to/add_new_week/backend
   ```
3. `Start the Backend Server:` Run the following command to start the backend server:
   ```bash
   nodemon app.js
   ```

   The server should now be running on http://localhost:5000. Please keep the terminal running as long as you want the server to be active.

### Running the Frontend Application

1. `Open a New Terminal:` Open another terminal or command prompt window (keep the previous terminal with the backend server running).
2. `Navigate to the "frontend" folder:` Change your current working directory to the "frontend" folder inside the "add_new_week" project folder:

   ```bash
   cd /path/to/add_new_week/frontend
   ```
3. `Start the Frontend Application:` Run the following command to start the frontend application:
    ```bash   
   npm start
    ```

   The frontend application should now be running on http://localhost:3000 and will automatically open in your default web browser.

### Accessing the Application

   * Congratulations! The "add_new_week" project is now up and running. You can access the application by opening your web browser and visiting http://localhost:3000.

### Adding New Weeks

* Once the application is running, you can see a list of weeks displayed on the left side.

* Click on any week to view the modules and tasks associated with it on the right side.

1. To add a new week, click on the "Add new week" button at the top. A dropdown will appear.

2. Select the order ("Before" or "After") and the week you want to add the new week before or    after.

3. After making the selection, click on the "Create" button to add the new week.

### Stopping the Application

* To stop the application, you can press `Ctrl + C` in the terminals where the backend server and frontend application are running. Confirm with `Y` if prompted.
