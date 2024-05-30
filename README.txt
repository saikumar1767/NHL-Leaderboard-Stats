## NHL API Documentation
This project aims to show details of teams in NHL and thier statistics using visualization(Highcharts).

This is a document to mention the list of features and to navigate one, how to install frontend and backend of the application and see the website.

### Features:

- The landing page has a summary table listings the details of each team, viz.,
  - Position of team across all seasons conducted so far.
  - Name of Team (Short Abbreviation)
  - No. of matches played
  - No. of Wins
  - No. of Losses
  - No. of Ties
  - No. of points secured.
- Default sort is done based on highest no. of points to lowest.
- The table has features at top-left as well as, when hovered over each row header of table displays:
  - column-wise sorting (Asc, Desc)
  - Filtering by values
  - Hiding the columns
  - Manage the columns
  - Download the data as CSV file format.
- Pagination of table is done with default with 10 records and can be increased, decreased based on the requirement and navigate to and fro using previous and next arrow buttons located at bottom right corner of the table.
- On click of any row, navigates user to show full details of selected team from the table.
- Inside this team statistics page, which has responsive content:
  - List of all details of selected team
  - On the right, there is a chart model, which has multiple chart types to be selected.
  - Chart types include:
    - Pie
    - Line
    - Bar
    - Column
    - Area
    - Scatter
- Used the localstorage feature, to store last opened chart type (On refresh displays the same last opened chart type).
- Finally, a back button to navigate to initial Summary table.


### Installation:

If node_modules folders aren't there or any version issues, please remove node_modules folders in both frontend and backend do the following.
(If no errors, try running both client and server directly).

Navigate to frontend folder:
- npm install
- npm start
Client starts running on port 3000.

Navigate to backend folder:
- npm install
- node server.js
Server starts running on port 3001.


 
