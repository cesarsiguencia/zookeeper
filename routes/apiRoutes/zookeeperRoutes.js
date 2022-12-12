const router = require("express").Router();

const {
    filterByQuery,
    filterById,
    createNewZookeeper,
    validateZookeeper
} = require("../../lib/zookeepers")

const { zookeepers } = require("../../data/zookeepers")

router.get("/zookeepers", (req, res) => {
    let results = zookeepers
    if(req.query){
        results = filterByQuery(req.query, results) 
    }
    res.json(results)
})

router.get("/zookeepers/:id", (req, res) => {
    const result = filterById(req.params.id, zookeepers);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

router.post("/zookeepers", (req, res) => {
    console.log("post working")
    req.body.id = zookeepers.length.toString()
    console.log(req.body)

    if(!validateZookeeper(req.body)){
        res.status(400).send("The zookeeper is not properly formatted")
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers)
        res.json(zookeeper)
    }


})


module.exports = router

// const router = require("express").Router();
// const {
//   filterByQuery,
//   filterById,
//   createNewZookeeper,
//   validateZookeeper,
// } = require("../../lib/zookeepers");
// const { zookeepers } = require("../../data/zookeepers");

// router.get("/zookeepers", (req, res) => {
//   let results = zookeepers;
//   if (req.query) {
//     results = filterByQuery(req.query, results);
//   }
//   res.json(results);
// });

// router.get("/zookeepers/:id", (req, res) => {
//   const result = filterById(req.params.id, zookeepers);
//   if (result) {
//     res.json(result);
//   } else {
//     res.send(404);
//   }
// });

// router.post("/zookeepers", (req, res) => {
//   req.body.id = zookeepers.length.toString();

//   if (!validateZookeeper(req.body)) {
//     res.status(400).send("The zookeeper is not properly formatted.");
//   } else {
//     const zookeeper = createNewZookeeper(req.body, zookeepers);
//     res.json(zookeeper);
//   }
// });

// module.exports = router;