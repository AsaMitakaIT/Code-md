import * as vscode from 'vscode';
import { Liquid } from 'liquidjs';
import config from './config';
import copyAndPreview from './copyAndPreview';

const buildFile = (uri: vscode.Uri) => {
    const base = {
        relativePath: vscode.workspace.asRelativePath(uri),
        diagnostics: vscode.languages.getDiagnostics(uri)
    };

    return vscode.workspace.openTextDocument(uri).then(
        doc => ({
            ...base,
            textDocument: {
                ...doc,
                text: doc.getText()
            }
        }),
        () => ({
            ...base,
            textDocument: undefined
        })
    );
};

const engine = new Liquid();

export default async (fileUris: vscode.Uri[]) => {
    const files = await Promise.all(fileUris.map(buildFile));
    const template = engine.parse(config.snippetTemplate);
    const result = await engine.render(template, { files });
    copyAndPreview(result, files.length);
}
