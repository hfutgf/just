import { jwtVerify } from 'jose';

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error('JWT verification failed:', (error as Error).message);
    return false;
  }
}
