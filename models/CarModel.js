const mongoose = require('mongoose');

//* creating Schema *//
const bodyTypes = ['Micro', 'Sedan', 'Hatchback', 'Coupe', 'Station Wagon', 'Roadster', 'Cabriolet', 'Muscle car', 'Sports car', 'Super car', 'Limuosine', 'CUV', 'Pickup', 'SUV', 'Mini van', 'Van', 'Camper van', 'Bus', 'Monster truck', 'Mini truck', 'Truck', 'Big truck', 'Other'];
const transmissions = ['Manual', 'Automatic', 'Semi-automatic', 'Dual-clutch', 'CVT','Manumatic', 'Sequential-manual', 'Direct-shift', 'Other'];
const engines = ['twin-cylinder', '3-cylinder', '4-cylinder', '5-cylinder', '6-cylinder', '8-cylinder', 'Other'];
const carSchema = new mongoose.Schema({
  name: {
    type: [ String, '{VALUE} has an invalid data type'],
    required: [true, 'name is a required field'],
    default: void 0,
    minLength: [3, 'expected 3 or more characters, got {VALUE}'],
    maxLength: [65, 'expected 65 or less characters, got {VALUE}'],
  },
  bodyType: {
    type: [ String, '{VALUE} has an invalid data type'],
    required: [true, 'body type is a required field'],
    default: void 0,
    enum: {
      values: bodyTypes,
      message: '{VALUE} is not a supported body type'
    }
  },
  transmission: {
    type: [ String, '{VALUE} has an invalid data type'],
    required: [true, 'transmission is a required field'],
    default: void 0,
    enum: {
      values: transmissions,
      message: '{VALUE} is not a supported transmission type'
    }
  },
  odometer: {
    type: [ Number, '{VALUE} has an invalid data type'],
  },
  engine: {
    type: [ String, '{VALUE} has an invalid data type'],
    enum: {
      values: engines,
      message: '{VALUE} is not a supported engine type'
    }
  },
  fuelType: {
    type: [ String, '{VALUE} has an invalid data type'],
    enum: {
      values:['Gas', 'Gasoline', 'Diesel', 'Electric', 'Other'],
      message: '{VALUE} is not a supported fuel type'
    }
  },
  fuelCapacity: {
    type: [ Number, '{VALUE} has an invalid data type'],
    max: [100, 'max value for this field is 100']
  },
  priorUse: {
    type: [ Boolean, '{VALUE} has an invalid data type'],
  },
  price: {
    type: [ Number, '{VALUE} has an invalid data type'],
    required: [true, 'price is a required field'],
    default: void 0,
  },
  imageUrl: {
    default: void 0,
    validate: ((value)=>{
          urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
          return urlRegex.test(value);
     }),
    type: [ String, '{VALUE} has an invalid data type'],
    required: [true, 'image is a required field'],

  }
}, {timestamps: { createdAt: 'created_at'}})

//* Creating Models *//
const CarModel = mongoose.model('Car', carSchema)

module.exports = CarModel
