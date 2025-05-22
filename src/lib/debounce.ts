/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the provided function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    console.log("Debounce function called with args:", args);
    
    // Clear the previous timeout
    if (timeoutId) {
      console.log("Clearing previous timeout");
      clearTimeout(timeoutId);
    }
    
    // Set a new timeout
    console.log("Setting new timeout");
    timeoutId = setTimeout(() => {
      console.log("Executing debounced function after delay");
      func(...args);
    }, wait);
  };
}
