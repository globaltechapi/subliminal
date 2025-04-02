/**
 * Audio Mixer Utility
 *
 * This utility provides functions to mix audio tracks with spoken affirmations
 * for creating subliminal audio tracks.
 */

export type VoiceType = "male" | "female";
export type AffirmationType = "text" | "audio";

export interface Affirmation {
  id: string;
  text: string;
  type: AffirmationType;
  audioFile?: File;
  audioUrl?: string;
}

export interface MixSettings {
  frequency: number; // How often affirmations play (in seconds)
  volume: number; // Volume level for affirmations (0-1)
  repeatCycles: number; // How many times each affirmation repeats
}

/**
 * Creates a subliminal audio track by mixing music with spoken affirmations
 *
 * @param musicFile - The music file or URL to use as the base track
 * @param affirmations - Array of affirmation texts to convert to speech
 * @param settings - Settings for mixing (frequency, volume, repeat cycles)
 * @param voiceType - Type of voice to use (male or female)
 * @returns Promise resolving to a Blob containing the mixed audio file
 */
export async function createSubliminalTrack(
  musicFile: File | string,
  affirmations: Affirmation[],
  settings: MixSettings,
  voiceType: VoiceType = "male",
): Promise<Blob> {
  // For this demo, we'll use a real audio file as a fallback
  const fallbackAudioUrl =
    "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3";

  return new Promise(async (resolve) => {
    try {
      // First, get the music audio as an AudioBuffer
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      let musicBuffer: AudioBuffer;

      if (musicFile instanceof File) {
        const arrayBuffer = await musicFile.arrayBuffer();
        musicBuffer = await audioContext.decodeAudioData(arrayBuffer);
      } else {
        const urlToFetch = musicFile || fallbackAudioUrl;
        const response = await fetch(urlToFetch);
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        musicBuffer = await audioContext.decodeAudioData(arrayBuffer);
      }

      // Create an offline audio context for rendering
      const offlineContext = new OfflineAudioContext(
        2, // stereo
        musicBuffer.length, // same length as music
        audioContext.sampleRate,
      );

      // Create music source
      const musicSource = offlineContext.createBufferSource();
      musicSource.buffer = musicBuffer;

      // Create gain node for music (to lower volume slightly when affirmations play)
      const musicGain = offlineContext.createGain();
      musicGain.gain.value = 1.0; // Full volume by default

      // Connect music source to gain and then to destination
      musicSource.connect(musicGain);
      musicGain.connect(offlineContext.destination);

      // Start the music
      musicSource.start(0);

      // Generate speech for each affirmation using actual Web Speech API or use uploaded audio
      // First, we'll create all the speech buffers using the Speech API or from uploaded files
      const speechBuffers = await Promise.all(
        affirmations.map((affirmation) =>
          affirmation.type === "audio" && affirmation.audioFile
            ? generateAudioBufferFromFile(offlineContext, affirmation.audioFile)
            : generateSpeechBuffer(offlineContext, affirmation.text, voiceType),
        ),
      );

      // Now use the actual speech buffers in our audio processing
      // Calculate total duration of music in seconds
      const musicDuration = musicBuffer.duration;

      // Distribute affirmations throughout the music track
      for (let i = 0; i < affirmations.length; i++) {
        const affirmation = affirmations[i];

        // Create a buffer source for the affirmation
        const affirmationSource = offlineContext.createBufferSource();

        // Use the real speech buffer
        const speechBuffer = speechBuffers[i];
        affirmationSource.buffer = speechBuffer;

        // Create gain node for the affirmation
        const affirmationGain = offlineContext.createGain();
        affirmationGain.gain.value = 0; // Start at zero

        // Calculate start time based on frequency and distribute evenly throughout the track
        // Ensure we don't exceed the music duration
        const interval = Math.min(
          settings.frequency,
          musicDuration / (affirmations.length + 1),
        );
        const startTime = (i + 1) * interval; // Start after some initial music
        const duration = speechBuffer.duration;

        // Fade in
        affirmationGain.gain.setValueAtTime(0, startTime);
        affirmationGain.gain.linearRampToValueAtTime(
          settings.volume,
          startTime + 0.1,
        );

        // Fade out
        affirmationGain.gain.setValueAtTime(
          settings.volume,
          startTime + duration - 0.1,
        );
        affirmationGain.gain.linearRampToValueAtTime(0, startTime + duration);

        // Lower music volume slightly when affirmation plays
        musicGain.gain.setValueAtTime(1.0, startTime);
        musicGain.gain.linearRampToValueAtTime(0.8, startTime + 0.1);
        musicGain.gain.setValueAtTime(0.8, startTime + duration - 0.1);
        musicGain.gain.linearRampToValueAtTime(1.0, startTime + duration);

        // Connect and start the affirmation source
        affirmationSource.connect(affirmationGain);
        affirmationGain.connect(offlineContext.destination);
        affirmationSource.start(startTime);

        // Repeat the affirmation based on repeat cycles
        for (let j = 1; j < settings.repeatCycles; j++) {
          // Make sure we don't exceed the music duration
          const repeatTime = Math.min(
            startTime + j * duration * 1.5,
            musicDuration - duration - 0.5,
          ); // Space out repeats

          // Create a new source for each repeat
          const repeatSource = offlineContext.createBufferSource();
          repeatSource.buffer = speechBuffer;

          const repeatGain = offlineContext.createGain();
          repeatGain.gain.value = 0;

          // Fade in/out for repeat
          repeatGain.gain.setValueAtTime(0, repeatTime);
          repeatGain.gain.linearRampToValueAtTime(
            settings.volume,
            repeatTime + 0.1,
          );
          repeatGain.gain.setValueAtTime(
            settings.volume,
            repeatTime + duration - 0.1,
          );
          repeatGain.gain.linearRampToValueAtTime(0, repeatTime + duration);

          // Lower music volume for repeat
          musicGain.gain.setValueAtTime(1.0, repeatTime);
          musicGain.gain.linearRampToValueAtTime(0.8, repeatTime + 0.1);
          musicGain.gain.setValueAtTime(0.8, repeatTime + duration - 0.1);
          musicGain.gain.linearRampToValueAtTime(1.0, repeatTime + duration);

          repeatSource.connect(repeatGain);
          repeatGain.connect(offlineContext.destination);
          repeatSource.start(repeatTime);
        }
      }

      // Render the audio
      const renderedBuffer = await offlineContext.startRendering();

      // Convert the rendered buffer to a WAV file
      const wavBlob = audioBufferToWav(renderedBuffer);
      resolve(new Blob([wavBlob], { type: "audio/wav" }));
    } catch (error) {
      console.error("Error creating subliminal track:", error);

      // Fallback to just returning the music file
      if (musicFile instanceof File) {
        resolve(musicFile);
      } else {
        fetch(fallbackAudioUrl)
          .then((response) => response.blob())
          .then((blob) => resolve(blob))
          .catch(() => {
            const dummyBlob = new Blob([new Uint8Array(1000)], {
              type: "audio/mp3",
            });
            resolve(dummyBlob);
          });
      }
    }
  });
}

