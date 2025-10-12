// src/components/Footer.jsx
export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-2 text-center shadow-md">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} - Desarrollado por <span className="font-semibold">Eduardo D. Negri</span>
      </p>
    </div>
  );
}
