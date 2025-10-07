import { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

export default function GlobeAnimation({ lat, lng, cityName }) {
  const globeRef = useRef();
  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    if (!lat || !lng) return;

    setMarkers([{ lat, lng, label: cityName }]);

    const globe = globeRef.current;
    if (globe) {
      globe.pointOfView({ lat: 0, lng: 0, altitude: 3.5 });
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;

      setTimeout(() => {
        globe.controls().autoRotate = false;
        globe.pointOfView({ lat, lng, altitude: 1.1 }, 2500);
      }, 3000);

      const canvas = globeRef.current?.__canvas;
      if (canvas) {
        canvas.style.borderRadius = "50%";
      }
    }
  }, [lat, lng, cityName]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex justify-center">
      <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-lg">
        <Globe
          ref={globeRef}
          width={320}
          height={320}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          labelsData={markers}
          labelLat={(d) => d.lat}
          labelLng={(d) => d.lng}
          labelText={(d) => d.label}
          labelSize={1.4}
          labelDotRadius={0.4}
          labelColor={() => "rgba(255,255,255,0.85)"}
        />

        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md text-black px-4 py-2 rounded-full shadow-md">
          📍 {cityName}
        </div>
      </div>
    </div>
  );
}
