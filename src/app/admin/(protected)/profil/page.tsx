import { createClient } from "@/lib/supabase/server";
import ProfilViewEdit from "./ProfilViewEdit";

export default async function AdminProfilPage() {
  const supabase = await createClient();

  const { data: profil } = await supabase.from("profil_desa").select("*").eq("id", 1).single();

  return (
    <main className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profil Desa</h1>
        <p className="text-sm text-gray-500 mt-1">Sejarah, visi, misi, dan deskripsi desa</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-2xl">
        <ProfilViewEdit initialData={profil || { sejarah: "", visi: "", misi: "", deskripsi: "", sambutan_kades: "" }} />
      </div>
    </main>
  );
}
