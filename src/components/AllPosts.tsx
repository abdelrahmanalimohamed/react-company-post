import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/constants";

interface Post {
  id: string;
  subject: string;
  document_number: string;
  serial_number: string;
  date_of_delivery: string;
  date_of_post: string;
  post_original_sender_id: string;
  delivery_method_id: string;
  post_header_id: string;
  post_type_id: string;
  attachment_url?: string;
}

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function AllPosts({ onLogout, userEmail }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/Posts/get-posts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
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
          <h2 className="text-xl font-semibold">جميع المستندات</h2>
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

      {!loading && !error && posts.length === 0 && (
        <div className="text-gray-500 py-4 text-center">لا توجد مستندات حالياً</div>
      )}

      {!loading && posts.length > 0 && (
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">الموضوع</th>
              <th className="border p-2">رقم المستند</th>
              <th className="border p-2">الرقم التسلسلي</th>
              <th className="border p-2">تاريخ التسليم</th>
              <th className="border p-2">تاريخ البريد</th>
              <th className="border p-2">جهة الإرسال</th>
              <th className="border p-2">طريقة التسليم</th>
              <th className="border p-2">نوع المستند</th>
              <th className="border p-2">نوع البريد</th>
              <th className="border p-2">مرفق</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border p-2">{post.subject}</td>
                <td className="border p-2">{post.document_number}</td>
                <td className="border p-2">{post.serial_number}</td>
                <td className="border p-2">{new Date(post.date_of_delivery).toISOString()}</td>
                <td className="border p-2">{new Date(post.date_of_post).toLocaleString()}</td>
                <td className="border p-2">{post.post_original_sender_id}</td>
                <td className="border p-2">{post.delivery_method_id}</td>
                <td className="border p-2">{post.post_header_id}</td>
                <td className="border p-2">{post.post_type_id}</td>
                <td className="border p-2">
                  {post.attachment_url ? (
                    <a 
                    href={getAttachmentUrl(post.attachment_url)} 
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
