import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'ایمیل و رمز عبور الزامی هستند.' }, { status: 400 });
    }
    const user = findUserByEmail(email);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'ایمیل یا رمز عبور اشتباه است.' }, { status: 401 });
    }
    await setSessionCookie(user.id);
    const { passwordHash, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch {
    return NextResponse.json({ error: 'خطای سرور.' }, { status: 500 });
  }
}
