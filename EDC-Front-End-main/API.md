# EDC Project Req Payload and Response

### Signup

```
End-point:http://localhost:9000/users/signup
Method: post
Payload:
{
   "firstName": "Himanshu",
   "lastName": "Jain",
   "password": "12345678",
   "email": "himanshujain044@gmail.com",
   "phoneNumber": "8964969972"
}


Response:
If Success
{
   "message": "Check your mail to verify OTP",
   "status": 200
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}


{
   "message": "Already user exits with this email",
   "status": 400
}
etc.
```

### Login

```
End-point:http://localhost:9000/users/login
Method: post
Payload:
{
   "password": "12345",
   "email": "himanshujain044@gmail.com",
   "rememberMe": true
}


Response:
If Success
{
   "message": "User login successfully !",
   "data": {
       "email": "himanshujain044@gmail.com",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpbWFuc2h1amFpbjA0NEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJIaW1hbnNodSIsImxhc3ROYW1lIjoiSmFpbiIsInBob25lTnVtYmVyIjoiODY0OTY5OTcyOSIsImlhdCI6MTY4MjQyNjQyMCwiZXhwIjoxNjgzMDMxMjIwfQ.SFz7G-K4wWaTFEhCyUEpnKf6JCyHeFytLPIXvjEYrNw",
       "firstName": "Himanshu",
       "lastName": "Jain",
       "phoneNumber": "8649699729"
   }
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}


{
   "message": "Please enter the correct credentials",
   "status": 400
}
etc.
Verify Mail OTP
Resend Or Forgot Password
Set New Paswword
```

### Logout

```
End-point:http://localhost:9000/users/logout
Method: GET
Auth token in header
Response:
If Success
{
   "message": "Logout successful"
}
If Error
User Startup Details(only admin can access this)
End-point:http://localhost:9000/users/startup-details
Method: post
Payload:
{
   "name": "Himanshu",
   "email": "himanshujain044@gmail.com",
   "contact": "8964969972",
   "location": "parual university",
   "institute": "Govind Ji Engineering College",
   "otherInstitute": "rt",
   "aadhar": "",
   "category": "ABG",
   "categoryOther": "tyu",
   "otherUniversity": "uytut",
   "otherOrganisation": "uty",
   "designation": "Proffessor",
   "enrollmentNum": "",
   "teamSize": "5",
   "teamMembers": "himanshu jain, nitin, sumit",
   "title": "Agriculture Harbicide",
   "uniqueFeatures": "auto spray",
   "currentStage": "565"
}


Response:
If Success
{
   "message": "Your application has been submitted successfully !",
   "status": 200
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}


{
   "error": "No User Found !"
}
Etc

```

### Get All Startup Data(only admin can access this)

```
End-point:http://localhost:9000/admin/all-startup-details?filters=Parul University,AUT University if applicabke
Method: GET
Auth token in header
Payload:
{
   "name": "Himanshu",
   "email": "himanshujain044@gmail.com",
   "contact": "8964969972",
   "location": "parual university",
   "institute": "Govind Ji Engineering College",
   "otherInstitute": "rt",
   "aadhar": "",
   "category": "ABG",
   "categoryOther": "tyu",
   "otherUniversity": "uytut",
   "otherOrganisation": "uty",
   "designation": "Proffessor",
   "enrollmentNum": "",
   "teamSize": "5",
   "teamMembers": "himanshu jain, nitin, sumit",
   "title": "Agriculture Harbicide",
   "uniqueFeatures": "auto spray",
   "currentStage": "565"
}


Response:
If Success
{
   "message": "Fetched the data successfully",
   "data": [
       {
           "name": "Himanshu",
           "email": "himanshujain044@gmail.com",
           "contact": "8649699729",
           "location": "Parul University",
           "institute": "Parul Institute of Ayurveda and Research",
           "otherInstitute": "",
           "aadhar": "",
           "category": "Parul University Student",
           "categoryOther": "",
           "otherUniversity": "",
           "otherOrganisation": "",
           "designation": "",
           "enrollmentNum": "123456789",
           "teamSize": "",
           "teamMembers": "team",
           "title": "tram",
           "uniqueFeatures": "team",
           "currentStage": "Idea",
           "startupId": "PaPatr961207",
           "status": "pending",
           "branch": "PA"
       }
   ]
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}


{
   "error": "No User Found !"
}
Etc..
```

### Update Startup details(only admin can access this)

```
End-point:http://localhost:9000/admin/update-startup-details
Method: PATCH
Auth token in header
Payload:
{
   "startupId": "PaPatr961207",
   "status": "verified"
}


Response:
If Success
{
   "message": "Startup has been updated successfully !"
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}
{
   "message": "Please enter the correct statuId",
   "status": 400
}
Etc..
```

### create admin (only admin can access this)

```
End-point:http://localhost:9000/admin/create-admin
Method: POST
Auth token in the header
Payload:
{
    "firstName": "Admin",
   "lastName": "Three",
   "password": "H1234567j@",
   "email": "admin3@gmail.com",
   "phoneNumber": "8964960972",
   "branch": [
       "Rajkot Startup Studio",
       "Surat Startup Studio"
   ]
}


Response:
If Success
{
   "message": "Admin has created successfully !"
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}

```

