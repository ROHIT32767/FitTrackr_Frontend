const router = require('express').Router()
let User = require('../models/User.model')

router.route('/add').post((req,res)=>{
    const username = req.body.username
    const NewUser = User({
        username
    })
    NewUser.save().then(() => res.status(200).json("User Added Successfully")).catch(err => res.status(400).json("Failed to add User:"+err))
})

router.route('/').get((req,res)=>{
    User.find().then(Users => res.status(200).json(Users)).catch(err => res.status(200).json("Failed to Fetch Users:"+err))
}
)

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id).then(user => res.status(200).json(user)).catch(err => res.status(400).json("Failed to find the user"+err))
})

module.exports = router