"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogServiceWrapper = void 0;
class LogServiceWrapper {
    constructor(logger, databaseService) {
        this.logger = logger;
        this.databaseService = databaseService;
    }
    async make(options) {
        return this.logger.make(options);
    }
    emergency(message) {
        this.logger.emergency(message);
        this.databaseService.add("emergency", message);
    }
    alert(message) {
        this.logger.alert(message);
        this.databaseService.add("alert", message);
    }
    critical(message) {
        this.logger.critical(message);
        this.databaseService.add("critical", message);
    }
    error(message) {
        this.logger.error(message);
        this.databaseService.add("error", message);
    }
    warning(message) {
        this.logger.warning(message);
        this.databaseService.add("warning", message);
    }
    notice(message) {
        this.logger.notice(message);
        this.databaseService.add("notice", message);
    }
    info(message) {
        this.logger.info(message);
        this.databaseService.add("info", message);
    }
    debug(message) {
        this.logger.debug(message);
        this.databaseService.add("debug", message);
    }
    suppressConsoleOutput(suppress) {
        this.logger.suppressConsoleOutput(suppress);
    }
}
exports.LogServiceWrapper = LogServiceWrapper;
//# sourceMappingURL=log-service-wrapper.js.map