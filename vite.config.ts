import { exec } from 'child_process';
import { defineConfig } from 'rolldown-vite';

const launchAfterBuild = {
    name: "vite-plugin-launch-vscode-after-build",
    writeBundle: () => exec(
        'code . --disable-extensions --extensionDevelopmentPath=$PWD --enable-proposed-api publisher-id.code-md'
    ),
};

const isDev = process.env['npm_lifecycle_event'] === 'dev';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/extension.ts',
            formats: ['cjs'],
            fileName: 'extension',
        },
        target: 'esnext',
        minify: true,
        sourcemap: isDev,
        rolldownOptions: {
            external: ['vscode'],
            output: {
                format: 'cjs',
                legalComments: 'none',
            },
        },
    },
    plugins: [
        isDev && launchAfterBuild,
    ],
})
