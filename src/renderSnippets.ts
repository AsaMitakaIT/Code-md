import vscode from "vscode";
import { Liquid } from "liquidjs";

import config from "./config";
import copyAndPreview from "./copyAndFinish";

const buildFile = (uri: vscode.Uri) => {
    const base = {
        relativePath: vscode.workspace.asRelativePath(uri),
        diagnostics: vscode.languages.getDiagnostics(uri),
    };

    return vscode.workspace.openTextDocument(uri).then(
        doc => ({
            ...base,
            textDocument: {
                ...doc,
                text: doc.getText(),
            },
        }),
        () => base,
    );
};

const engine = new Liquid({ ownPropertyOnly: false });

export default async (fileUris: vscode.Uri[]) => {
    const files = await Promise.all(fileUris.map(buildFile));
    const template = engine.parse(config.snippetTemplate);
    const result = await engine.render(template, { files });
    await copyAndPreview(result, files.length);
};
