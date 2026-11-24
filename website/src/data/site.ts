// Store details shown across the site. Replace the placeholders with real values.
export const SITE = {
  name: 'Ashok Medical',
  fullName: 'Ashok Medical & General Stores',
  phoneDisplay: '+91 86525 86786',
  phoneHref: 'tel:+918652586786',
  whatsappDisplay: '+91 86525 86786',
  // country code + number, digits only
  whatsappNumber: '918652586786',
  email: 'support@ashokmedical.in',
  address: 'Ashok Medical, Main Road, Your City – 000000',
  supportHours: '9:00 AM – 12:00 PM',
  freeDeliveryAbove: 499,
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    x: 'https://x.com/',
  },
};

export const whatsappLink = (text = `Hi ${SITE.name}, I would like to order medicines.`) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
