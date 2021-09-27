import { Plugins } from "../../contracts";
export declare class PluginFactory implements Plugins.PluginFactory {
    private readonly configuration;
    private readonly actionReader;
    private readonly basicCredentialsValidator;
    private readonly tokenValidator;
    preparePlugins(options: Plugins.PluginFactoryOptions): Array<Plugins.RegisterPluginObject>;
    private prepareJsonRpc;
    private prepareJsonRpcResponseHandler;
    private prepareBasicAuthentication;
    private validateBasicCredentials;
    private prepareTokenAuthentication;
    private validateToken;
}
