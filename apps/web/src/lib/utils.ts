import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Validates and retrieves an environment variable
 * @param {string} key - key - The full environment variable key (e.g., 'VITE_NASA_API_KEY')
 * @returns {string} The environment variable value
 * @throws {Error} If the environment variable is not set
 */
export function getEnvVar(key: string) {

  const value = import.meta.env[key]
  
  if (!value) {
    throw new Error(`Error: ${key} not provided`)
  }
  
  return value
} 