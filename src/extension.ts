import * as vscode from 'vscode';
import { name } from '../package.json';

const workspaceFoldersCallback = () => {
    const folders = vscode.workspace.workspaceFolders ?? [];
    console.log("Workspace folders:", folders);
}

export const activate = (context: vscode.ExtensionContext) => {
    const selection = vscode.commands.registerCommand(`${name}.selection`,
        (_, uris: vscode.Uri[] = []) => console.log("Selection:", uris));
    const root = vscode.commands.registerCommand(`${name}.root`, workspaceFoldersCallback);
    const roots = vscode.commands.registerCommand(`${name}.roots`, workspaceFoldersCallback);
    
    context.subscriptions.push(selection, root, roots);
}
