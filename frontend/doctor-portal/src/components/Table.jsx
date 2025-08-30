function Table({ headers, data }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          {headers.map((header, index) => (
            <th key={index} className="p-2 text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b">
            {Object.values(row).map((value, i) => (
              <td key={i} className="p-2">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table