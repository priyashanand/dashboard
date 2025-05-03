import type { TableProps } from '../../types'; // Import table types

/**
 * Generic Table Component
 * Renders data in a table format based on column definitions.
 * @template T - The type of data objects in the table.
 */
export function Table<T extends { id: string | number }>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <div className="overflow-x-auto"> {/* Allows horizontal scrolling on smaller screens */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={`${keyExtractor(item)}-${String(col.key)}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {col.render
                      ? col.render(item) // Use custom render function if provided
                      : String(item[col.key as keyof T] ?? '')} {/* Otherwise, display the value directly */}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}