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

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to save data");
    }

    const data = await res.json();
    // Match PascalCase from ASP.NET response
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

      {/* Shared fields */}
      <label className="block mb-4">
        <span className="text-sm text-gray-600">اسم المستند</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md p-3 border border-gray-200"
          placeholder="أدخل اسم المستند"
        />
      </label>
      {/* 👇 Specific contractor fields injected here */}
      {extraFields}

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

