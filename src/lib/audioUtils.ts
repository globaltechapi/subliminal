/**
 * Audio Utilities
 *
 * Helper functions for audio processing and metadata extraction
 */

/**
 * Gets the duration of an audio file from a URL or Blob
 *
 * @param source - URL string or Blob containing audio data
 * @returns Promise resolving to the duration in seconds
 */
export async function getAudioDuration(source: string | Blob): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      // Create an audio element to load the audio
      const audio = new Audio();

      // Handle the case where source is a Blob
      if (source instanceof Blob) {
        audio.src = URL.createObjectURL(source);
      } else {
        audio.src = source;
      }

      // Set up event handlers
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;

        // Clean up if we created an object URL
        if (source instanceof Blob) {
          URL.revokeObjectURL(audio.src);
        }

        resolve(duration);
      });

      audio.addEventListener("error", (e) => {
        console.error("Error loading audio for duration check:", e);

        // Clean up if we created an object URL
        if (source instanceof Blob) {
          URL.revokeObjectURL(audio.src);
        }

        // Return a default duration if we can't get the actual duration
        resolve(10); // Default to 10 seconds instead of 0
      });

      // Load the audio
      audio.load();

      // Set a timeout in case loading hangs
      setTimeout(() => {
        if (isNaN(audio.duration)) {
          console.warn("Audio duration check timed out");

          // Clean up if we created an object URL
          if (source instanceof Blob) {
            URL.revokeObjectURL(audio.src);
          }

          // Return a default duration of 10 seconds
          resolve(10);
        }
      }, 10000);
    } catch (error) {
      console.error("Error in getAudioDuration:", error);
      // Return a default duration rather than rejecting
      resolve(10); // Default to 10 seconds
    }
  });
}

/**
 * Formats seconds into a MM:SS display format
 *
 * @param seconds - Duration in seconds
 * @returns Formatted duration string (e.g. "3:45")
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
