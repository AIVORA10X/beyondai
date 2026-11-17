import { NextRequest, NextResponse } from 'next/server';
import { createUser, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'نام، ایمیل و رمز عبور الزامی هستند.' }, { status: 400 });
    }
    const result = await createUser(name, email, password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    await setSessionCookie(result.user.id);
    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'خطای سرور.' }, { status: 500 });
  }
}
