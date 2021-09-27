import { Authentication } from "../../contracts";
export declare class SimpleTokenValidator implements Authentication.TokenValidator {
    private readonly configuration;
    validate(token: string): Promise<boolean>;
}
