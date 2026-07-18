import Router from "express";
import { getAllDogs } from "../controllers/dogController.js";
const router = Router();

router.get('/', getAllDogs) 

 


router.get('/api/perros/:id', async (req, res) => {
  const { id } = req.params
  const dog = await Dog.findById(id)
  return res.status(200).json(dog)
})

router.post('/api/perros', async (req, res) => {
  const newDog = new Dog({ ...req.body })
  const insertedDog = await newDog.save()
  return res.status(201).json(insertedDog)
})

router.put('/api/perros/:id', async (req, res) => {
  const { id } = req.params
  await Dog.updateOne({ id }, req.body)
  const updatedDog = await Dog.findById(id)
  return res.status(200).json(updatedDog)
})

router.delete('/api/perros/:id', async (req, res) => {
  const { id } = req.params
  const deletedDog = await Dog.findByIdAndDelete(id)
  return res.status(200).json(deletedDog)
})

export default router 