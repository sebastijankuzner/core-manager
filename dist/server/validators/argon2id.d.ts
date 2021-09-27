import { Authentication } from "../../contracts";
export declare class Argon2id implements Authentication.BasicCredentialsValidator {
    private readonly configuration;
    validate(username: string, password: string): Promise<boolean>;
}
