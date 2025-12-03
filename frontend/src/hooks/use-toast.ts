import * as React from "react"; // FIX 1: Missing React import
import { toast as sonnerToast, type ExternalToast } from "sonner";

// --- Sonner API Wrappers ---

/**
 * Maps the old 'toast' function to Sonner's toast function.
 * This function maintains the original expected return structure ({ id, dismiss, update }).
 */
function toast(messageOrOptions: React.ReactNode | ExternalToast, options?: ExternalToast) {
  let id: string | number;

  if (typeof messageOrOptions === "string" || typeof messageOrOptions === "number" || React.isValidElement(messageOrOptions)) {
    // Case 1: toast(message, options) -> Use the standard Sonner signature
    id = sonnerToast(messageOrOptions as React.ReactNode, options);
  } else {
    // Case 2: toast(options) -> Use the single-argument signature for options.
    // We explicitly assert the type for this call to resolve TypeScript ambiguity (Error 2345).
    id = sonnerToast(messageOrOptions as ExternalToast);
  }

  // Return the required methods for compatibility
  return {
    id: id,
    update: (newProps: ExternalToast) => sonnerToast(id, newProps),
    dismiss: () => sonnerToast.dismiss(id),
  };
}

/**
 * Simplified useToast hook.
 * This hook now only exposes the necessary functional methods,
 * as Sonner manages all state internally.
 */
function useToast() {
  return {
    // Expose the wrapper function created above
    toast: toast,

    // Maintain the old dismiss function for programmatic dismissal
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        // If no ID is provided, Sonner dismisses all open toasts
        sonnerToast.dismiss();
      }
    },
    // Note: The old 'toasts' state is no longer returned, as Sonner manages it.
  };
}

// **CRUCIAL:** Keep these exports identical to your original file's exports
export { useToast, toast };
