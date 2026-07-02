import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const cookiesStore = await cookies();
    cookiesStore.delete("access_token");

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
}