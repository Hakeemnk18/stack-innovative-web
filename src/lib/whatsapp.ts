export const WA_NUMBER = '917994285615'

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
