import { cookies } from 'next/headers';

export type TypeKeysInCookie = 'astria';

export function getAstriaKeyFromCookie() {
  const cookieStore = cookies();
  const key = cookieStore.get('x-astria-key')?.value;
  return key;
}

export function storeKeyInCookie(astriaKey: string) {
  const cookieStore = cookies();

  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  const options = {
    domain: 'builderkit.ai',
    secure: true,
    maxAge: sevenDays,
    httpOnly: true,
  };

  cookieStore.set('x-astria-key', astriaKey, options);
}
