// Bento style portrayal render server
// Load all portrayal units.
import Fastify from "fastify";

export default class RenderServer {
  constructor(opts = {}) {
    this._server = Fastify(opts);
  }

  async _initializeRenderServer (server) {
    
  }

  static async start(serverOptions = {}, listenOptions = {}) {
    const renderServer = new Server(serverOptions);
    await this._initializeRenderServer(renderServer);
    await renderServer.listen(listenOptions);
  }
}
