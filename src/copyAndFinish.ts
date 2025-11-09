import vscode from 'vscode';

import config from './config';

export default async (text: string, snippetCount: number) => {
    const noun = `${snippetCount} ${snippetCount === 1 ? "snippet" : "snippets"}`;
    const command = config.previewCommand.trim();
    const button = command ? "Open & Preview" : "Open";

    try {
        await vscode.env.clipboard.writeText(text);
        const selection = await vscode.window.showInformationMessage(`Copied ${noun} to clipboard.`, button);
        if (selection === undefined) return;
    } catch {
        const selection = await vscode.window.showWarningMessage(`Failed to copy ${noun} to clipboard.`, button);
        if (selection === undefined) return;
    };

    const doc = await vscode.workspace.openTextDocument({
        language: config.templateFormat.trim(),
        content: text,
    });
    await vscode.window.showTextDocument(doc);

    try {
        await vscode.commands.executeCommand(command);
    } catch (err) {
        await vscode.window.showErrorMessage(`${err}.`);
    };
}
