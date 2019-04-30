# PropelMeAhead

PropelMeAhead is a online platform for propel school.

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
  - ````json
    {
        "success" : true,
        "token" : "Bearer <JWTtoken>"
    }
    ```json
    or
    ```json
    {
        "errors" : "errors"
    }
    ````

##### /api/users/register POST

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | name      |      Yes | string |
  | userType  |      Yes | string |
  | email     |      Yes | string |
  | password  |      Yes | string |
  | password2 |      Yes | string |

- res
  - ````json
    {
        userObject
    }
    ```json
    or
    ```json
    {
        "errors" : "errors"
    }
    ````

##### /api/tasks GET

- res
  - ```json
    [{ taskObjects }]
    ```

##### /api/tasks/add POST

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | task      |      Yes | string |
  | createdBy |      Yes | string |
  | dueDate   |      Yes |   date |

- res
  - ```json
    {
      taskObject
    }
    ```

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

##### /api/tasks/:id DELETE

- res
  - ```json
    {
      "msg": "deleted"
    }
    ```

##### /api/userTasks GET

- | Field | Required |   Type |
  | :---- | -------: | -----: |
  | id    |      Yes | string |

- res
  - ```json
    [{ taskObjects }]
    ```

##### /api/userTasks/trainee GET

- | Field    | Required |   Type |
  | :------- | -------: | -----: |
  | userType |      Yes | string |

- res
  - ```json
    [{ traineeObjects }]
    ```

##### /api/userTasks/mentor GET

- | Field    | Required |   Type |
  | :------- | -------: | -----: |
  | userType |      Yes | string |

- res
  - ```json
    [{ mentorObjects }]
    ```

##### /api/userTasks/assign PUT

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | taskId    |      Yes | string |
  | mentorId  |      Yes | string |
  | traineeId |      Yes | string |

- res
  - ```json
    {
      traineeObject
    }
    ```

##### /api/userTasks/update PUT

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | taskId    |      Yes | string |
  | status    |      Yes | string |
  | traineeId |      Yes | string |

- res
  - ```json
    {
      traineeObject
    }
    ```

##### /api/userTasks/delete PUT

- | Field     | Required |   Type |
  | :-------- | -------: | -----: |
  | taskId    |      Yes | string |
  | traineeId |      Yes | string |

- res
  - ```json
    {
      traineeObject
    }
    ```
