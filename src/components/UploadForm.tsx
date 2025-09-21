import React, { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { UploadCloud, X } from "lucide-react";

interface FormData {
  subject: string;
  document_number: string;
  serial_number: string;
  date_of_delivery: string;
  date_of_post: string;
  post_original_sender_id: string;
  delivery_method_id: string;
  postheader: string;
  post_type: string;
  attachment: File | null;
}

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function UploadForm({ onLogout, userEmail }: Props) {
  const [form, setForm] = useState<FormData>({
    subject: "",
    document_number: "",
    serial_number: "",
    date_of_delivery: "",
    date_of_post: "",
    post_original_sender_id: "",
    delivery_method_id: "",
    postheader: "",
    post_type: "",
    attachment: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // خيارات تجريبية
  const senders = [
    { id: "1", name: "Sender 1" },
    { id: "2", name: "Sender 2" },
    { id: "3", name: "Sender 3" },
  ];

  const deliveryMethods = [
    { id: "1", name: "بريد إلكتروني" },
    { id: "2", name: "بريد ورقي" },
    { id: "3", name: "تسليم يدوي" },
  ];

   const deliveryPersons = [
    { id: "1", name:"Person 1" },
    { id: "2", name: "Person 2" },
    { id: "3", name: "Person 3" },
  ];

  
  const postheaders = [
    { id: "out", name: "صادر" },
    { id: "in", name: "وارد" },
  ];

  const postTypes = [
    { id: "internal", name: "داخلي" },
    { id: "external", name: "خارجي" },
  ];



  function validate() {
    const next: Record<string, string> = {};
    if (!form.subject) next.subject = "الرجاء إدخال الموضوع";
    if (!form.document_number) next.document_number = "الرجاء إدخال رقم المستند";
    if (!form.serial_number) next.serial_number = "الرجاء إدخال الرقم التسلسلي";
    if (!form.date_of_delivery) next.date_of_delivery = "الرجاء إدخال تاريخ التسليم";
    if (!form.date_of_post) next.date_of_post = "الرجاء إدخال تاريخ البريد";
    if (!form.post_original_sender_id) next.post_original_sender_id = "اختر جهة الإرسال الأصلية";
    if (!form.delivery_method_id) next.delivery_method_id = "اختر طريقة التسليم";
    if (!form.attachment) next.attachment = "الرجاء رفع المرفق";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleFileChosen(file?: File | null) {
    if (!file) return;
    setForm((s) => ({ ...s, attachment: file }));
    setErrors((e) => {
      const copy = { ...e };
      delete copy.attachment;
      return copy;
    });
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChosen(file);
  }

  function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    handleFileChosen(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setUploading(true);
    setSuccess(null);

    // simulate API
    setTimeout(() => {
      setUploading(false);
      setSuccess("تم رفع البيانات بنجاح ✅");
      setForm({
        subject: "",
        document_number: "",
        serial_number: "",
        date_of_delivery: "",
        date_of_post: "",
        post_original_sender_id: "",
        delivery_method_id: "",
        postheader: "",
        post_type: "",
        attachment: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1200);
  }

  return (
    <div dir="rtl" className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">نموذج رفع المستند</h2>
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject */}
        <label>
          <div className="mb-1 text-sm text-gray-600">الموضوع</div>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
            placeholder="أدخل الموضوع"
          />
          {errors.subject && <div className="text-xs text-red-500">{errors.subject}</div>}
        </label>

        {/* Document number */}
        <label>
          <div className="mb-1 text-sm text-gray-600">رقم المستند</div>
          <input
            value={form.document_number}
            onChange={(e) => setForm({ ...form, document_number: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
            placeholder="أدخل رقم المستند"
          />
          {errors.document_number && <div className="text-xs text-red-500">{errors.document_number}</div>}
        </label>

        {/* Serial number */}
        <label>
          <div className="mb-1 text-sm text-gray-600">الرقم التسلسلي</div>
          <input
            value={form.serial_number}
            onChange={(e) => setForm({ ...form, serial_number: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
            placeholder="أدخل الرقم التسلسلي"
          />
          {errors.serial_number && <div className="text-xs text-red-500">{errors.serial_number}</div>}
        </label>

        {/* Dates */}
        <label>
          <div className="mb-1 text-sm text-gray-600">تاريخ التسليم</div>
          <input
            type="datetime-local"
            value={form.date_of_delivery}
            onChange={(e) => setForm({ ...form, date_of_delivery: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          />
          {errors.date_of_delivery && <div className="text-xs text-red-500">{errors.date_of_delivery}</div>}
        </label>

        <label>
          <div className="mb-1 text-sm text-gray-600">تاريخ البريد</div>
          <input
            type="datetime-local"
            value={form.date_of_post}
            onChange={(e) => setForm({ ...form, date_of_post: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          />
          {errors.date_of_post && <div className="text-xs text-red-500">{errors.date_of_post}</div>}
        </label>

        {/* Dropdown: Original Sender */}
        <label>
          <div className="mb-1 text-sm text-gray-600">جهة الإرسال الأصلية</div>
          <select
            value={form.post_original_sender_id}
            onChange={(e) => setForm({ ...form, post_original_sender_id: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          >
            <option value="">اختر جهة الإرسال</option>
            {senders.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.post_original_sender_id && (
            <div className="text-xs text-red-500">{errors.post_original_sender_id}</div>
          )}
        </label>

        {/* Dropdown: Delivery Method */}
        <label>
          <div className="mb-1 text-sm text-gray-600">طريقة التسليم</div>
          <select
            value={form.delivery_method_id}
            onChange={(e) => setForm({ ...form, delivery_method_id: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          >
            <option value="">اختر الطريقة</option>
            {deliveryMethods.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          {errors.delivery_method_id && (
            <div className="text-xs text-red-500">{errors.delivery_method_id}</div>
          )}
        </label>

             {/* Dropdown: Delivery Method */}
        <label>
          <div className="mb-1 text-sm text-gray-600"> المستلم</div>
          <select
            value={form.delivery_method_id}
            onChange={(e) => setForm({ ...form, delivery_method_id: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          >
            <option value=""> الشخص</option>
            {deliveryPersons.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          {errors.delivery_method_id && (
            <div className="text-xs text-red-500">{errors.delivery_method_id}</div>
          )}
        </label>

         {/* Dropdown: Postheader */}
        <label>
          <div className="mb-1 text-sm text-gray-600">نوع الملف</div>
          <select
            value={form.postheader}
            onChange={(e) => setForm({ ...form, postheader: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          >
            <option value="">اختر نوع الملف</option>
            {postheaders.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.postheader && <div className="text-xs text-red-500">{errors.postheader}</div>}
        </label>

        {/* Dropdown: Post Type */}
        <label>
          <div className="mb-1 text-sm text-gray-600">نوع البريد</div>
          <select
            value={form.post_type}
            onChange={(e) => setForm({ ...form, post_type: e.target.value })}
            className="w-full rounded-md p-3 border border-gray-300"
          >
            <option value="">اختر النوع</option>
            {postTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          {errors.post_type && <div className="text-xs text-red-500">{errors.post_type}</div>}
        </label>

        {/* File upload */}
        <div className="md:col-span-2">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 rounded-lg border-2 border-dashed p-6 flex items-center gap-3 cursor-pointer"
          >
            <UploadCloud />
            <div>
              <div className="text-sm"> اضغط للاختيار</div>
              {form.attachment && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-gray-100 rounded">{form.attachment.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm({ ...form, attachment: null });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {errors.attachment && (
                <div className="text-xs text-red-500 mt-1">{errors.attachment}</div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={onFileInputChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex gap-3 mt-6">
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-60"
          >
            {uploading ? "جارٍ الرفع..." : "Upload"}
          </button>
         
        </div>

        {success && (
          <div className="md:col-span-2 mt-4 p-3 rounded bg-green-50 text-green-800">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
