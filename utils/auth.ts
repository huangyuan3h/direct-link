import { User } from '@/types/user';

export const decodeJWT = (jwtToken: string): User => {
  const [header, payload, signature] = jwtToken.split('.');

  const decodedPayload = atob(payload);

  const parsedPayload = JSON.parse(decodedPayload);

  return parsedPayload;
};
