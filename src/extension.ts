import vscode from "vscode";

import resolveUris from "./resolveUris";
import { name } from "../package.json";

const workspaceFoldersCallback = () => {
    const uris = vscode.workspace.workspaceFolders?.map(folder => folder.uri);
    return resolveUris(uris ?? []);
};

export const activate = (context: vscode.ExtensionContext) => {
    const selection = vscode.commands.registerCommand(
        `${name}.selection`,
        (_, uris: vscode.Uri[]) => resolveUris(uris),
    );
    const root = vscode.commands.registerCommand(`${name}.root`, workspaceFoldersCallback);
    const roots = vscode.commands.registerCommand(`${name}.roots`, workspaceFoldersCallback);

    context.subscriptions.push(selection, root, roots);
};
