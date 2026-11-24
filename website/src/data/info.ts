import { SITE } from './site';

// Placeholder policy text — have these reviewed and replaced with your own
// before going live.
export interface InfoPage { title: string; intro: string; sections: { heading: string; body: string }[] }

export const INFO_PAGES: Record<string, InfoPage> = {
  about: {
    title: `About ${SITE.name}`,
    intro: `${SITE.name} is a licensed pharmacy bringing genuine medicines, wellness products and healthcare devices to your doorstep.`,
    sections: [
      { heading: 'Our promise', body: 'Every product we sell is sourced from authorised distributors. Prescription medicines are dispensed only after a registered pharmacist verifies a valid prescription.' },
      { heading: 'Why customers choose us', body: `Fair prices, quick delivery, and friendly pharmacists available by phone and WhatsApp, ${SITE.supportHours}.` },
    ],
  },
  contact: {
    title: 'Contact Us',
    intro: 'We are happy to help with orders, prescriptions and product questions.',
    sections: [
      { heading: 'Phone', body: `${SITE.phoneDisplay} (${SITE.supportHours}, all days)` },
      { heading: 'WhatsApp', body: SITE.whatsappDisplay },
      { heading: 'Email', body: SITE.email },
      { heading: 'Address', body: SITE.address },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    intro: 'Answers to common questions about ordering from us.',
    sections: [
      { heading: 'How do I order prescription medicines?', body: `Send a photo of a valid prescription from a registered doctor to us on WhatsApp at ${SITE.whatsappDisplay}, or call us. Our pharmacist verifies it and confirms your medicines and price before delivery.` },
      { heading: 'What payment methods do you accept?', body: 'Currently we accept Cash on Delivery.' },
      { heading: 'Is there a delivery charge?', body: `Delivery is free on orders of ₹${SITE.freeDeliveryAbove} or more. A small delivery fee applies to smaller orders.` },
      { heading: 'How will I know the status of my order?', body: `Our pharmacist will call you to confirm your order. For any update, call or WhatsApp us on ${SITE.phoneDisplay}.` },
      { heading: 'Can I order on WhatsApp or by phone?', body: `Yes. Call ${SITE.phoneDisplay} or message us on WhatsApp at ${SITE.whatsappDisplay}.` },
      { heading: 'Are the products genuine?', body: 'Yes. We source only from authorised distributors and manufacturers.' },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    intro: `These terms govern your use of the ${SITE.name} website and services.`,
    sections: [
      { heading: 'Orders', body: 'All orders are subject to availability and confirmation. We may cancel an order if a product is unavailable or a prescription cannot be verified.' },
      { heading: 'Prescription medicines', body: 'Prescription-only medicines are supplied only against a valid prescription issued by a registered medical practitioner, as required by law.' },
      { heading: 'Pricing', body: 'Prices are shown in Indian Rupees and include applicable taxes. Prices may change without notice.' },
      { heading: 'Medical advice', body: 'Information on this website is for general reference and is not a substitute for advice from a doctor or pharmacist.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'We respect your privacy and protect your personal and health information.',
    sections: [
      { heading: 'What we collect', body: 'Your name, mobile number, delivery address, order history and any prescriptions you share with us.' },
      { heading: 'How we use it', body: 'Only to process and deliver your orders, verify prescriptions, and contact you about your orders.' },
      { heading: 'Sharing', body: 'We do not sell your data. Information is shared only with delivery partners as needed to deliver your order, or when required by law.' },
      { heading: 'Your choices', body: `To access or delete your information, contact us at ${SITE.email}.` },
    ],
  },
};
