/// <reference types="@vitest/browser/providers/playwright" />

// CSS module declarations for Storybook
declare module '*.css' {
  const content: string;
  export default content;
}