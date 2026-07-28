import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API CRUD de Perros",
      version: "1.0.0",
      description:
        "API RESTful con arquitectura por capas para gestionar perros en MongoDB (Base_Dogs / Collection_Dogs).",
      contact: {
        name: "Nicola Tesio",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local de desarrollo",
      },
    ],
    tags: [
      {
        name: "Perros",
        description: "Operaciones CRUD sobre la colección de perros",
      },
    ],
    components: {
      schemas: {
        Dog: {
          type: "object",
          properties: {
            _id: { type: "string", example: "60d5ec49f72e9e2f3c6e9b1a" },
            name: { type: "string", example: "Max" },
            breed: { type: "string", example: "Labrador Retriever" },
            age: { type: "integer", example: 3 },
            isGoodBoy: { type: "boolean", example: true },
          },
        },
        DogInput: {
          type: "object",
          required: ["name", "breed", "age"],
          properties: {
            name: { type: "string", example: "Buddy" },
            breed: { type: "string", example: "Golden Retriever" },
            age: { type: "integer", example: 2 },
            isGoodBoy: { type: "boolean", example: true },
          },
        },
        DogCreateResponse: {
          type: "object",
          properties: {
            mensaje: { type: "string", example: "Perro agregado exitosamente" },
            perro: { $ref: "#/components/schemas/Dog" },
          },
        },
        DogUpdateResponse: {
          type: "object",
          properties: {
            mensaje: {
              type: "string",
              example: "Perro actualizado exitosamente",
            },
            perro: { $ref: "#/components/schemas/Dog" },
          },
        },
        DeleteResponse: {
          type: "object",
          properties: {
            mensaje: { type: "string", example: "Perro eliminado exitosamente" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Perro no encontrado" },
          },
        },
      },
    },
    paths: {
      "/api/perros": {
        get: {
          tags: ["Perros"],
          summary: "Obtener todos los perros",
          description: "Devuelve la lista completa de perros almacenados.",
          responses: {
            200: {
              description: "Lista de perros",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Dog" },
                  },
                },
              },
            },
            404: {
              description: "No se encontraron perros",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Perros"],
          summary: "Agregar un nuevo perro",
          description: "Crea y guarda un nuevo perro en la base de datos.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DogInput" },
              },
            },
          },
          responses: {
            201: {
              description: "Perro creado exitosamente",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DogCreateResponse" },
                },
              },
            },
            400: {
              description: "Datos inválidos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/perros/{id}": {
        get: {
          tags: ["Perros"],
          summary: "Obtener un perro por ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID de MongoDB del perro",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Perro encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Dog" },
                },
              },
            },
            404: {
              description: "Perro no encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Perros"],
          summary: "Actualizar un perro",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID del perro a actualizar",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Max" },
                    breed: { type: "string", example: "Labrador Retriever" },
                    age: { type: "integer", example: 4 },
                    isGoodBoy: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Perro actualizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DogUpdateResponse" },
                },
              },
            },
            404: {
              description: "Perro no encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Perros"],
          summary: "Eliminar un perro",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID del perro a eliminar",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Perro eliminado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DeleteResponse" },
                },
              },
            },
            404: {
              description: "Perro no encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
