const NotesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "Notes",
  version: "1.0",
  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};