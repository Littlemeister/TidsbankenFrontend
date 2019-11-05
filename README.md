# Tidsbanken frontend


## Plan

### Endpoints/views


| Endpoint           | Description   |
| ------------------ | ------------- |
| /                  | Content Cell  |
| /login             | Content Cell  |
| /2fa               | Content Cell  |
| /dashboard         | Content Cell  |
| /user/:id          | Content Cell  |
| /user/:id/history  | Content Cell  |
| /admin             | Content Cell  |



### Components per endpoint/view
| Component     | View           | Description |
| ------------- | -------------- | ----------- |
| Header        | All views      | Header contains links. If logged in: User profile, Logout button, Dashboard, notification dropdown list. If logged in and admin: logged in content + Admin area.  |
| Footer        | All views      | Containts copyright information, or links or both. |
| Calendar      | /dashboard     | The main calendar with overview and links to all request. |
| Modal | Any view | Displays child components as content |
| CreateVacationRequest | /dashboard | Shows form to create vacation request. |
| CreateIneligiblePeriod | /dashboard | Modal to create a new ineligble period. |
| LoginForm     | /login         | Contains loginform. |
| UserProfile   | /user/:id      | Lists users information.  |
| ChangeUserProfile | /user/:id | Changes users information. |
| CreateUserForm    | /admin      | Form to create a user, including if admin or not. |
| UpdateUserForm     | /admin      | Form to update user info, including if admin or not. |
| UserList | /admin | Lists all users. |
| VacationSettings | /admin | Settings for max period of vacation days. |
| ImportExportData | /admin | Component for importing / exporting data as JSON. |
|2FAForm| /2fa | Component for sending 2fa |


### Some Views and Components structure

#### Views
    - Login
    - Dashboard
    - Requests (If allowed to deviate from requirements, then maybe not)
    - User
    - Admin


#### Components
    - Common
        - Header
        - Footer
        - Modal
    - Calendar
        - Calendar
        - ...
    - Requests
        - CreateVacationRequest
    - Admin
        - CreateIneligiblePeriod
        - UserList
        - VacationSettings
        - Data
            - Import
            - Export
    - User
        - UserProfile
    - Auth
        - LoginForm
        - Logout
