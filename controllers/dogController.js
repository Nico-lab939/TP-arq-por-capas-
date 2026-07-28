import { createError, HTTP_STATUS } from "../middlewares/errorHandler.js";
import Dog from "../models/dog.js";

export async function getAllDogs(req, res, next) {
  try {
    const allDogs = await Dog.find();

    if (!allDogs.length) {
      throw createError(HTTP_STATUS.NOT_FOUND, "No se encontraron perros");
    }

    return res.status(HTTP_STATUS.OK).json(allDogs);
  } catch (error) {
    next(error);
  }
}

export async function getDogById(req, res, next) {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);

    if (!dog) {
      throw createError(HTTP_STATUS.NOT_FOUND, "Perro no encontrado");
    }

    return res.status(HTTP_STATUS.OK).json(dog);
  } catch (error) {
    next(error);
  }
}

export async function createDog(req, res, next) {
  try {
    const newDog = new Dog({ ...req.body });
    const insertedDog = await newDog.save();

    return res.status(HTTP_STATUS.CREATED).json({
      mensaje: "Perro agregado exitosamente",
      perro: insertedDog,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateDog(req, res, next) {
  try {
    const { id } = req.params;
    const updatedDog = await Dog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDog) {
      throw createError(HTTP_STATUS.NOT_FOUND, "Perro no encontrado");
    }

    return res.status(HTTP_STATUS.OK).json({
      mensaje: "Perro actualizado exitosamente",
      perro: updatedDog,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDog(req, res, next) {
  try {
    const { id } = req.params;
    const deletedDog = await Dog.findByIdAndDelete(id);

    if (!deletedDog) {
      throw createError(HTTP_STATUS.NOT_FOUND, "Perro no encontrado");
    }

    return res.status(HTTP_STATUS.OK).json({
      mensaje: "Perro eliminado exitosamente",
    });
  } catch (error) {
    next(error);
  }
}
