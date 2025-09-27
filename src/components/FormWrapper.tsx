import React, { useState } from "react";
import UploadForm from "./UploadForm";
import ContractorForm from "./ContractsForm";
import AllPosts from "./AllPosts";

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function FormTabs({ onLogout, userEmail }: Props) {
  const [activeTab, setActiveTab] = useState<"upload" | "contractor" | "allposts">("upload");

  return (
    <div dir="rtl" className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
      {/* Tabs header */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "upload"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
           مستند
        </button>
        <button
          onClick={() => setActiveTab("contractor")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "contractor"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          عقود
        </button>

         <button
          onClick={() => setActiveTab("allposts")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "allposts"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          كل المستندات
        </button>
      </div>

      {/* Tabs content */}
      {activeTab === "upload" && (
        <UploadForm onLogout={onLogout} userEmail={userEmail} />
      )}
      {activeTab === "contractor" && (
        <ContractorForm onLogout={onLogout} userEmail={userEmail} />
      )}
      {activeTab === "allposts" && (
        <AllPosts onLogout={onLogout} userEmail={userEmail} />
      )}
    </div>
  );
}
