// MONGO DB QUERIES - Restaurants collection
//1 - Display all documents
db.restaurants.find()

//2 - Display the restaurant_id, name, borough, and cuisine for all documents
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 })

//3 - Display the restaurant_id, name, borough, and cuisine, but exclude the _id field for all documents
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id : 0})

//4 - Display restaurant_id, name, borough, and zip code, but exclude the _id field for all documents
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1, _id : 0})

//5 - Show all the restaurants that are in the Bronx
db.restaurants.find({borough: "Bronx"})

//6 - Show the first 5 restaurants that are in the Bronx
db.restaurants.find({borough: "Bronx"}).limit(5)

//7 - Show next 5 restaurants after skipping the first 5 in the Bronx
db.restaurants.find({borough: "Bronx"}).skip(5).limit(5)

//8 - Find the restaurants that have a score of more than 90
db.restaurants.find({"grades.score" : {$gt : 90}})

//9 - Find restaurants that have a score of more than 80 but less than 100
db.restaurants.find({"grades.score" : {$gt : 80, $lt: 100}})

//10 - Find restaurants that are located at a latitude value less than -95.754168
db.restaurants.find({"address.coord.0" : {$lt : -95.754168}})

//11 - Find restaurants that do not serve any "American" cuisine and have a rating greater than 70 and longitude less than -65.754168
// db.restaurants.find({cuisine : {$ne : "American"}}) 
db.restaurants.find({$and: [{cuisine: {$not : /^American/}}, {"grades.score" : {"$gt" : 70}} , {"address.coord.1" : {$lt : -65.754168}}]})

//12 - Find the restaurants that do not prepare any "American" cuisine and got a marker more than 70 and located in the longitude less than -65.754168. Note : Do this query without using the $and operator
db.restaurants.find({cuisine: {$not : /^American/}, "grades.score" : {"$gt" : 70}, "address.coord.1" : {$lt : -65.754168}})

//13 - Find restaurants that do not serve any "American" cuisine and received an "A" grade point not belonging to Brooklyn. The document should be displayed according to cuisine in descending order
db.restaurants.find({cuisine: {$not : /^American/}, "grades.grade" : "A", borough : {$ne :"Brooklyn"}}).sort({cusiine: -1})

//14 - Find the restaurant_id, name, borough and cuisine for those restaurants that contain "Wil" as the first three letters in their name
db.restaurants.find({name: /^Wil/i}, {restaurant_id : 1, name : 1, borough : 1, cuisine : 1})

//15 - Find the restaurant_id, name, borough and cuisine for those restaurants that contain "ces" as the last three letters in their name
db.restaurants.find({name: /ces$/}, {restaurant_id : 1, name : 1, borough : 1, cuisine : 1})

//16 - Find the restaurant_id, name, borough and cuisine for those restaurants that contain "Reg" as three letters somewhere in their name
db.restaurants.find({name: /Reg/i}, {restaurant_id : 1, name : 1, borough : 1, cuisine : 1})

//17 - Find the restaurants that belong to the Bronx and prepared any American or Chinese dishes
db.restaurants.find({borough : "Bronx", cuisine: { $in: [/^American/, "Chinese"]}})

//18 - Find the restaurant_id, name, borough and cuisine for those restaurants that belong to Staten Island or Queens or Bronx or Brooklyn
db.restaurants.find({borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}}, {restaurant_id : 1, name : 1, borough : 1, cuisine : 1})

//19 - Find the restaurant_id, name, borough and cuisine for restaurants outside Staten Island or Queens or Bronx or Brooklyn
db.restaurants.find({borough: {$nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}}, {restaurant_id : 1, name : 1, borough : 1, cuisine : 1})

//20 - Find the restaurant_id, name, borough and cuisine for restaurants that get a score that"s no more than 10
db.restaurants.find({"grades.score" : {$lte : 10}}, {restaurant_id : 1, name : 1, borough : 1, cuisine : 1})

//22 - Find the restaurant_id, name, and stands for those restaurants that achieve an "A" grade and an 11 score in ISODate study data "2014-08-11T00:00:00Z"
db.restaurants.find({grades: {$elemMatch: {grade : "A", score : 11, date : ISODate("2014-08-11T00:00:00Z")}}}, {restaurant_id : 1, name : 1, grades : 1})

//23 - Find the restaurant_id, name and grades for those restaurants where the 2nd grade variety item contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z"
db.restaurants.find({"grades.1.grade" : "A", "grades.1.score" : 9, "grades.1.date" : ISODate("2014-08-11T00:00:00Z")}, {restaurant_id : 1, name : 1, grades : 1})

//24 - Find the restaurant_id, name, address, and geographic location for restaurants where the second element of the array coord contains a value that is greater than 42 and up to 52
db.restaurants.find({"address.coord.1" : {$gt : 42, $lte : 52}}, {restaurant_id : 1, name : 1, address : 1, borough : 1})

//25 - Organize your restaurant name in ascending order along with all columns
db.restaurants.find().sort({name : 1})

//26 - Organize your restaurant name in descending order along with all columns
db.restaurants.find().sort({name : -1})

//27 - Organize the name of the cuisine in ascending order and by the district itself in descending order
db.restaurants.find().sort({cuisine : 1, borough : -1})

//28 - Find out all directions that don't contain the street
db.restaurants.find({"address.street" : {$exists : false}})
db.restaurants.find({"address.street" : null})

//29 - Select all documents in the collection of restaurants where the value of the coord field is Double
db.restaurants.find({"address.coord":{$type: "double"}})
