cd C:\temp-frontend

# REEMPLAZA TODO EL ARCHIVO
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
      console.error("Error:", e);
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
      alert(`Zona "${name}" añadida!`);
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-green-800 mb-2">
            GreenAI Control
          </h1>
          <p className="text-green-600 text-lg">Gestión Inteligente de Invernaderos</p>
        </header>

        {/* ZONAS + BOTÓN */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Zonas Activas</h2>
            
            {/* ESTE ES TU NUEVO BOTÓN */}
            <button
              onClick={addZone}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-110 hover:shadow-2xl flex items-center gap-3 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              AÑADIR ZONA
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : zones.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-xl italic">No hay zonas registradas</p>
              <p className="text-gray-400 mt-2">Haz clic en "AÑADIR ZONA" para comenzar</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <h3 className="font-bold text-xl text-green-800 mb-3">{zone.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">Área:</span> {zone.area} m²
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Cubierta:</span> {zone.cover}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                      {new Date(zone.created_at).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GRÁFICO */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Rendimiento</h2>
          <div className="h-80">
            <ProfitChart />
          </div>
        </div>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Backend: Railway + PostgreSQL</p>
          <p>Frontend: Vercel + Tailwind</p>
          <p className="mt-2">
            API: <a href={API_URL} target="_blank" className="text-green-600 underline">{API_URL}</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
'@ | Out-File -FilePath "src/pages/Dashboard.tsx" -Encoding UTF8 -Force

Write-Host "DASHBOARD 100% ACTUALIZADO CON BOTÓN VERDE!" -ForegroundColor Green