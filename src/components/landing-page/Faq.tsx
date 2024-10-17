import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Plus, Minus } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

export default function Faq() {
  return (
    <div className='bg-black' id='faq'>
      <div className='mx-auto max-w-7xl flex flex-col items-center py-28 md:py-28 text-center'>
        <SectionTitle
          loop='FAQ'
          title='We handle just about everything'
          text='We handle everything from design to deployment to get your website shipped and ready to go!'
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 pb-28'>
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
