import { defineConfig } from 'vite';
import { execa } from 'execa';

const previewAfterBuild = () => ({
    name: 'vite-plugin-preview-after-build',
    async closeBundle() {
        const pm = process.env['npm_execpath']!;
        await execa(pm, ['run', 'preview'], { stdio: 'inherit' });
    }
});

export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            entry: 'src/extension.ts',
            formats: ['cjs'],
            fileName: () => 'extension.js'
        },
        rollupOptions: {
            external: ['vscode']
        }
    },
    plugins: [
        mode === 'development' && previewAfterBuild()
    ]
}));
