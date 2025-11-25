import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
// import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
// const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Vitest configuration - Storybook tests temporarily disabled
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ['node', 'default'],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, '.storybook', 'storybook-static'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        ...configDefaults.exclude,
        'src/test/',
        '**/mockData',
        '.storybook/',
        'storybook-static/'
      ],
      include: ['src/**/*.{ts,tsx,js,jsx}']
    }

    // Storybook tests temporarily disabled due to MSW/Vite compatibility issues
    // Uncomment to re-enable when resolved
    // projects: [{
    //   extends: true,
    //   plugins: [
    //     // The plugin will run tests for the stories defined in your Storybook config
    //     // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //     storybookTest({
    //       configDir: path.join(dirname, '.storybook')
    //     })
    //   ],
    //   test: {
    //     name: 'storybook',
    //     browser: {
    //       enabled: true,
    //       headless: true,
    //       provider: 'playwright',
    //       instances: [{
    //         browser: 'chromium'
    //       }]
    //     },
    //     setupFiles: ['.storybook/vitest.setup.ts']
    //   }
    // }]
  }
});