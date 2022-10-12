# wad2-eventhive-backend API Documentation

## Base API URL
https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/  

## User Related APIs

###### Register user
**POST: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users/register**  
**Send:** Object with userName (string), userPassword (string), userAge (int), userGender (string), userEmail (string) 

###### Sign-in (Normal)
**POST: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users/signin**  
**Send:** Object with userEmail (string), userPassword (string)  
**Receive:**  
User not found: "Register"  
Password incorrect: "Incorrect password"    
Correct login: userObject with all fields

###### Sign-in (Google)
**POST: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users/g-signin**  
**Send:** Object with userEmail (string)  
**Receive:**  
User not found: "Register"  
User found: userObject with all fields

###### Retrieve all users
**GET: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users**  
**Send:** Nothing  
**Receive:** List of userObjects

###### Update registeredEvents
**POST: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users/update/registered**  
**Send:** Object with userEmail (string), **new** registeredEvents (list)

###### Update createdEvents
**POST: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users/update/created**  
**Send:** Object with userEmail (string), **new** createdEvents (list)

###### Update user categoryPrefs
**POST: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/users/update/prefs**  
**Send:** Object with userEmail (string), **new** categoryPrefs (list)

## Location API
###### Search for location
**GET: https://us-central1-wad2-eventhive-backend-d0f2c.cloudfunctions.net/app/api/locations/:query**  
**Send:** query (string eg. plaza+singapura)  
**Receive:** Object with {found, totalNumPages, pageNum, results (list of results)}






