export function isReportifyNull(condition: Optional<string | number>) {
  return condition === null || condition === 'NULL' || condition === '';
}
