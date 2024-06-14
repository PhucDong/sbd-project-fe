# SBD Project
Latest update: **14 June 2024**

## Bugs
- Modify form can't get the selected row's data
  - Solution: pass **params.row** as a value to set a row's state.
- How to hide horizontal scrolling when the drawer opens or expands
  - Solution: adjust the width of the main content on the right column to the width of the side menu.
- The Data Grid shows a div with **MuiDataGrid-filler** class
  - Solution: set **autoHeight** prop to the Data Grid component and set height to auto to its Box wrapper component

## Future features
- Nest a pop-up delete alert modal for the Modify form