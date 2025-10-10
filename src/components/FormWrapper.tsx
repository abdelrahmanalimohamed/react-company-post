import React, { useState } from "react";
import ContractorForm from "./ContractsForm";
// import AllPosts from "./AllPosts";
// import AllContracts from "./AllContracts";
import PostInternal from "./PostInternal";
import PostExternal from "./PostExternal";
import PostTransformer from "./PostTransformer";
import Incoming from "./Incoming";

interface Props {
  onLogout: () => void;
  userEmail?: string;
}

export default function FormTabs({ onLogout, userEmail }: Props) {
  const [activeTab, setActiveTab] = useState<"postinternal" | "postexternal"| "posttransformer" | "incoming" |"contractor" | "allposts" | "allcontracts">("postinternal");

  return (
    <div dir="rtl" className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
      {/* Tabs header */}
      <div className="flex border-b mb-6">

        <button
          onClick={() => setActiveTab("postinternal")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "postinternal"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
           صادر داخلي
        </button>

        <button
          onClick={() => setActiveTab("postexternal")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "postexternal"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
           صادر خارجي
        </button>

         <button
          onClick={() => setActiveTab("posttransformer")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "posttransformer"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
           صادر محول
        </button>

         <button
          onClick={() => setActiveTab("incoming")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "incoming"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
            وارد
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



      </div>

      {/* Tabs content */}
      {activeTab === "postinternal" && (
        <PostInternal onLogout={onLogout} userEmail={userEmail} />
      )}
       {activeTab === "postexternal" && (
        <PostExternal onLogout={onLogout} userEmail={userEmail} />
      )}
      {activeTab === "posttransformer" && (
        <PostTransformer onLogout={onLogout} userEmail={userEmail} />
      )}
       {activeTab === "incoming" && (
        <Incoming onLogout={onLogout} userEmail={userEmail} />
      )}
      {activeTab === "contractor" && (
        <ContractorForm onLogout={onLogout} userEmail={userEmail} />
      )}
      {/* {activeTab === "allposts" && (
        <AllPosts onLogout={onLogout} userEmail={userEmail} />
      )}
       {activeTab === "allcontracts" && (
        <AllContracts onLogout={onLogout} userEmail={userEmail} />
      )} */}
    </div>
  );
}
