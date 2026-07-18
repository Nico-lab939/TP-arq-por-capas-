import  Dog from '../models/dog.js'

export async function getAllDogs(req, res) {
  
  const allDogs = await Dog.find()
  return res.status(200).json(allDogs)
}