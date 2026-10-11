import type { ContentBlock } from './types'

export const englishReturnsBlocks: ContentBlock[] = [
  { type: 'h2', text: 'Returns and exchanges' },
  { type: 'p', text: 'If your order is defective, damaged or incorrect, please contact us within seven days of delivery. We will respond as quickly as possible.' },
  { type: 'p', text: 'For returns or exchanges requested for other reasons, such as a change of mind or an ordering mistake, the item must be unopened and unused. The customer is responsible for return shipping costs.' },
  { type: 'h2', text: 'Items we cannot accept' },
  { type: 'li', text: 'Products that have been opened or used.' },
  { type: 'li', text: 'Requests made eight or more days after delivery.' },
  { type: 'li', text: 'Products damaged or soiled after delivery to the customer.' },
  { type: 'li', text: 'Sale or special-offer products clearly marked as non-returnable before purchase.' },
  { type: 'h2', text: 'How to request a return' },
  { type: 'p', text: '1. Contact us through the inquiry form or at support@ippongikyoto.com.' },
  { type: 'p', text: '2. We will provide the return address and instructions.' },
  { type: 'p', text: '3. Send the item back. After inspection, we will arrange a refund or exchange.' },
  { type: 'h2', text: 'Refunds' },
  { type: 'p', text: 'Refunds are processed according to the original payment method. Credit-card refunds may take several days, depending on the payment provider.' },
]

export const englishReturnsText = englishReturnsBlocks.map((block) => block.text).join('\n')