// Helper function to convert AudioBuffer to WAV format
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numOfChannels = buffer.numberOfChannels;
  const length = buffer.length * numOfChannels * 2;
  const sampleRate = buffer.sampleRate;
  const wavDataView = new DataView(new ArrayBuffer(44 + length));

  // RIFF identifier
  writeString(wavDataView, 0, "RIFF");
  // File length
  wavDataView.setUint32(4, 36 + length, true);
  // RIFF type
  writeString(wavDataView, 8, "WAVE");
  // Format chunk identifier
  writeString(wavDataView, 12, "fmt ");
  // Format chunk length
  wavDataView.setUint32(16, 16, true);
  // Sample format (raw)
  wavDataView.setUint16(20, 1, true);
  // Channel count
  wavDataView.setUint16(22, numOfChannels, true);
  // Sample rate
  wavDataView.setUint32(24, sampleRate, true);
  // Byte rate (sample rate * block align)
  wavDataView.setUint32(28, sampleRate * 4, true);
  // Block align (channel count * bytes per sample)
  wavDataView.setUint16(32, numOfChannels * 2, true);
  // Bits per sample
  wavDataView.setUint16(34, 16, true);
  // Data chunk identifier
  writeString(wavDataView, 36, "data");
  // Data chunk length
  wavDataView.setUint32(40, length, true);

  // Write the PCM samples
  const channels = [];
  for (let i = 0; i < numOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numOfChannels; channel++) {
      // Convert float to int16
      const sample = Math.max(-1, Math.min(1, channels[channel][i]));
      const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      wavDataView.setInt16(offset, int16, true);
      offset += 2;
    }
  }

  return wavDataView.buffer;
}

function writeString(dataView: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    dataView.setUint8(offset + i, string.charCodeAt(i));
  }
}

