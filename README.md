# App

GymPass style app

## FRs (Functional Requirements)

- [x] It should be possible to register
- [x] It should be possible to autenticate
- [x] It should be possible to get a logged user profile
- [x] It should be possible to get logged users check-ins
- [x] It should be possible to get users check-ins history
- [x] It should be possible to search users nearby gyms (up until 10km)
- [x] It should be possible to search gyms by name
- [x] It should be possible for the user to check in at a gym
- [x] It should be possible to validate a user's check-in
- [x] It should be possible to register a gym

## BRs (Business Rules)

- [x] The user should not be able to register with a duplicate email
- [x] The user cannot check in twice on the same day
- [x] The user cannot check in if he/she is not close (100m) to the gym
- [x] The check-in can only be validated up to 20 minutes after it is created
- [ ] The check-in can only be validated by administrators
- [ ] The check-in can only be registered by administrators

## NFRs (Non-functional requirements)

- [x] The user's password must be encrypted
- [x] The application data must be persisted in a PostgreSQL database
- [x] All data lists must be paginated with 20 items per page
- [ ] The user must be identified by a JWT
