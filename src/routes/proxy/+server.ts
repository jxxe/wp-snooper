import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        const urlToProxy = new URL(url.searchParams.get('url')!);
        const request = await fetch(urlToProxy);
        const response = await request.json();
        return json(response);
    } catch({ message }) {
        return json({ message }, { status: 400 });
    }
}