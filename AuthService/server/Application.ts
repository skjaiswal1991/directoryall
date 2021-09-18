import { ExpressServer } from "./ExpressServer";

export class Application {
  public static async createApplication() {
    const expressServer = new ExpressServer();
    await expressServer.setup(Number(process.env.PORT_NUMBER));
    Application.handleExit(expressServer);
    return expressServer;
  }
  private static handleExit(express: ExpressServer) {
    process.on("uncaughtException", (err: Error) => {
      console.error("Uncaught exception", err);
      Application.shutdownProperly(1, express);
    });
    process.on("unhandledRejection", (reason: {} | null | undefined) => {
      console.error("Unhandled Rejection at promise", reason);
      Application.shutdownProperly(2, express);
    });
    process.on("SIGINT", () => {
      console.info("Caught SIGINT");
      Application.shutdownProperly(128 + 2, express);
    });
    process.on("SIGTERM", () => {
      console.info("Caught SIGTERM");
      Application.shutdownProperly(128 + 2, express);
    });
    process.on("exit", () => {
      console.info("Exiting");
    });
  }

  private static shutdownProperly(exitCode: number, express: ExpressServer) {
    Promise.resolve()
      .then(() => {})
      .then(() => {
        console.info("Shutdown complete");
        process.exit(exitCode);
      })
      .catch((err) => {
        console.error("Error during shutdown", err);
        process.exit(1);
      });
  }
}
