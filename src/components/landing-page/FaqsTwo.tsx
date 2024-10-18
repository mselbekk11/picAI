import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Plus, Minus } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const faqs = [
  {
    question: 'What types of AI image models can I train?',
    answer:
      'Our platform allows you to train high-quality AI image models for various purposes, including headshots, portraits, products, and brand assets. We use the highest quality Flux AI image model for training.',
  },
  {
    question: 'How long does it take to train a custom AI model?',
    answer:
      'Training custom AI image models takes 10-15 minutes. Once finished, you can generate custom images with it in <30 seconds.',
  },
  {
    question: 'How many images do I need to train a custom model?',
    answer:
      'Use shots with the subject centered in the frame, Include only one subject per image, Avoid accessories like sunglasses or hats, Ensure the subject is clearly visible in all images. For best results, we recommend using 5-10 high-quality images that follow these guidelines. Remember, the better your input images, the better your AI-generated results will be.',
  },
  {
    question: 'Can I use the generated images commercially?',
    answer:
      'Yes, our Creator, Professional, and Enterprise plans offer full, commercial ownership of the images you generate. This means you can use the AI-generated images for your business needs without any restrictions.',
  },
  {
    question: 'Do you offer support for using the platform?',
    answer:
      'Yes, we provide comprehensive support to help you succeed with our platform. Our team offers guidance and assistance to ensure you get the most out of our services.',
  },
];

export default function FaqsTwo() {
  return (
    <div className='bg-black' id='faq'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='FAQ'
          title='We handle just about everything'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl divide-y divide-white/10'>
          {/* <h2 className='text-2xl font-bold leading-10 tracking-tight text-white'>
            Frequently asked questions
          </h2> */}
          <dl className='mt-10 space-y-6 divide-y divide-white/10'>
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as='div' className='pt-6'>
                <dt>
                  <DisclosureButton className='group flex w-full items-start justify-between text-left text-white'>
                    <span className='text-base font-semibold leading-7'>{faq.question}</span>
                    <span className='ml-6 flex h-7 items-center'>
                      <Plus aria-hidden='true' className='h-6 w-6 group-data-[open]:hidden' />
                      <Minus aria-hidden='true' className='h-6 w-6 [.group:not([data-open])_&]:hidden' />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as='dd' className='mt-2 pr-12'>
                  <p className='text-base leading-7 text-gray-300'>{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
