
# Admin UI

This project is made with React and Material UI. [tejas-kanji-admin-ui.netlify.app/](https://tejas-kanji-admin-ui.netlify.app/)


## Run

To Run, Go to frontend directory. Then install npm packages and do npm start
Refer to below steps on Windows terminal/Linux

```bash
cd frontend
npm install
npm start
```

Then simply open application on localhost:<Port> i.e. [http://localhost:3000/](http://localhost:3000/)

Note: You need npm installed in order to run application


## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run test`

Will run the test cases from available test suites

Test suites are stored in **/frontend/src/__test__/\***


## Mobile Responsiveness

The UI itself is ready with mobile first view. The Table Actions Area will adapt to different viewport (window) width.

The Table View: I decided to make it scrollable horizontaly, since, stacking the content one on another looked pretty ugly.


## Requirements

The requirements of the project are available here [geektrust](https://www.geektrust.com/coding/detailed/admin-ui).

These are the requirements :

- Column titles must stand out from the entries.
- There should be a search bar that can filter on any property.
- You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
- You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.
- You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
- Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows.

 ## Users API
We provide you an Users API to list all the users and their properties.


## Note :
The users are sorted by `id` field. There is no alphabetical sorting.

## Request Type :
GET

## Endpoint :
[https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json](https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json)

## GitHub:

[LordTejas/Admin UI](https://github.com/LordTejas/Admin-UI)