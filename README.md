# SBD Project
Latest update: **11 July 2024**
Latest update: **5 July 2024**

## Project Description
The project acts as an admin dashboard to manage device access of all employess to a building, and their accounts.

## Technologies
- Frontend: ReactJS, JavaScript, Material UI, Figma

## Testing
- AccessPermission page: The pagination feature of all Data Grid components (done)

## Bugs
- Modify form can't get the selected row's data
  - Solution: pass **params.row** as a value to set a row's state.
- How to hide horizontal scrolling when the drawer opens or expands
  - Solution: adjust the width of the main content on the right column to the width of the side menu.
- The Data Grid shows a div with **MuiDataGrid-filler** class
  - Solution: set **autoHeight** prop to the Data Grid component and set height to auto to its Box wrapper component.
- In AccessPermission page, the table on the right of the Transfer List doesn't render each door shift that associates with each door
  - Solution: changed the fields that match the columns of Data Grid.
- Can't update day time frames properly

## Future Features
- Nest a pop-up delete alert modal for the Modify form
- How to render door shift in each separate Door column (done)
- In DayTimeFrame page, can delete all checked time frames at once
- In all Data Grid components, change background color of selected rows
- Persist data on current page when switching between sidemenu items
- In Transfer List of AccessPermission page, add filter feature for all tables
- Delete all selected day time frames at the same time