import "jest-extended";

import { Sandbox } from "@arkecosystem/core-test-framework";
import { Container } from "@arkecosystem/core-kernel";
import { Action } from "../../src/actions/info-core-version";
import { Identifiers } from "../../src/ioc";

let sandbox: Sandbox;
let action: Action;

const mockCliConfig = {
    get: jest.fn().mockReturnValue("next"),
};

const mockCli = {
    resolve: jest.fn().mockReturnValue(mockCliConfig),
};

beforeEach(() => {
    sandbox = new Sandbox();

    sandbox.app.bind(Container.Identifiers.ApplicationVersion).toConstantValue("3.0.0");
    sandbox.app.bind(Identifiers.CLI).toConstantValue(mockCli);

    action = sandbox.app.resolve(Action);
});

describe("Info:CoreVersion", () => {
    it("should have name", () => {
        expect(action.name).toEqual("info.coreVersion");
    });

    it("should return current and latest version", async () => {
        const promise = action.execute({});

        await expect(promise).toResolve();

        const result = await promise;

        await expect(result.currentVersion).toBe("3.0.0");
        await expect(result.latestVersion).toBeString();
    }, 10000);
});
