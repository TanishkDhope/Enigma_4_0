import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js"; // Import face-api.js

const FaceDetectionComponent = () => {
  const webcamRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models/ssdMobilenetv1");
      // Load model files from your server or public folder
      setIsModelLoaded(true);
    };

    loadModels();

    return () => {
      // Cleanup
      faceapi.nets.ssdMobilenetv1.dispose();
    };
  }, []);

  const handleVideoOnPlay = () => {
    if (webcamRef.current && isModelLoaded) {
      const video = webcamRef.current.video;

      const detectFaces = async () => {
        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors();
        setDetections(detections);
        requestAnimationFrame(detectFaces); // Loop the detection
      };

      detectFaces();
    }
  };

  console.log(detections);

  return (
    <div>
      <h2>Webcam Feed</h2>
      <Webcam
        className="w-[50vw]"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: "user",
        }}
        onPlay={handleVideoOnPlay} // Start face detection when video plays
      />

      {isModelLoaded && detections.length > 0 && (
        <div>
          <h3>Detected Face Data:</h3>
          <pre>{JSON.stringify(detections, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FaceDetectionComponent;