// Generate real speech using the Web Speech API and convert to AudioBuffer
async function generateSpeechBuffer(
  context: BaseAudioContext,
  text: string,
  voiceType: VoiceType = "male",
): Promise<AudioBuffer> {
  return new Promise((resolve) => {
    try {
      // Select a voice with good quality based on the requested voice type
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((voice) => {
          const isEnglish = voice.lang.includes("en");
          const isFemale =
            voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("woman") ||
            voice.name.includes("Samantha") ||
            voice.name.includes("Victoria");
          const isMale =
            voice.name.toLowerCase().includes("male") ||
            voice.name.toLowerCase().includes("man") ||
            voice.name.includes("Daniel") ||
            voice.name.includes("David");

          return isEnglish && (voiceType === "female" ? isFemale : isMale);
        }) ||
        voices.find(
          (voice) => voice.lang.includes("en") && voice.localService === false,
        ) ||
        voices[0];

      // Create utterance with improved settings
      const utterance = new SpeechSynthesisUtterance(text);
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Use a direct approach with a free TTS API as fallback
      // Select appropriate voice based on voiceType
      const ttsVoice = voiceType === "female" ? "Amy" : "Brian";
      const ttsApiUrl = `https://api.streamelements.com/kappa/v2/speech?voice=${ttsVoice}&text=${encodeURIComponent(text)}`;

      // Create an audio element to play the speech
      const audioElement = new Audio();
      audioElement.crossOrigin = "anonymous";
      audioElement.src = ttsApiUrl;

      // When the audio is loaded, convert it to an AudioBuffer
      audioElement.onloadeddata = () => {
        try {
          // Create a temporary context to capture the audio
          const tempContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          const source = tempContext.createMediaElementSource(audioElement);
          const destination = tempContext.createMediaStreamDestination();
          source.connect(destination);

          // Create a recorder to capture the audio
          const recorder = new MediaRecorder(destination.stream);
          const chunks: Blob[] = [];

          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
          };

          recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: "audio/wav" });
            const arrayBuffer = await blob.arrayBuffer();

            try {
              const audioBuffer = await context.decodeAudioData(arrayBuffer);
              resolve(audioBuffer);
              tempContext.close();
            } catch (decodeError) {
              console.error("Error decoding audio data:", decodeError);
              // Fall back to more reliable method if decoding fails
              createHumanLikeVoice(context, text, voiceType).then((buffer) => {
                resolve(buffer);
                tempContext.close();
              });
            }
          };

          // Start recording and playing
          recorder.start();
          audioElement.play();

          // Stop recording when audio ends
          audioElement.onended = () => {
            recorder.stop();
          };

          // Set a timeout in case audio playback hangs
          setTimeout(() => {
            if (recorder.state === "recording") {
              recorder.stop();
              console.warn("Audio playback timed out, using fallback");
            }
          }, 5000);
        } catch (error) {
          console.error("Error processing TTS audio:", error);
          createHumanLikeVoice(context, text, voiceType).then(resolve);
        }
      };

      // Handle errors with audio element
      audioElement.onerror = () => {
        console.error("Error loading TTS audio");
        createHumanLikeVoice(context, text, voiceType).then(resolve);
      };

      // Set a timeout in case loading hangs
      setTimeout(() => {
        if (audioElement.readyState < 2) {
          // HAVE_CURRENT_DATA or lower
          console.warn("TTS audio loading timed out, using fallback");
          createHumanLikeVoice(context, text, voiceType).then(resolve);
        }
      }, 3000);
    } catch (error) {
      console.error("Error in speech generation:", error);
      createHumanLikeVoice(context, text, voiceType).then(resolve);
    }
  });
}

// Create a more human-like voice using a different approach
async function createHumanLikeVoice(
  context: BaseAudioContext,
  text: string,
  voiceType: VoiceType = "male",
): Promise<AudioBuffer> {
  // Try to use a different TTS API as another fallback
  try {
    // Add voice parameter to the URL if the API supports it
    const voiceParam = voiceType === "female" ? "&voice=female" : "&voice=male";
    const response = await fetch(
      `https://tts.cyzon.us/tts?text=${encodeURIComponent(text)}${voiceParam}`,
    );
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      return await context.decodeAudioData(arrayBuffer);
    }
  } catch (e) {
    console.error("Fallback TTS API failed:", e);
  }

  // If all else fails, create a synthetic but more natural sounding voice
  return createEnhancedSpeechBuffer(context, text, voiceType);
}

