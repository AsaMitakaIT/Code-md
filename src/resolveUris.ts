import vscode from 'vscode';
import { Utils } from 'vscode-uri';

import config from './config';
import renderSnippets from './renderSnippets';

export default async (uris: vscode.Uri[]) => {
    const patterns = uris.map(uri => new vscode.RelativePattern(
        Utils.dirname(uri),
        `${ Utils.basename(uri) }{,/**/*}`,
    ));

    const {
        excludeGlobs,
        useIgnoreFiles,
        useParentIgnoreFiles,
        useGlobalIgnoreFiles, 
    } = config;

    const ignoreFilesScope = {
        ...useIgnoreFiles !== null && { local: useIgnoreFiles },
        ...useParentIgnoreFiles !== null && { parent: useParentIgnoreFiles },
        ...useGlobalIgnoreFiles !== null && { global: useGlobalIgnoreFiles },
    };

    const resolvedUris = await vscode.workspace.findFiles2(patterns, {
        exclude: excludeGlobs,
        useIgnoreFiles: ignoreFilesScope,
    });

    if (resolvedUris.length === 0) {
        vscode.window.showInformationMessage("No files matched.");
        return;
    };

    await renderSnippets(resolvedUris);
}
