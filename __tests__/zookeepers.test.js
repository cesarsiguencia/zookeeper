const fs = require("fs")

const {
    filterByQuery,
    filterById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js")
const { zookeepers } = require("../data/zookeepers")

jest.mock("fs")

test("query zookeepers by search", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        }
    ]

    const updatedZookeepers = filterByQuery({ age: 31}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1)
})

test("create a zookeeper", () => {
    const zookeeper = createNewZookeeper(
        { 
            name: "Darlene",
            id: "abc123"
        },
        zookeepers 

    )

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("abc123")
})


test("filter by id)", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
        }
    ]

    const result = filterById( "3", startingZookeepers)

    expect(result.name === "Isabella")
})

test("validates age", () =>{
    const zookeeper = {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
      };
    
      const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear",
      };

      //will be invalid because the age here is a string, not a number

      const result = validateZookeeper(zookeeper);

      const result2 = validateZookeeper(invalidZookeeper)
})



