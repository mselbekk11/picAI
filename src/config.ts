const config = {
  // .......
  stripe: {
    baseUrl: 'https://buy.stripe.com',
    emailParam: 'prefilled_email',
    discountParam: 'prefilled_promo_code',
    variant: {
      standard: {
        monthly: '8wMeWt5EHbBMeTCaEE',
        annually: '28o4hP2svcFQbHq001',
      },
      premium: {
        monthly: '00g6pXebd7lw7ra4gi',
        annually: '3cscOl4AD21c26Q8wz',
      },
    },
    plan: {
      prod_RCyhHcr4HYXDds: 'standard',
      prod_RCyqqDUsTKOEbw: 'premium',
    },
  },
};

export default config;