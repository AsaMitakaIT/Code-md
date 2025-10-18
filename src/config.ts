import vscode from 'vscode'

import { name, contributes } from '../package.json';

type Props = typeof contributes.configuration.properties;

type ExtractTrailing<K extends string> =
    K extends `${typeof name}.${infer R}`
        ? R
        : never;

type ValidKey<K extends keyof Props> =
    ExtractTrailing<K> extends never
        ? never
        : Props[K] extends { default: infer D }
            ? Props[K] extends { enum: (infer E)[] }
                ? D extends E
                    ? ExtractTrailing<K>
                    : never
                : ExtractTrailing<K>
            : never;

type ValidValue<K extends keyof Props> =
    Props[K] extends { enum: (infer E)[] }
        ? E
        : Props[K] extends { default: infer D}
            ? D
            : never;

type Config = {
    readonly [K in keyof Props as ValidKey<K>]: ValidValue<K>;
};

export default new Proxy({} as Config, {
    get: (_, key: keyof Config) => {
        const { get } = vscode.workspace.getConfiguration(name);
        return get(key);
    }
})
