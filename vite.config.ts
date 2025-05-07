import { defineConfig } from 'vite';
import { execaCommand } from 'execa';

const vscodeDev = () => ({
    name: 'vite-plugin-vscode-preview',
    writeBundle() {
        const pm = process.env['npm_execpath']!;
        execaCommand(`${pm} run preview`, { stdio: 'inherit' });
    }
})

export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            entry: 'src/extension.ts',
            formats: ['cjs'],
            fileName: () => 'extension.js'
        },
        target: 'esnext',
        rollupOptions: {
            external: ['vscode']
        }
    },
    plugins: [
        mode === 'development' && vscodeDev()
    ],
}))
