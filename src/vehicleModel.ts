import mongoose from 'mongoose';
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
	id: {
    type: String,
    default: ""
  },
  make: {
    type: String,
    default: ""
  },
  model: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  km: { type: Number },
  estimatedate: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  person: { type: String }
}, {
  versionKey: false
});

export default mongoose.model('vehicle', vehicleSchema);