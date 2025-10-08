// UploadForm.tsx
import React, { useState, useEffect } from "react";
import BaseForm from "./BaseForm";
import { API_BASE_URL } from "../config/constants";

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function InComing({ onLogout, userEmail }: Props) {
  const [projectsAndDepartments , setProjectsAndDepartments] = useState<{ id: string; name: string }[]>([]);
  const [projects , setProjects] = useState<{ id: string; name: string }[]>([]);
  const [selection, setSelection] = useState("");
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);
  const [PublishedId, setPublishedId] = useState("");
  const [OriginalPublisherId, setOriginalPublisherId] = useState("");
  const [ProjectId, setProjectId] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [serialNumber, setSerialNumber] = useState<number>();
  const [documentType, setDocumentType] = useState("");

  // Fetch static dropdowns on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/Publisher/projects-departments`)
            .then((res) => res.json())
            .then((data) => setProjectsAndDepartments(data))
            .catch(() => setProjectsAndDepartments([]));

    fetch(`${API_BASE_URL}/Publisher/get-projects`)
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch(() => setProjects([]));

    fetch(`${API_BASE_URL}/Incoming/GetIncomingMaxSerialNumber`)
            .then((res) => res.json())
            .then((data) => setSerialNumber(data))
            .catch(() => setSerialNumber(0));
  }, []);

    // Fetch options based on selection
  useEffect(() => {
    if (selection === "Department") {
    fetch(`${API_BASE_URL}/Department/get-departments`)
        .then((res) => res.json())
          .then((data) => setOptions(data))
            .catch(() => setOptions([]));

    } else if (selection === "Project") {
      fetch(`${API_BASE_URL}/Publisher/get-projects`)
        .then((res) => res.json())
        .then((data) => setOptions(data))
        .catch(() => setOptions([]));

    }
  }, [selection]);

  return (
    <BaseForm
      title="وارد"
      endpoint="/Incoming/CreateIncoming"
      onLogout={onLogout}
      userEmail={userEmail}
      extraFields={
        <>
        
          {/* Serial number */}
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
          
           <label className="block mb-4">
            <span className="text-sm text-gray-600"> نوع المستند</span>
            <select
                name="DocumentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="mt-1 block w-full rounded-md p-3 border border-gray-200"
            >
                <option value="">اختر</option>
                <option value="1">إيميل</option>
                <option value="2">مذكرة داخلية</option>
            </select>
            </label>

          {/* Document number */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">رقم المستند</span>
            <input
              type="text"
              name="DocumentNumber"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل رقم المستند"
              required
            />
          </label>
          

            <label className="block mb-4">
            <span className="text-sm text-gray-600"> جهة الصدور</span>
            <select
                value={selection}
                onChange={(e) => setSelection(e.target.value)}
                className="mt-1 block w-full rounded-md p-3 border border-gray-200"
            >
                <option value="">اختر</option>
                <option value="Department">إدارة</option>
                <option value="Project">مشروع</option>
            </select>
             </label>

        <label className="block mb-4">
        <span className="text-sm text-gray-600">
         صادر من
        </span>
        <select
          name="PublishedId"
          value={PublishedId}
          onChange={(e) => setPublishedId(e.target.value)}
          className="mt-1 block w-full rounded-md p-3 border border-gray-200"
          disabled={!options.length}
        >
          <option value="">اختر</option>
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

         <label className="block mb-4">
        <span className="text-sm text-gray-600">
        صادر أصلي
        </span>
        <select
          name="OriginalPublisherId"
          value={OriginalPublisherId}
          onChange={(e) => setOriginalPublisherId(e.target.value)}
          className="mt-1 block w-full rounded-md p-3 border border-gray-200"
        >
          <option value="">اختر</option>
          {projectsAndDepartments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

       <label className="block mb-4">
        <span className="text-sm text-gray-600">
       خاص بمشروع 
        </span>
        <select
          name="ProjectId"
          value={ProjectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="mt-1 block w-full rounded-md p-3 border border-gray-200"
          disabled={!projects.length}
        >
          <option value="">اختر</option>
          {projects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>


            

           <label className="block mb-4">
            <span className="text-sm text-gray-600"> طريقة التسليم</span>
            <select
                name="DeliveryMethod"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="mt-1 block w-full rounded-md p-3 border border-gray-200"
            >
                <option value="">اختر</option>
                <option value="1">يدويا</option>
                <option value="2">إيميل</option>
                <option value="3">فاكس</option>
            </select>
             </label>
          {/* Subject */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">الموضوع</span>
            <input
              type="text"
              name="Subject"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="أدخل الموضوع"
              required
            />
          </label>

          {/* Dates */}
          <label className="block mb-4">
            <span className="text-sm text-gray-600">تاريخ المستند</span>
            <input
              type="date"
              name="DocumentDate"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm text-gray-600">تاريخ التسليم</span>
            <input
              type="date"
              name="DeliveryDate"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            />
          </label>

            <label className="block mb-4">
            <span className="text-sm text-gray-600">تاريخ الحفظ</span>
            <input
              type="date"
              name="SaveDate"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            />
          </label>

           <label className="block mb-4">
            <span className="text-sm text-gray-600">ملخص</span>
            <input
              type="text"
              name="Summary"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder=" ملخص"
              required
            />
          </label>

           <label className="block mb-4">
            <span className="text-sm text-gray-600">ملاحظات </span>
            <input
              type="text"
              name="Notes"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder=" ملاحظات "
              required
            />
          </label>
            {/* Attachments */}
          <label className="block mb-6">
            <span className="text-sm text-gray-600">المرفقات</span>
            <input
              type="file"
              name="Attachments"
              className="mt-1 block w-full text-sm text-gray-600"
              required
              multiple
            />
          </label>
        </>
      }
    />
  );
}
