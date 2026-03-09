/**
 * Exports an array of objects to a CSV file download.
 * @param data     Array of plain objects (each row)
 * @param filename Desired filename without extension
 * @param headers  Optional { key: label } map to rename/reorder columns
 */
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  headers?: Partial<Record<keyof T, string>>
) {
  if (!data.length) return;

  const keys = headers ? (Object.keys(headers) as (keyof T)[]) : (Object.keys(data[0]) as (keyof T)[]);
  const labels = keys.map((k) => (headers ? headers[k] ?? String(k) : String(k)));

  const escape = (val: unknown) => {
    const str = val == null ? '' : String(val);
    // Wrap in quotes if contains comma, quote, or newline
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const rows = [
    labels.join(','),
    ...data.map((row) => keys.map((k) => escape(row[k])).join(',')),
  ];

  const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