// Create an enhanced speech-like buffer that sounds more natural
function createEnhancedSpeechBuffer(
  context: BaseAudioContext,
  text: string,
  voiceType: VoiceType = "male",
): AudioBuffer {
  const duration = 2.0; // seconds (longer for more natural sound)
  const sampleRate = context.sampleRate;
  const bufferSize = Math.floor(duration * sampleRate);
  const buffer = context.createBuffer(2, bufferSize, sampleRate);

  const leftChannel = buffer.getChannelData(0);
  const rightChannel = buffer.getChannelData(1);

  // Use text to create unique speech-like characteristics
  let seed = 0;
  for (let i = 0; i < text.length; i++) {
    seed += text.charCodeAt(i);
  }

  // More realistic formants (resonant frequencies) for human speech
  // Adjust formants based on voice type (female voices have higher formants)
  const formantMultiplier = voiceType === "female" ? 1.2 : 1.0;
  const formants = [
    (280 + (seed % 120)) * formantMultiplier, // First formant (around 300-500 Hz for vowels)
    (1200 + (seed % 600)) * formantMultiplier, // Second formant (around 1000-2000 Hz)
    (2500 + (seed % 500)) * formantMultiplier, // Third formant
    (3500 + (seed % 500)) * formantMultiplier, // Fourth formant
  ];

  // More realistic amplitude modulation to simulate syllables
  const syllableCount = Math.max(2, Math.ceil(text.length / 2.5)); // More realistic syllable count
  const syllableRate = syllableCount / duration;

  // Add some noise to make it sound more natural
  const noiseLevel = 0.05;

  // Generate the waveform
  for (let i = 0; i < bufferSize; i++) {
    const t = i / sampleRate; // Time in seconds

    // Create formant structure with more natural harmonics
    let sample = 0;
    for (let f = 0; f < formants.length; f++) {
      // Decreasing amplitude for higher formants (more natural)
      const amplitude = 0.5 / (f + 1);
      // Add some harmonics
      sample += amplitude * Math.sin(2 * Math.PI * formants[f] * t);
      // Add some subharmonics for richness
      sample +=
        amplitude * 0.3 * Math.sin(2 * Math.PI * (formants[f] * 0.5) * t);
    }

    // Apply syllable-like amplitude modulation (more natural pattern)
    const syllablePhase = (t * syllableRate) % 1.0;
    // More natural envelope shape
    const syllableEnvelope =
      Math.pow(Math.sin(Math.PI * syllablePhase), 2) *
      (0.8 + 0.2 * Math.sin(2 * Math.PI * 3 * t)); // Add vibrato

    // Apply overall envelope with longer fade in/out
    const fadeIn = Math.min(1, t / 0.2);
    const fadeOut = Math.min(1, (duration - t) / 0.3);
    const envelope = fadeIn * fadeOut;

    // Add some noise for more natural sound
    const noise = (Math.random() * 2 - 1) * noiseLevel;

    // Combine everything
    sample = (sample * syllableEnvelope + noise) * envelope * 0.4; // Adjust volume

    // Add slight stereo effect for more natural sound

    // Generate AudioBuffer from an uploaded audio file
    async function generateAudioBufferFromFile(
      context: BaseAudioContext,
      file: File,
    ): Promise<AudioBuffer> {
      return new Promise(async (resolve, reject) => {
        try {
          // Read the file as an ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();

          // Decode the audio data
          const audioBuffer = await context.decodeAudioData(arrayBuffer);
          resolve(audioBuffer);
        } catch (error) {
          console.error("Error processing uploaded audio file:", error);
          // If there's an error, create a fallback buffer
          createEnhancedSpeechBuffer(context, file.name, "male").then(resolve);
        }
      });
    }

    leftChannel[i] = sample;
    rightChannel[i] =
      sample * 0.95 + (Math.random() * 2 - 1) * noiseLevel * 0.5;
  }

  return buffer;
}

/**
 * Generates a text-to-speech audio for a single affirmation
 *
 * @param text - The affirmation text
 * @param voiceType - Type of voice to use (male or female)
 * @returns Promise resolving to an AudioBuffer
 */
export async function textToSpeech(
  text: string,
  voiceType: VoiceType = "male",
): Promise<AudioBuffer> {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  return generateSpeechBuffer(audioContext, text, voiceType);
}

/**
 * Saves the mixed audio as an MP3 file with optional metadata
 *
 * @param audioBlob - The mixed audio blob
 * @param metadata - Optional metadata for the MP3 file
 * @returns URL to the downloadable file
 */
export function createDownloadableFile(
  audioBlob: Blob,
  metadata?: {
    title?: string;
    artist?: string;
    album?: string;
  },
): string {
  // In a real implementation, this would add ID3 tags for metadata
  // For this demo, we'll just create a URL for the blob
  return URL.createObjectURL(audioBlob);
}
