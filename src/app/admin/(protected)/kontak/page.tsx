import { createClient } from "@/lib/supabase/server";
import KontakViewEdit from "./KontakViewEdit";

export default async function AdminKontakPage() {
  const supabase = await createClient();

  const { data: kontak } = await supabase.from("kontak_desa").select("*").eq("id", 1).single();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Kontak</h1>
        <p className="text-sm text-gray-500 mt-1">Informasi kontak yang tampil di Footer</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 md:p-7 max-w-lg">
        <KontakViewEdit initialData={kontak || { alamat: "", telepon: "" }} />
      </div>
    </main>
  );
}
