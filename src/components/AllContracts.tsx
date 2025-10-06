import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/constants";

interface Contract {
  id: string;
  value: string;
  contract_number: string;
  details: string;
  notes: string;
  contract_date: string;
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

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [dropdown1, setDropdown1] = useState<string>("");
  const [dropdown2, setDropdown2] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

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

  // Handle Update button click
  function handleUpdate(contract: Contract) {
    setSelectedContract(contract);
    setDropdown1(""); // Reset dropdowns
    setDropdown2("");
    setFile(null);
    setShowModal(true);
  }

  // Handle Delete button click
  async function handleDelete(id: string) {
    if (!window.confirm("هل أنت متأكد من حذف هذا العقد؟")) return;
    try {
      await fetch(`${API_BASE_URL}/Contracts/delete-contract/${id}`, { method: "DELETE" });
      setContracts(contracts.filter(c => c.id !== id));
    } catch (err) {
      alert("فشل الحذف");
    }
  }

  // Handle modal form submit (Update)
  async function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Example: send update request here
    // You can add file upload logic as needed
    setShowModal(false);
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
                <th className="border p-2">إجراءات</th>
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
                <td className="border p-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded mr-2"
                    onClick={() => handleUpdate(contract)}
                  >
                    تحديث
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(contract.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">تحديث العقد</h3>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-3">
                <label className="block mb-1">رقم العقد:</label>
                <input
                  type="text"
                  value={selectedContract.contract_number}
                  disabled
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">القائمة الأولى:</label>
                <select
                  value={dropdown1}
                  onChange={e => setDropdown1(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  required
                >
                  <option value="">اختر</option>
                  <option value="option1">خيار 1</option>
                  <option value="option2">خيار 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1">القائمة الثانية:</label>
                <select
                  value={dropdown2}
                  onChange={e => setDropdown2(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  required
                >
                  <option value="">اختر</option>
                  <option value="optionA">خيار A</option>
                  <option value="optionB">خيار B</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1">رفع ملف:</label>
                <input
                  type="file"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}