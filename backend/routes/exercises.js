const router = require('express').Router()
let Exercise = require('../models/Exercise.model')

router.route('/').get((req, res) => {
    // Exercise.find().then(Exercises => res.json(Exercises)).then(data => console.log("Exercise Data Fetches Successfully")).catch(err => res.status(400).json("Failed to Fetch Exercise Data"+err))
    Exercise.find().then(Exercises => res.status(200).json(Exercises)).catch(err => res.status(400).json("Failed to Fetch Exercise Data" + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const date = Date.parse(req.body.date)
    const duration = Number(req.body.duration)
    const newExercise = new Exercise({ username, description, duration, date })
    newExercise.save().then(() => res.status(200).json('New Exercise added successfully')).catch(err => res.status(400).json("Failed to add New Exercise" + err))
})

router.route("/:id").delete((req, res) => {
    const id = req.params.id
    Exercise.findByIdAndDelete(id).then(() => res.status(200).json("Exercise Deleted Successfully")).catch(err => res.status(400).json("Failed to Delete Exercise" + err))
})

router.route("/update/:id").post((req,res)=>{
    Exercise.findById(req.params.id).then(exercise => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.date =Date.parse(req.body.date)
        exercise.duration = Number(req.body.duration)
        exercise.save().then(() => res.status(200).json("Exercise Updated Successfully")).catch(err => res.status(400).json("Failed to Update Exercise"+err))
}).catch(err => res.status(400).json("Failed to Update Exercise"+err))
})


router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id).then(data => res.status(200).json(data)).catch(err => res.status(400).json("Failed to Find Exercise" + err))
})

module.exports = router