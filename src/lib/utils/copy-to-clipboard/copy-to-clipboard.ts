export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    console.log('Text copied to clipboard:', text)
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error)
  }
}
