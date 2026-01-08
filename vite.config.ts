import { spawn } from "node:child_process";

import { defineConfig } from "rolldown-vite";

const launchAfterBuild = {
    name: "vite-plugin-launch-vscode-after-build",
    writeBundle: () => spawn(
        "code",
        [
            ".",
            "--disable-extensions",
            "--extensionDevelopmentPath=" + process.cwd(),
            "--enable-proposed-api publisher-id.code-md"
        ],
        { stdio: "inherit" },
    ),
};

export default defineConfig(({ mode }) => {
    const isDev = mode === "dev";

    return {
        build: {
            lib: {
                entry: "src/extension.ts",
                formats: ["cjs"],
                fileName: "extension",
            },
            target: "esnext",
            minify: true,
            sourcemap: isDev,
            rolldownOptions: {
                external: ["vscode"],
                output: {
                    format: "cjs",
                    legalComments: "none",
                },
            },
        },
        plugins: [
            isDev && launchAfterBuild,
        ],
    };
});
