import { exec } from 'child_process';
import { defineConfig } from 'rolldown-vite';

const vscodeDev = {
    name: 'vite-plugin-vscode-preview',
    writeBundle: () => exec(
        'code . --disable-extensions --extensionDevelopmentPath=$PWD --enable-proposed-api publisher-id.code-md'
    )
};

export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            entry: 'src/extension.ts',
            formats: ['cjs'],
            fileName: 'extension'
        },
        esbuild: {
            legalComments: 'none',
        },
        rollupOptions: {
            external: ['vscode']
        }
    },
    plugins: [
        mode === 'dev' && vscodeDev
    ],
}))
