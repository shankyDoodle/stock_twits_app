# StockTwits App

A small web app which fetches Stock symbol related twits using StockTwit API and displays them as a list.
This app is hosted on AWS.

### Demo
http://3.12.102.7:3008/

### Technical Description
* React Redux for frontend
* Node express server for back end  
* Ant Design UI library for some UI components.
* Stock twit API methods from https://api.stocktwits.com/developers/docs/api

### Usability and Status
1. Symbol Selection
    - User can select a symbol from dropdown. Multi-selection is possible.
    - User can select max 10 symbols from this dropdown.
    - If user wants to select such a Symbol which is not present in dropdown then just type the symbol name and hit 'Enter' key. 
      On 'Enter' key press a new symbol will be added to dropdown and data will be fetched accordingly. 
    - Count of twits related to each symbol is shown at left top corner of selected symbol tag view.
    - To remove symbol click 'X' icon on selected symbol tag.  
    - Remove all symbols operation is also supported. Hover on selected symbol list, and to the extreme right of the list, 'remove all' icon is present.
    
2. List View
    - Symbol related max 30 twits are shown in this list
    - Each list item shows corresponding symbol and the message.
    - List has auto-load feature. An API call is made to fetch updated data after every 5 seconds. 
      And if data has any changes then list is updated accordingly.
    - Small notification bar is shows every time when list gets updated to notify user.
    - List view has loading spinner while waiting for server response.
    - Page is responsive