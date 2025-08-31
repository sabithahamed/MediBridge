// src/components/Card.jsx
import React from 'react';

export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div>
        {children}
      </div>
    </div>
  );
}