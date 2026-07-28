export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const notFoundHandler = (req, res, next) => {
  next(
    createError(
      HTTP_STATUS.NOT_FOUND,
      `Ruta no encontrada ${req.method} - ${req.originalUrl}`
    )
  );
};

export const errorHandler = (err, req, res, next) => {
  console.log("Middleware de errores");

  if (err.name === "CastError") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: err.message });
  }

  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Error interno del servidor";

  return res.status(status).json({ message });
};
