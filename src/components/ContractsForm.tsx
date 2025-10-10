import React, { useState, useEffect } from "react";
import BaseForm from "./BaseForm";
import { API_BASE_URL } from "../config/constants";

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function ContractsForm({ onLogout, userEmail }: Props) {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [contractors, setContractors] = useState<{ id: string; name: string }[]>([]);
  const [serialNumber, setSerialNumber] = useState<number>();

  // Fetch dropdown data
  useEffect(() => {
    fetch(`${API_BASE_URL}/Publisher/get-projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));

    fetch(`${API_BASE_URL}/Publisher/get-suppliers`)
      .then((res) => res.json())
      .then((data) => setContractors(data))
      .catch(() => setContractors([]));

      
    fetch(`${API_BASE_URL}/Contracts/GetContractMaxSerialNumber`)
                  .then((res) => res.json())
                  .then((data) => setSerialNumber(data))
                  .catch(() => setSerialNumber(0));
  }, []);

  return (
    <BaseForm
      title="نموذج العقد"
      endpoint="/Contracts/create-contract"
      onLogout={onLogout}
      userEmail={userEmail}
      extraFields={
        <>
      <label className="block mb-4">
            <span className="text-sm text-gray-600">الرقم التسلسلي</span>
            <input
              type="text"
              name="SerialNumber"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل الرقم التسلسلي"
              value={serialNumber}
              readOnly
            />
          </label>
          
          {/* Value */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">قيمة العقد</span>
            <input
              type="text"
              name="value"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل قيمة العقد"
              required
            />
          </label>

          {/* Details */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">تفاصيل العقد</span>
            <input
              type="text"
              name="details"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل تفاصيل العقد"
              required
            />
          </label>

          {/* Contract Number */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">رقم العقد</span>
            <input
              type="text"
              name="contract_num"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل رقم العقد"
              required
            />
          </label>

          {/* Contract Date */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">تاريخ العقد</span>
            <input
              type="datetime-local"
              name="contract_date"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            />
          </label>

          {/* Contractor (PersonOrg) */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">المقاول</span>
            <select
              name="person_org_id"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر المقاول</option>
              {contractors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          {/* Working */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">العمل</span>
            <input
              type="text"
              name="working"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="مثال: قيد التنفيذ"
              required
            />
          </label>

          {/* Notes */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">ملاحظات</span>
            <textarea
              name="notes"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل الملاحظات"
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

          {/* Currency */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">العملة</span>
            <select
              name="currency"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر العملة</option>
              <option value="1">دولار أمريكي (USD)</option>
              <option value="2">يورو (EUR)</option>
              <option value="3">جنيه مصري (EGP)</option>
              <option value="4">ريال سعودي (SAR)</option>
            </select>
          </label>

          {/* Purchase Order Ref */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">مرجع أمر التوريد</span>
            <input
              type="text"
              name="purchase_order_ref"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل المرجع"
            />
          </label>

          {/* Attachments */}
          <label className="block mb-6">
            <span className="text-sm text-gray-600">المرفقات</span>
            <input
              type="file"
              name="attachments"
              className="mt-1 block w-full text-sm text-gray-600"
              required
            />
          </label>
        </>
      }
    />
  );
}
