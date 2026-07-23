import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Struktur Perangkat Desa Siboro",
  description: "Daftar Kepala Desa dan perangkat Desa Siboro, Kecamatan Sianjur Simula, Kabupaten Samosir.",
};

function DefaultAvatar() {
  return (
    <div className="w-full h-full bg-blue-50 flex items-center justify-center">
      <svg className="w-1/2 h-1/2 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 2.239-7 5v2h14v-2c0-2.761-3.134-5-7-5z" />
      </svg>
    </div>
  );
}

export default async function StrukturPage() {
  const supabase = await createClient();

  const [{ data: perangkat }, { data: struktur }] = await Promise.all([
    supabase.from("perangkat_desa").select("*").order("urutan", { ascending: true }),
    supabase.from("struktur_desa").select("*").eq("id", 1).single(),
  ]);

  const mode = struktur?.mode || "manual";

  const kepalaDesa = perangkat?.[0];
  const perangkatLain = perangkat?.slice(1) || [];

  return (
    <main className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Pemerintahan Desa
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Struktur Perangkat Desa</h1>
          <div className="w-12 h-1 bg-blue-700 mx-auto mt-4 rounded-full" />
        </div>

        {mode === "gambar" && struktur?.gambar_url ? (
          <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={struktur.gambar_url} alt="Struktur Perangkat Desa Siboro" className="w-full h-auto" />
          </div>
        ) : perangkat && perangkat.length > 0 ? (
          <>
            {/* KEPALA DESA - ditonjolkan */}
            {kepalaDesa && (
              <div className="flex justify-center mb-14">
                <div className="text-center bg-gray-50 border border-gray-100 rounded-2xl px-10 py-8 max-w-xs">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-md">
                    {kepalaDesa.foto_url ? (
                      <Image src={kepalaDesa.foto_url} alt={kepalaDesa.nama} fill className="object-cover" />
                    ) : (
                      <DefaultAvatar />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mt-4">{kepalaDesa.nama}</h3>
                  <p className="text-sm text-blue-700 font-medium mt-1">{kepalaDesa.jabatan}</p>
                </div>
              </div>
            )}

            {/* PERANGKAT LAINNYA */}
            {perangkatLain.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {perangkatLain.map((p) => (
                  <div
                    key={p.id}
                    className="text-center bg-white border border-gray-100 rounded-2xl px-4 py-6 hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden ring-2 ring-gray-50">
                      {p.foto_url ? (
                        <Image src={p.foto_url} alt={p.nama} fill className="object-cover" />
                      ) : (
                        <DefaultAvatar />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 mt-3">{p.nama}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{p.jabatan}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-center py-10">Belum ada data perangkat desa.</p>
        )}
      </div>
    </main>
  );
}