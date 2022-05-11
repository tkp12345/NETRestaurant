import mongoose from 'mongoose';

const map = new mongoose.Schema({
  mapId: String,
  userId: String
});
const mapModel = mongoose.model('Map', map);
export default mapModel;