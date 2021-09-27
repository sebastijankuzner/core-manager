/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class LogTransformStream extends Transform {
    constructor();
    _transform(chunk: any, encoding: string, callback: TransformCallback): void;
    private formatLog;
}
