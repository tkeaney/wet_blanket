export function downloadJson(filename: string, payload: unknown): void {
  const file = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
