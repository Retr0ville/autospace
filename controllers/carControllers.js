const carModel = require('../models/CarModel')
const mongoose = require('mongoose')

const get_cars = async ( req, res ) => {
  res.set('Access-Control-Allow-Origin', '*')
  carModel.find({}, {fuelType:0, fuelCapacity:0, priorUse:0})
    .then((cars)=>{
     cars && res.status(200).send(cars)
    })
    .catch(err => {res.status(400).json({error: err.message})})
}

const get_car = async ( req, res ) => {
  res.set('Access-Control-Allow-Origin', '*')
  const { id } = req.params
  const exists = ((mongoose.Types.ObjectId.isValid(id)) && (await carModel.exists({_id: id})))
  if(exists){
  carModel.findById(id)
    .then((car)=>{
      car && res.status(200).send(car)
    })
    .catch(err => {res.status(400).json({error: err.message})})
}
  else {res.status(404).send({error: 'car doesn\'t exist in database'})}
}

const delete_car = async ( req, res ) => {
  res.set('Access-Control-Allow-Origin', '*')
  const { id } = req.params
  const exists = ( (mongoose.Types.ObjectId.isValid(id)) && (await carModel.exists({_id: id})))
  if(exists){
  carModel.findByIdAndDelete(id)
    .then((car)=>{
      car && res.status(200).send(car)
    })
    .catch(err => {res.status(400).json({error: err.message})})
  }
  else {res.status(404).send({error: 'car doesn\'t exist in database'})}
}

const create_cars = ( req, res ) => {
  try {
    res.set("Access-Control-Allow-Origin", "*")
    const carInstance = new carModel(req.body)
    carInstance.save()
      .then((car)=>{
        res.status(201).send(car)
      }).catch((err)=>{res.json({error : err.message})})
    } catch(err) {
      res.status(400).send({error: 'an error occured, couldn\'t update the database'})
    }
}

module.exports = {
  get_cars,
  get_car,
  delete_car,
  create_cars,
}
