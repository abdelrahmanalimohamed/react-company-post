// BaseForm.tsx
import React, { useState } from "react";
import { API_BASE_URL } from "../config/constants";

interface BaseFormProps {
  title: string;
  endpoint: string;
  onLogout: () => void;
  userEmail?: string;
  extraFields?: React.ReactNode;
}

export default function BaseForm({
  title,
  endpoint,
  onLogout,
  userEmail,
  extraFields,
}: BaseFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setMessage(null);

  const form = e.currentTarget;
  const formData = new FormData(form);
  //console.log("Form Data Entries:" + [...formData.entries()]); ;

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const serverMessage = errorData?.Message || res.statusText;
      throw new Error(serverMessage || "فشل في الحفظ ❌");
    }

    const data = await res;
    setMessage(data.Message || "تم الحفظ بنجاح ✅");
    form.reset();
    
  } catch (err: any) {
    setMessage(err.message || "حدث خطأ أثناء الحفظ ❌");
  } finally {
    setLoading(false);
  }
}


  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-md rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
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
      {/* 👇 Specific contractor fields injected here */}
      {extraFields}

      {/* Message display */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("نجاح")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-medium shadow-sm hover:from-indigo-700 disabled:opacity-60"
      >
        {loading ? "جاري الحفظ..." : "حفظ"}
      </button>
    </form>
  );
}

