const fs = require("fs")
const path = require("path")

function filterByQuery (query, zookeepersArray) {
    let filteredResults = zookeepersArray
    if (query.age){
        filteredResults = filteredResults.filter(
            zookeeper => zookeeper.age === Number(query.age)
        )
    }

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

