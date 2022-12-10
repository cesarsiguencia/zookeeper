const fs = require('fs');
const path = require('path'); //

const { animals } = require('./data/animals');

const express = require('express'); 
const { redirect } = require('statuses');


const PORT = process.env.PORT || 3001; // heroku server or 3001 localhost

const app = express(); //we can now chain app to routes and methods

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }))
// parse incoming JSON data
app.use(express.json());

// this middleware method is a calls all the files under the directory in public to be used, that way, we don't have to be making routes for the css, js, images, and other http links. Everything under the 'public' directory can now be accessed without having a specific server endpoint by instructing the server to make all these files static resources. 
app.use(express.static('public'));

// FOR API THAT GIVE BACK JUST PLAIN OBJECTS WITH STRINGS
// function filterByQuery(query,animalsArray){
//     let filteredResults = animalsArray;
//     if (query.diet) {
//       filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
//     }
//     if (query.species) {
//       filteredResults = filteredResults.filter(animal => animal.species === query.species);
//     }
//     if (query.name) {
//       filteredResults = filteredResults.filter(animal => animal.name === query.name);
//     }
//     return filteredResults;
// }

// FOR API THAT GIVE BACK RESULTS WITH STRINGS IN ARRAYS

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

function findById(id, animalsArray){
  const result = animalsArray.filter(animal => animal.id === id)[0]
  return result
}

function createNewAnimal(body, animalsArray){//BODY IS THE ONE ANIMAL, ANIMALS ARRAY IS ITSELF
  console.log(body, "SHOULD STILL BEE JUST LARRY");
  const animal = body; //TIED TO A NEW VARIABLE
  animalsArray.push(animal);
  // fs is needed because although we might be able to push our new animal into the array, it's not copying into the actual JSON file, we need to added it to the actual JSON file for it to save since req is only retriving a copy of the data
  fs.writeFileSync( //same as fs.writeFile, but we don't need a callback for it, for smaller sets of data
    path.join(__dirname, './data/animals.json'), //write our animals.json file in the data subdirectory, with path.join to join the value of dirname, which represents the directory of the file we execute the code in. 
    JSON.stringify({ animals: animalsArray}, null, 2)
    // Next, we need to save the JavaScript array data as JSON, so we use JSON.stringify() to convert it. The other two arguments used in the method, null and 2, are means of keeping our data formatted. The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable. If we were to leave those two arguments out, the entire animals.json file would work, but it would be really hard to read. Animals will be updated to the animalsArray data and stringified
  );

  // return finished code to post route for response
  return animal;
}

function validateAnimal(animal) {
  if(!animal.name || typeof animal.name !== 'string'){
    return false;
  }
  if(!animal.species || typeof animal.species !== 'string'){
    return false;
  }
  if(!animal.diet || typeof animal.diet !== 'string'){
    return false;
  }
  if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
    return false;
  }
return true;
}

// filterbyquery is for a big group of animals, based on many attributes
app.get('/api/animals',(req, res) => { //req means REQUIRE
  let results = animals
  console.log("TEST 1")
  console.log(req.query)
  if (req.query){
      results = filterByQuery(req.query, results);
  }
  console.log(results)
  res.json(results)
})

// filterbyid is for an individual animal, and we are obtaining that by id
app.get('/api/animals/:id',(req, res) => {
  const result = findById(req.params.id, animals);
  console.log(result)
  if(result){
    res.json(result);
  } else {
    res.sendStatus(404);
  }
    
})

//CREATING NEW DATA FROM CLIENT SIDE TO STORE IN OUR JSON FILE

app.post('/api/animals', (req,res) => {

  // set id based on what the next index of the array will be
  // the ID will now be the length of the array, since the index is one less always. 
  req.body.id = animals.length.toString();


  console.log(req.body, "THIS SHOULD BE JUST LARRY"); //THIS SHOULD BE JUST ONE ANIMAL
  // if any data in req.body is incorrect, send 400 error back
  if(!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted.');
  } else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals)
    res.json(animal); 
  }

})

//this gets our HTML pg
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

app.get('*', (req, res) => { //any page that doesnt exist will default to the homeapgee, wildcard routee
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`)
})