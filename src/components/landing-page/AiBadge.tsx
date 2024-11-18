import Image from 'next/image';
import Link from 'next/link';

export default function AiBadge() {
  return (
    <div className='flex justify-center items-center my-10'>
      <Link
        href='https://theresanaiforthat.com/ai/picai-1731919622/?ref=featured&v=1254471'
        target='_blank'
        rel='nofollow'>
        <Image
          width={300}
          height={300}
          alt='image'
          src='https://media.theresanaiforthat.com/featured-on-taaft.png?width=600'></Image>
      </Link>
    </div>
  );
}
