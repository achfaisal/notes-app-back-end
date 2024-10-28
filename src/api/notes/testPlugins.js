module.exports = {
  name: "Test Plugins",
  version: "0.0.1",
  register: async (server, options) => {
    const note = options.option;
    server.route([
      {
        method: "GET",
        path: "/test",
        handler: (request, h) => {
          return note;
        },
      },
    ]);
  },
};
