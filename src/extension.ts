import * as vscode from 'vscode';
import { name } from '../package.json';
import resolveUris from './resolveUris';

const workspaceFoldersCallback = async () => {
    const folders = vscode.workspace.workspaceFolders ?? [];
    await resolveUris(folders.map(folder => folder.uri));
}

export const activate = (context: vscode.ExtensionContext) => {
    const selection = vscode.commands.registerCommand(`${name}.selection`,
        async (_, uris: vscode.Uri[] = []) => resolveUris(uris));
    const root = vscode.commands.registerCommand(`${name}.root`, workspaceFoldersCallback);
    const roots = vscode.commands.registerCommand(`${name}.roots`, workspaceFoldersCallback);
    
    context.subscriptions.push(selection, root, roots);
}
