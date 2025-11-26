import { describe, expect, it, vi } from "vitest";
import { cn, getEnvVar } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names", () => {
      const result = cn("foo", "bar");
      expect(result).toBe("foo bar");
    });

    it("should handle conditional class names", () => {
      const condition = false;
      const result = cn("foo", condition && "bar", "baz");
      expect(result).toBe("foo baz");
    });

    it("should merge tailwind classes correctly", () => {
      // twMerge should handle conflicting Tailwind classes
      const result = cn("px-4 py-2", "px-8");
      expect(result).toBe("py-2 px-8");
    });

    it("should handle arrays of class names", () => {
      const result = cn(["foo", "bar"], "baz");
      expect(result).toBe("foo bar baz");
    });

    it("should handle objects with conditional classes", () => {
      const result = cn({
        foo: true,
        bar: false,
        baz: true,
      });
      expect(result).toBe("foo baz");
    });

    it("should handle mixed input types", () => {
      const result = cn(
        "base",
        ["array-1", "array-2"],
        { conditional: true, ignored: false },
        undefined,
        null,
        "final"
      );
      expect(result).toBe("base array-1 array-2 conditional final");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle undefined and null values", () => {
      const result = cn("foo", undefined, "bar", null, "baz");
      expect(result).toBe("foo bar baz");
    });

    it("should handle duplicate class names", () => {
      // Note: cn doesn't necessarily deduplicate - it merges with twMerge
      const result = cn("foo", "foo", "bar");
      // The result may contain duplicates depending on twMerge behavior
      expect(result).toContain("foo");
      expect(result).toContain("bar");
    });

    it("should handle complex Tailwind merge scenarios", () => {
      // Test that twMerge correctly handles Tailwind class conflicts
      const result = cn(
        "bg-red-500 text-white",
        "bg-blue-500" // Should override bg-red-500
      );
      expect(result).toBe("text-white bg-blue-500");
    });
  });

  describe("getEnvVar", () => {
    it("should return environment variable value when it exists", () => {
      vi.stubEnv("VITE_TEST_KEY", "test-value");

      const result = getEnvVar("VITE_TEST_KEY");
      expect(result).toBe("test-value");

      vi.unstubAllEnvs();
    });

    it("should throw error when environment variable does not exist", () => {
      expect(() => getEnvVar("VITE_MISSING_KEY")).toThrow(
        "Error: VITE_MISSING_KEY not provided"
      );
    });

    it("should throw error when environment variable is empty string", () => {
      vi.stubEnv("VITE_EMPTY_KEY", "");

      expect(() => getEnvVar("VITE_EMPTY_KEY")).toThrow(
        "Error: VITE_EMPTY_KEY not provided"
      );

      vi.unstubAllEnvs();
    });

    it("should throw error when environment variable is undefined", () => {
      expect(() => getEnvVar("VITE_UNDEFINED_KEY")).toThrow(
        "Error: VITE_UNDEFINED_KEY not provided"
      );
    });

    it("should handle NASA API key retrieval", () => {
      vi.stubEnv("VITE_NASA_API_KEY", "demo-key-12345");

      const result = getEnvVar("VITE_NASA_API_KEY");
      expect(result).toBe("demo-key-12345");

      vi.unstubAllEnvs();
    });

    it("should handle PostHog key retrieval", () => {
      vi.stubEnv("VITE_PUBLIC_POSTHOG_KEY", "phc_test_key");

      const result = getEnvVar("VITE_PUBLIC_POSTHOG_KEY");
      expect(result).toBe("phc_test_key");

      vi.unstubAllEnvs();
    });

    it("should include the key name in error message", () => {
      expect(() => getEnvVar("VITE_CUSTOM_KEY")).toThrow(/VITE_CUSTOM_KEY/);
    });

    it("should work with any valid string key", () => {
      vi.stubEnv("SOME_OTHER_KEY", "value");

      const result = getEnvVar("SOME_OTHER_KEY");
      expect(result).toBe("value");

      vi.unstubAllEnvs();
    });
  });
});
