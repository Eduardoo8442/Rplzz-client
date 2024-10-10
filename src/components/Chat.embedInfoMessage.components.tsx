import { useEffect, useRef } from "react";

export default function EmbedInfoMessage({hideEmbed} : any) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (embedRef.current && !embedRef.current.contains(event.target as Node)) {
        hideEmbed(null); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideEmbed]);

  return (
    <div
    ref={embedRef}
    className="absolute left-20 z-50 bg-gray-800 text-white rounded-lg shadow-xl p-3 w-44 transition-transform transform hover:scale-105 duration-200"
  >
    <button className="w-full text-left py-2 px-3 hover:bg-red-600 rounded-md text-sm font-medium bg-red-500 transition-colors duration-200">
      Apagar mensagem
    </button>
    <button className="w-full text-left py-2 px-3 hover:bg-blue-600 rounded-md text-sm font-medium bg-blue-500 mt-2 transition-colors duration-200">
      Abrir perfil do usuário
    </button>
  </div>
  );
}
