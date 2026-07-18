import  Dog from '../models/dog.js'

export async function getAllDogs(req, res) {
  
  const allDogs = await Dog.find()
  return res.status(200).json(allDogs)
}

export async function getDogById(req, res) {
  const { id } = req.params
  const dog = await Dog.findById(id)
  return res.status(200).json(dog) 
  } 

  
