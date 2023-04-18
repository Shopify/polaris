export function isReportifyNull(condition: string | number | null) {
  return condition === null || condition === 'NULL' || condition === '';
}
