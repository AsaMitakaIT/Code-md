import * as vscode from 'vscode';

export default async (text: string, snippetCount: number) => {
    const noun = `${snippetCount} ${snippetCount > 1 ? "snippets" : "snippet"}`;
    try {
        await vscode.env.clipboard.writeText(text);
        const selection = await vscode.window.showInformationMessage(`Copied ${noun} to clipboard.`, 'Preview');
        if (selection !== 'Preview') return;
    } catch {
        const selection = await vscode.window.showWarningMessage(`Failed to copy ${noun} to clipboard.`, 'Preview');
        if (selection !== 'Preview') return;
    }
    
    const doc = await vscode.workspace.openTextDocument({
        language: 'markdown',
        content: text
    });

    await vscode.window.showTextDocument(doc);
    await vscode.commands.executeCommand('markdown.showPreviewToSide', doc.uri);
}
