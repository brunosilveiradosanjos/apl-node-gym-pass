# App

GymPass style app


## FRs (Functional Requirements)
- [x]  It should be possible to register
- [x]  It should be possible to authenticate
- [x]  It should be possible to obtain the profile of a logged-in user
- [x]  It should be possible to get the number of check-ins made by the logged-in user
- [x]  It should be possible for the user to get their check-in history
- [x]  It should be possible for the user to search for nearby gyms
- [x]  It should be possible for the user to search for gyms by name
- [x]  It should be possible for the user to check-in at a gym
- [x]  It should be possible to validate a user's check-in
- [x]  It should be possible to register a gym


## BRs (Business Rules)
- [x] A user should not be able to register with a duplicate email
- [x] A user cannot perform two check-ins on the same day
- [x] A user cannot check-in if they are not close (100m) to the gym
- [x] Check-ins can only be validated up to 20 minutes after being created
- [x] Check-ins can only be validated by administrators
- [x] Gyms can only be registered by administrators


## NFRs (Non-functional Requirements)
- [x] The user's password needs to be encrypted
- [x] The application data needs to be stored in a PostgreSQL database
- [x] All data lists need to be paginated with 20 items per page
- [x] The user must be identified by a JWT
