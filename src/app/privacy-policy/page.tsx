import FooterTwo from '@/components/landing-page/FooterTwo';
import NavbarTwo from '@/components/landing-page/NavbarTwo';
import React from 'react';

const PrivacyPolicy = () => (
  <div className='bg-black text-white min-h-screen'>
    <NavbarTwo />

    <div className='mx-auto max-w-5xl flex flex-col pt-10 lg:py-28'>
      <div className='mb-12'>
        <h1 className='text-4xl font-bold mb-6 decoration-2 decoration-white underline underline-offset-4'>
          Privacy Policy
        </h1>
        <p className='mb-4'>Effective date: October 17, 2024</p>
        <p className='mb-4'>
          Your privacy is critically important to us. At PicAI, we have a few fundamental principles:
        </p>
        <ul className='list-disc ml-8 mb-4'>
          <li>We don’t ask you for personal information unless we truly need it.</li>
          <li>
            We don’t share your personal information except to comply with the law, develop our products, or
            protect our rights.
          </li>
          <li>
            We don’t store personal information on our servers unless required for the on-going operation of
            one of our services.
          </li>
        </ul>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 decoration-2 decoration-white underline underline-offset-4'>
          Information Collection And Use
        </h2>
        <p className='mb-4'>
          While using our Site, we may ask you to provide us with certain personally identifiable information
          that can be used to contact or identify you. Personally identifiable information may include, but is
          not limited to your name ("Personal Information").
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 decoration-2 decoration-white underline underline-offset-4'>
          Log Data
        </h2>
        <p className='mb-4'>
          Like many site operators, we collect information that your browser sends whenever you visit our Site
          ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP")
          address, browser type, browser version, the pages of our Site that you visit, the time and date of
          your visit, the time spent on those pages and other statistics.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 decoration-2 decoration-white underline underline-offset-4'>
          Cookies
        </h2>
        <p className='mb-4'>
          Cookies are files with small amount of data, which may include an anonymous unique identifier.
          Cookies are sent to your browser from a web site and stored on your computer's hard drive.
        </p>
        <p className='mb-4'>
          Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse
          all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you
          may not be able to use some portions of our Site.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 decoration-2 decoration-white underline underline-offset-4'>
          Security
        </h2>
        <p className='mb-4'>
          The security of your Personal Information is important to us, but remember that no method of
          transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to
          use commercially acceptable means to protect your Personal Information, we cannot guarantee its
          absolute security.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 decoration-2 decoration-white underline underline-offset-4'>
          Changes To This Privacy Policy
        </h2>
        <p className='mb-4'>
          This Privacy Policy is effective as of the date above and will remain in effect except with respect
          to any changes in its provisions in the future, which will be in effect immediately after being
          posted on this page.
        </p>
        <p className='mb-4'>
          We reserve the right to update or change our Privacy Policy at any time and you should check this
          Privacy Policy periodically. Your continued use of the Service after we post any modifications to
          the Privacy Policy on this page will constitute your acknowledgment of the modifications and your
          consent to abide and be bound by the modified Privacy Policy.
        </p>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-4 decoration-2 decoration-white underline underline-offset-4'>
          Contact Us
        </h2>
        <p className='mb-4'>If you have any questions about this Privacy Policy, please contact us.</p>
      </div>
    </div>
    <FooterTwo />
  </div>
);

export default PrivacyPolicy;
