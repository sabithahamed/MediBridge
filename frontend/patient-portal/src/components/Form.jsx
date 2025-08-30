function Form({ fields, onSubmit, buttonText }) {
  return (
    <form onClick={onSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {buttonText}
      </button>
    </form>
  )
}

export default Form