const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const NotesService = require("./services/inMemory/NotesService");
const testPlugins = require("./api/notes/testPlugins");
const NoteValidator = require("./validator/notes");
const ClientError = require("./exceptions/ClientError");

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NoteValidator,
      },
    },
    {
      plugin: testPlugins,
      options: {
        option: "Ini option",
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