### Delete admin (only admin can access this)

```
End-point:http://localhost:9000/admin/delete-admin?email=admin3@gmail.com
Method: GET
Auth token in the header


Response:
If Success
{
   "message": "Admin has deleted successfully !"
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}
Get all admin (only admin can access this)
End-point:http://localhost:9000/admin/get-all-admin
Method: GET
Auth token in the header


Response:
If Success
{
   "message": "fetched all the admin successfully !",
   "count": 1,
   "data": [
       {
           "_id": "644f46f074a7de4b801b30e5",
           "firstName": "Admin",
           "lastName": "Three",
           "email": "admin3@gmail.com",
           "phoneNumber": "8964960972",
           "password": "$2a$10$ZXWnpPFkDnbCDq5GD76jHujV0C5jhGAuZxWIuBFbPAWA4wt8nDXyG",
           "otpVerified": true,
           "isForgotPassword": false,
           "role": "admin",
           "branch": [
               "Rajkot Startup Studio",
               "Surat Startup Studio"
           ],
           "__v": 0
       }
   ]
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}

```

### Schedule meeting (only admin can access this)

```
End-point:http://localhost:9000/admin/schedule-event-meeting
Method: POST
Auth token in the header
Payload:
{
   "title": "Test",
   "members": [
       "himanshu@gmail.com",
       "amna@gmail.com"
   ],
   "type": "meeting",
   "link": "https://link",
   "dateAndTime": "Fri Jun 17 2022 10:54:59 GMT+0100"
}




Response:
If Success
{
   "message": "Meeting scheduled successfully !"
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}
```

### Schedule event (only admin can access this)

```
End-point:http://localhost:9000/admin/schedule-event-meeting
Method: POST
Auth token in the header
Payload:
{
   "title": "Fun Activity",
   "filters": [
       {
           "branch": "PA"
       },
       {
           "title": "test.."
       }
   ],
   "type": "event",
   "link": "https://link",
   "dateAndTime": "Fri Jun 17 2022 10:54:59 GMT+0100"
}






Response:
If Success
{
   "message": "Event scheduled successfully !"
}
If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}
```

### Get the Last 30 days' startups (only admin can access this)

```
End-point:http://localhost:9000/admin/get-lastmonth-startups?days=7
Method: GET
Auth token in the header






Response:
{
   "message": "fetched last 30 days startups successfully !",
   "count": 1,
   "data": [
       {
           "_id": "6452396a2a799b7035cf1b70",
           "name": "Himanshu",
           "email": "himanshujain044@gmail.com",
           "contact": "8964969972",
           "location": "parual university",
           "institute": "Govind Ji Engineering College",
           "otherInstitute": "rt",
           "aadhar": "",
           "category": "ABG",
           "categoryOther": "tyu",
           "otherUniversity": "uytut",
           "otherOrganisation": "uty",
           "designation": "Proffessor",
           "enrollmentNum": "",
           "teamSize": "5",
           "teamMembers": "himanshu jain, nitin, sumit",
           "title": "Agriculture Harbicide",
           "uniqueFeatures": "auto spray",
           "currentStage": "565",
           "startupId": "paABAg299550",
           "status": "pending",
           "createdAt": "2023-05-03T10:37:30.054Z",
           "updatedAt": "2023-05-03T10:37:30.054Z",
           "__v": 0
       }
   ]
}


If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}
```

### Get all the meeting and events data (only the admin can access this)

```
End-point:http://locaalhost:9000/admin/get-all-meeting-and-events
Method: GET
Auth token in the header

Response:
{
   "message": "All the events and meeting are fetched successfully ",
   "meetingCount": 2,
   "eventCount": 1,
   "meetings": [
       {
           "title": "true",
           "link": "https://link",
           "members": [
               "himanshu@gmail.com",
               "amna@gmail.com"
           ],
           "dateAndTime": "2022-06-17T09:54:59.000Z",
           "type": "meeting",
           "filters": []
       },
       {
           "title": "true",
           "link": "https://link",
           "members": [
               "himanshu@gmail.com",
               "amna@gmail.com"
           ],
           "dateAndTime": "2022-06-17T09:54:59.000Z",
           "type": "meeting",
           "filters": []
       }
   ],
   "events": [
       {
           "title": "Fun Activity",
           "link": "https://link",
           "members": [
               "aspp775@gmail.com",
               "guptashrestha7@gmail.com",
               "xeyeham833@larland.com",
               "the.shubham045@gmail.com",
               "haxon98536@jobbrett.com"
           ],
           "dateAndTime": "2022-06-17T09:54:59.000Z",
           "type": "event",
           "filters": [
               {
                   "branch": "PA"
               },
               {
                   "title": "test.."
               }
           ]
       }
   ]
}


If Error
{
   "message": "Invalid parameters sent",
   "status": 400
}
```
