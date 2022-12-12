const fs = require("fs") //including fs to be able to write and directly update the JSON file, we need to write into the system
const path = require("path") //for locating our files for FS to write into JSON

function filterByQuery (query, zookeepersArray) {
    let filteredResults = zookeepersArray
    if (query.age){
        filteredResults = filteredResults.filter(
        // Since our form data will be coming in as strings, and our JSON is storing
        // age as a number, we must convert the query string to a number to
        // perform a comparison: we can't include brackets for comparing Number
            zookeeper => zookeeper.age === Number(query.age)
        )
    }

    //BE CAREFUL WITH THE PARENTHESIS IN THE FILTER FUNCTIONS, IT IS SENSITIVE

    if(query.name){
        console.log(query.name, "lib, zookeeperjs")
        filteredResults = filteredResults.filter(
            zookeeper => zookeeper.name === query.name
        )
    }

    if(query.favoriteAnimal){
        filteredResults = filteredResults.filter(
            zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal
            
        )
    }

    return filteredResults
}


function filterById (id, zookeepers){
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0]
    return result
}

function createNewZookeeper (body, zookeepers){
    const zookeeper = body

    zookeepers.push(zookeeper)

    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({zookeepers}, null, 2)
    )

    return zookeeper
}


function validateZookeeper(zookeeper){
    if(!zookeeper.name || typeof zookeeper.name !== "string"){

        return false
    }

    //do not forget to parseInt the age!!!
    if (!zookeeper.age || typeof parseInt(zookeeper.age) !== "number"){
        return false
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string"){
    
        return false
    }

    return true
}


module.exports = {
    filterByQuery,
    filterById,
    createNewZookeeper,
    validateZookeeper
}

