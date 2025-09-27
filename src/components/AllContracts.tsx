import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/constants";

interface Contract {
  id: string;
  value: string;
  contract_number: string;
  details: string;
  notes: string;
  contract_date: string; // Use string if coming from API, or Date if parsed
  project_name: string;
  created_by: string;
  currency: string;
  working: string;
  purchase_order_ref: string;
  contractor: string;
  attachments: string;
}

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function AllContracts({ onLogout, userEmail }: Props) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchPosts() {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${API_BASE_URL}/Contracts/get-contracts`);
          if (!response.ok) throw new Error("Failed to fetch posts");
          const data = await response.json();
          setContracts(data);
        } catch (err: any) {
          console.error(err);
          setError("فشل تحميل البيانات ❌");
        } finally {
          setLoading(false);
        }
      }
  
      fetchPosts();
    }, []);

function getAttachmentUrl(path?: string) {
      if (!path) return null;
      const base = API_BASE_URL.replace(/\/api$/, "");
      return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
    }

      return (
    <div dir="rtl" className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">جميع العقود</h2>
          <p className="text-sm text-gray-500">
            مسجل دخول: <span className="font-medium">{userEmail}</span>
          </p>
        </div>
        <button
          onClick={onLogout}
          className="text-sm px-3 py-2 rounded-md border"
        >
          تسجيل خروج
        </button>
      </div>

      {loading && <div className="text-center py-4">جارٍ تحميل البيانات...</div>}
      {error && <div className="text-red-500 py-4">{error}</div>}

      {!loading && !error && contracts.length === 0 && (
        <div className="text-gray-500 py-4 text-center">لا توجد عقود حالياً</div>
      )}

      {!loading && contracts.length > 0 && (
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">القيمة</th>
              <th className="border p-2">رقم العقد</th>
              <th className="border p-2">التفاصيل</th>
              <th className="border p-2"> الملاحظات</th>
                <th className="border p-2">تاريخ العقد</th>
                <th className="border p-2">اسم المشروع</th>
                <th className="border p-2">أنشئ بواسطة</th>
                <th className="border p-2">العملة</th>
                
                <th className="border p-2">مرجع أمر الشراء</th>
                <th className="border p-2">المقاول</th>
                <th className="border p-2">المرفقات</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50">
                <td className="border p-2">{contract.value}</td>
                <td className="border p-2">{contract.contract_number}</td>
                <td className="border p-2">{contract.details}</td>
                <td className="border p-2">{contract.notes}</td>
                <td className="border p-2">{new Date(contract.contract_date).toISOString()}</td>
                <td className="border p-2">{contract.project_name}</td>
                <td className="border p-2">{contract.created_by}</td>
                <td className="border p-2">{contract.currency}</td>
                <td className="border p-2">{contract.purchase_order_ref}</td>
                <td className="border p-2">{contract.contractor}</td>

                <td className="border p-2">
                  {contract.attachments ? (
                    <a 
                    href={getAttachmentUrl(contract.attachments)} 
                    target="_blank" 
                    className="text-blue-600 underline">عرض المرفق</a>
                  ) : (
                    "لا يوجد"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}