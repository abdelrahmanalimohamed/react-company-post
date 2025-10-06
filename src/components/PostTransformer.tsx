// UploadForm.tsx
import React, { useState, useEffect } from "react";
import BaseForm from "./BaseForm";
import { API_BASE_URL } from "../config/constants";

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function PostTransformer({ onLogout, userEmail }: Props) {
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const [selection, setSelection] = useState("");
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);
  const [publishedId, setPublishedId] = useState("");
  const [deliveryDirection, setDeliveryDirection] = useState<{ id: string; name: string }[]>([]);
  const [deliverySelectedOption, setDeliverysetSelectedOption] = useState("");
  const [recivedFromId, setRecivedFromId] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [serialNumber, setSerialNumber] = useState<number>();
  const [documentType, setDocumentType] = useState("");

  // Fetch static dropdowns on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/Company/get-companies`)
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch(() => setCompanies([]));

    fetch(`${API_BASE_URL}/PostTransformer/GetPostTransformerMaxSerialNumber`)
            .then((res) => res.json())
            .then((data) => setSerialNumber(data))
            .catch(() => setSerialNumber(0));
  }, []);

   useEffect(() => {
    if (deliverySelectedOption === "Department") {
    fetch(`${API_BASE_URL}/Department/get-departments`)
        .then((res) => res.json())
          .then((data) => setDeliveryDirection(data))
            .catch(() => setDeliveryDirection([]));

    } else if (deliverySelectedOption === "Project") {
      fetch(`${API_BASE_URL}/Publisher/get-projects`)
        .then((res) => res.json())
        .then((data) => setDeliveryDirection(data))
        .catch(() => setDeliveryDirection([]));

    }
  }, [deliverySelectedOption]);

  useEffect(() => {
    if (selection === "Department") {
    fetch(`${API_BASE_URL}/Department/get-departments`)
        .then((res) => res.json())
          .then((data) => setOptions(data))
            .catch(() => setOptions([]));

    } else if (selection === "Project") {
      fetch(`${API_BASE_URL}/Projects/get-projects`)
        .then((res) => res.json())
        .then((data) => setOptions(data))
        .catch(() => setOptions([]));

    }
  }, [selection]);

  return (
    <BaseForm
      title=" صادر محول"
      endpoint="/PostTransformer/CreatePostTransformer"
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
            <span className="text-sm text-gray-600">الشركة</span>
            <select
              name="CompanyId"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              required
            >
              <option value="">اختر الشركة</option>
              {companies.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
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
          value={publishedId}
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
            <span className="text-sm text-gray-600"> جهة التسليم</span>
            <select
                value={deliverySelectedOption}
                onChange={(e) => setDeliverysetSelectedOption(e.target.value)}
                className="mt-1 block w-full rounded-md p-3 border border-gray-200"
            >
                <option value="">اختر</option>
                <option value="Department">إدارة</option>
                <option value="Project">مشروع</option>
            </select>
             </label>

             <label className="block mb-4">
        <span className="text-sm text-gray-600">
            مستلم من قبل
        </span>
        <select
          name="RecivedFromId" 
          value={recivedFromId}
          onChange={(e) => setRecivedFromId(e.target.value)}
          className="mt-1 block w-full rounded-md p-3 border border-gray-200"
          disabled={!options.length}
        >
          <option value="">اختر</option>
          {deliveryDirection.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
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

          <label className="block mb-4">
            <span className="text-sm text-gray-600">خاص بأعمال</span>
            <input
              type="text"
              name="Working"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder=" خاص بأعمال"
              required
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

            <label className="block mb-4">
            <span className="text-sm text-gray-600">رقم الصادر</span>
            <input
              type="text"
              name="PostNumber"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="رقم الصادر"
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

            <label className="block mb-4">
            <span className="text-sm text-gray-600">رقم الوارد </span>
            <input
              type="text"
              name="IncomingNumber"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder=" رقم الوارد "
              required
            />
          </label>

        <label className="block mb-4">
            <span className="text-sm text-gray-600"> اسم المستلم </span>
            <input
              type="text"
              name="RecivedName"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="  اسم المستلم "
              required
            />
          </label>

           <label className="block mb-4">
            <span className="text-sm text-gray-600"> شخص المتابعة </span>
            <input
              type="text"
              name="FollowingPerson"
              className="mt-1 block w-full rounded-md p-3 border border-gray-200"
              placeholder="   شخص المتابعة "
              required
            />
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
