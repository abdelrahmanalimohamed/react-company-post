// UploadForm.tsx
import React, { useState, useEffect } from "react";
import BaseForm from "./BaseForm";
import { API_BASE_URL } from "../config/constants";

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function UploadForm({ onLogout, userEmail }: Props) {
  const [senders, setSenders] = useState<{ id: string; name: string }[]>([]);
  const [deliveryMethods, setDeliveryMethods] = useState<{ id: string; name: string }[]>([]);
  const [postheaders, setPostheaders] = useState<{ id: string; name: string }[]>([]);
  const [postTypes, setPostTypes] = useState<{ id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);

  // Fetch static dropdowns on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/PostHeader/get-post_headers`)
      .then(res => res.json())
      .then(data => setPostheaders(data))
      .catch(() => setPostheaders([]));

    fetch(`${API_BASE_URL}/PersonOrg/get-person-orgs`)
      .then(res => res.json())
      .then(data => setSenders(data))
      .catch(() => setSenders([]));

    fetch(`${API_BASE_URL}/DeliveryMethods/get-delivery-methods`)
      .then(res => res.json())
      .then(data => setDeliveryMethods(data))
      .catch(() => setDeliveryMethods([]));

    fetch(`${API_BASE_URL}/Projects/get-projects`)
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch(() => setProjects([]));
  }, []);

  // Fetch post types when postheader changes
  const handlePostHeaderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setPostTypes([]);
      return;
    }
    fetch(`${API_BASE_URL}/PostTypes/get-post-types/${value}`)
      .then(res => res.json())
      .then(data => setPostTypes(data))
      .catch(() => setPostTypes([]));
  };

  return (
    <BaseForm
      title="نموذج رفع المستند"
      endpoint="/Posts/create-post"
      onLogout={onLogout}
      userEmail={userEmail}
      extraFields={
        <>
          {/* Subject */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">الموضوع</span>
            <input
              type="text"
              name="subject"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل الموضوع"
              required
            />
          </label>

          {/* Document number */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">رقم المستند</span>
            <input
              type="text"
              name="document_number"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل رقم المستند"
              required
            />
          </label>

          {/* Serial number */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">الرقم التسلسلي</span>
            <input
              type="text"
              name="serial_number"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل الرقم التسلسلي"
              required
            />
          </label>

          {/* Dates */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">تاريخ التسليم</span>
            <input
              type="datetime-local"
              name="date_of_delivery"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            />
          </label>

           {/* Project */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">المشروع</span>
            <select
              name="project_id"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر المشروع</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>


          <label className="block mb-4">
            <span className="text-sm text-gray-600">تاريخ البريد</span>
            <input
              type="datetime-local"
              name="date_of_post"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            />
          </label>

          {/* Dropdown: Original Sender */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">جهة الإرسال الأصلية</span>
            <select
              name="post_original_sender_id"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر جهة الإرسال</option>
              {senders.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>

          {/* Dropdown: Delivery Method */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">طريقة التسليم</span>
            <select
              name="delivery_method_id"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر الطريقة</option>
              {deliveryMethods.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </label>

          {/* Dropdown: Postheader */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">نوع المستند</span>
            <select
              name="post_header_id"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              onChange={handlePostHeaderChange}
              required
            >
              <option value="">اختر نوع الملف</option>
              {postheaders.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>

          {/* Dropdown: Post Type */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">نوع البريد</span>
            <select
              name="post_type_id"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر النوع</option>
              {postTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </label>

          <label className="block mb-6">
            <span className="text-sm text-gray-600">المرفقات</span>
            <input
              type="file"
              name="attachment"
              className="mt-1 block w-full text-sm text-gray-600"
              required
            />
          </label>
        </>
      }
    />
  );
}
