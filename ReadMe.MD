# PropelMeAhead

PropelMeAhead is a web application for propel school management.

## User Stories

#### HomePage

- [ ] A user can regiter/login himself as a mentor or as a trainee
- [ ] User will need to fill up a registration form in order to register himself to the app
- [ ] User can login to the app using their email and password
- [ ] User can logout from the app at any time

#### Mentor

- [ ] A mentor can send a task to a perticular trainee or a group of trainees
- [ ] A mentor can assign a time limit for each task
- [ ] A mentor can check progress report of a trainee at any time
- [ ] A mentor can send notification regarding task to any trainee
- [ ] A mentor can manage a trainee

#### Trainee

- [ ] A trainee will have three kinds of list: list of "Assigned Tasks", list of "Doing Tasks" and list of "Completed/Reviewd Tasks"
- [ ] A trainee will have a due date of every task assigned to him
- [ ] A trainee will get notification from mentor if due date exceeded.
- [ ] At any point in time, a trainee can change the status of a task based on his work on that task
- [ ] A trainee can check his progress.

## Api docs

#### Login

##### /api/users/login POST

- | Field    | Required |   Type |
  | :------- | -------: | -----: |
  | email    |      Yes | string |
  | password |      Yes | string |

- res

  - ```json
    {
        "success" : true,
        "token" : "Bearer <JWTtoken>"
    }

    or

    {
        "errors" : "errors"
    }
    ```

#### Register

##### /api/users/register POST

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | name      |      Yes | string |
  | userType  |      Yes | string |
  | email     |      Yes | string |
  | password  |      Yes | string |
  | password2 |      Yes | string |

- res

  - ```json
    {
        userObject
    }

    or

    {
        "errors" : "errors"
    }
    ```

#### Get Tasks

##### /api/tasks GET

- res
  - ```json
    {
      taskObjects,
      errorMsg
    }
    ```

#### Add Tasks

##### /api/tasks/add POST

- | Field   | Required |   Type |
  | :------ | -------: | -----: |
  | task    |      Yes | string |
  | dueDate |      Yes |   date |

- res
  - ```json
    {
      taskObject,
      errorMsg
    }
    ```

#### Edit Tasks

##### /api/tasks/edit/:id PUT

- | Field   | Required |   Type |
  | :------ | -------: | -----: |
  | task    |      Yes | string |
  | dueDate |      Yes |   date |

- res
  - ```json
    {
      taskObject
    }
    ```

#### Delete Tasks

##### /api/tasks/delete/:id DELETE

- res
  - ```json
    {
      "msg": "deleted"
    }
    ```

#### Get Tasks of a trainee

##### /api/userTasks/:id GET

- res
  - ```json
    {
      taskObjects,
      errorMsg
    }
    ```

#### Get Trainees

##### /api/userTasks/users/trainee GET

- res
  - ```json
    {
      traineeObjects,
      errorMsg
    }
    ```

#### Get Mentors

##### /api/userTasks/users/mentor GET

- res
  - ```json
    {
      mentorObjects,
      errorMsg
    }
    ```

#### Assign Task to a trainee

##### /api/userTasks/task/assign PUT

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | taskId    |      Yes | string |
  | traineeId |      Yes | string |

- res
  - ```json
    {
      traineeObject,
      errorMsg
    }
    ```

#### Assign Task to a trainee by self

##### /api/userTasks/task/assignme PUT

- | Field   | Required |   Type |
  | :------ | -------: | -----: |
  | task    |      Yes | string |
  | dueDate |      Yes |   date |

- res
  - ```json
    {
      traineeObject,
      errorMsg
    }
    ```

#### Update trainee's Task status (CWO, NYS, COM)

##### /api/userTasks/task/update PUT

- | Field  | Required |   Type |
  | :----- | -------: | -----: |
  | taskId |      Yes | string |
  | status |      Yes | string |

- res
  - ```json
    {
      traineeObject,
      errorMsg
    }
    ```

#### Delete trainee Task

##### /api/userTasks/delete/:id PUT

- res
  - ```json
    {
      traineeObject
    }
    ```
