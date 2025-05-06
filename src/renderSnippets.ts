import * as vscode from 'vscode';
import { Liquid, Drop } from 'liquidjs';
import config from './config';
import copyAndPreview from './copyAndPreview';

class FileDrop extends Drop {
    constructor(readonly uri: vscode.Uri) {
        super();
    }

    get relativePath() {
        return vscode.workspace.asRelativePath(this.uri);
    }

    get diagnostics() {
        const diagnostics = vscode.languages.getDiagnostics(this.uri);
        return JSON.parse(JSON.stringify(diagnostics));
    }

    get textDocument() {
        return vscode.workspace.openTextDocument(this.uri)
            .then(
                doc => ({
                        ...doc,
                    text: doc.getText()
                }),
                () => undefined
            );
    }
}

const engine = new Liquid();

export default async (fileUris: vscode.Uri[]) => {
    const files = fileUris.map(uri => new FileDrop(uri));
    const template = engine.parse(config.snippetTemplate);
    const result = await engine.render(template, { files });
    copyAndPreview(result, files.length);
}
