// src/components/FormInput.jsx
export default function FormInput({ label, ...props }) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className="peer w-full rounded-lg border border-gray-300 p-3 bg-white text-gray-800 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none"
      />
      <label className="absolute left-3 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400">
        {label}
      </label>
    </div>
  );
}
