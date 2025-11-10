@'
import { useState, useEffect } from "react";
import ProfitChart from "../components/ProfitChart";

interface Zone {
  id: number;
  name: string;
  area: number;
  cover: string;
  created_at: string;
}

export default function Dashboard() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://web-production-8930b.up.railway.app/api/zones";

  const loadZones = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setZones(data);
    } catch (e) {
      console.error("Error cargando zonas:", e);
    } finally {
      setLoading(false);
    }
  };

  const addZone = async () => {
    const name = prompt("Nombre de la zona:");
    if (!name?.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() })
      });
      await loadZones();
      alert(`Zona "${name}" añadida con éxito!`);
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-2">
            GreenAI Control
          </h1>
          <p className="text-green-600 text-lg">Gestión Inteligente de Invernaderos</p>
        </header>

        {/* ZONAS */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">Zonas Activas</h2>
            <button
              onClick={addZone}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Añadir Zona
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-8">Cargando zonas...</p>
          ) : zones.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 italic text-lg">No hay zonas registradas</p>
              <p className="text-sm text-gray-400 mt-2">Haz clic en "Añadir Zona" para comenzar</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="border border-green-200 rounded-xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg text-green-800 mb-2">{zone.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Área: <span className="font-medium">{zone.area} m²</span></p>
                    <p>Cubierta: <span className="font-medium">{zone.cover}</span></p>
                    <p className="text-xs text-gray-500 mt-3">
                      {new Date(zone.created_at).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GRÁFICO (TU COMPONENTE) */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rendimiento</h2>
          <ProfitChart />
        </div>

        {/* FOOTER */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Backend: Railway + PostgreSQL</p>
          <p>Frontend: Vercel + Tailwind</p>
          <p className="mt-2">
            API: <a href={API_URL} target="_blank" className="text-green-600 underline hover:text-green-700">{API_URL}</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
'@ | Out-File -FilePath "src/pages/Dashboard.tsx" -Encoding UTF8 -Force

Write-Host "Dashboard.tsx ACTUALIZADO con BOTÓN FUNCIONAL!" -ForegroundColor Green