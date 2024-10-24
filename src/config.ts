const config = {
  // ...
  stripe: {
    baseUrl: 'https://buy.stripe.com',
    emailParam: 'prefilled_email',
    discountParam: 'prefilled_promo_code',
    variant: {
      standard: {
        monthly: 'test_5kA6qU9Ki27Ufwk004',
        annually: 'test_14k5mQaOm3bYac028d',
      },
      premium: {
        monthly: 'test_5kA02w2hQ7sebg4eV0',
        annually: 'test_00gg1u6y63bY5VK007',
      },
    },
    plan: {
      prod_R5NSzdG2cqHtZL: 'standard',
      prod_R5NbTDDiaigEI6: 'premium',
    },
  },
};

export default config;
