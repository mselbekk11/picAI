const config = {
  // ...
  stripe: {
    baseUrl: 'https://buy.stripe.com',
    emailParam: 'prefilled_email',
    discountParam: 'prefilled_promo_code',
    variant: {
      standard: {
        monthly: 'price_1QKYk3G1rhEwI29XVueEdaS8',
        annually: 'price_1QKYqKG1rhEwI29XBhV8L5nY',
      },
      premium: {
        monthly: 'price_1QKYsKG1rhEwI29XqgSZAcHh',
        annually: 'price_1QKYuHG1rhEwI29XQmR3ODFU',
      },
    },
    plan: {
      prod_R5NSzdG2cqHtZL: 'standard',
      prod_R5NbTDDiaigEI6: 'premium',
    },
  },
};

export default config;
