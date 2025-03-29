import React, { useEffect, useRef, useState } from "react";

const AudioTracking = () => {
  const [isMicrophoneAccessGranted, setMicrophoneAccessGranted] = useState(false);
  const [noiseDetected, setNoiseDetected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    const initAudioTracking = async () => {
      try {
        // Request access to the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneAccessGranted(true);

        // Set up the Web Audio API
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();

        // Connect the microphone to the analyser
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        microphoneRef.current.connect(analyserRef.current);

        // Set up the data array for audio level visualization
        analyserRef.current.fftSize = 256; // Determines the frequency resolution
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        monitorAudioLevels();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initAudioTracking();

    return () => {
      // Clean up the audio context when the component is unmounted
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const monitorAudioLevels = () => {
    const checkAudio = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      // Analyze audio levels
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const avgLevel = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;

      setAudioLevel(avgLevel);

      // Detect noise (threshold can be adjusted based on your needs)
      if (avgLevel > 50) {
        setNoiseDetected(true);
      } else {
        setNoiseDetected(false);
      }

      requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Audio Tracking
        </h2>
        {isMicrophoneAccessGranted ? (
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-700">
              Microphone Access: <span className="font-semibold">{noiseDetected ? "Noise Detected" : "No Noise"}</span>
            </p>
            <p className="text-lg text-gray-700">
              Audio Level: <span className="font-semibold">{audioLevel.toFixed(2)}</span>
            </p>
          </div>
        ) : (
          <p className="text-lg text-red-600">Microphone access is required</p>
        )}
      </div>
    </div>
  );
};

export default AudioTracking;
