export const fedaPayConfig = {
  apiKey: process.env.FEDAPAY_API_KEY,
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  apiVersion: 'v1'
};