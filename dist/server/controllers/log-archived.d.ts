import Hapi from "@hapi/hapi";
export declare class LogArchivedController {
    private readonly filesystem;
    file(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any>;
}
