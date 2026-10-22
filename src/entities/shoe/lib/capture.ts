let capture: (() => string | null) | null = null;

export function registerCapture(fn: (() => string | null) | null) {
  capture = fn;
}

/** Returns a PNG data URL of the current 3D view, or null when the scene is not ready. */
export function captureShoeImage(): string | null {
  return capture?.() ?? null;
}
