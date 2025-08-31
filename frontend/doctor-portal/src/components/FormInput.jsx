import React from "react";

export default function FormInput({ icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-12 bg-white/40 rounded-xl placeholder-gray-600 outline-none focus:ring-2 focus:ring-white border border-transparent focus:border-white/50 transition-all duration-300"
      />
      {icon && <i className={`${icon} absolute left-4 top-1/2 -translate-y-1/2 text-gray-600`}></i>}
    </div>
  );
}