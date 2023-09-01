import Replicate from 'replicate';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { incrementApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const { imageUrl, prompt } = await request.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Product image is required', { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 }
      );
    }

    // const response = await replicate.run(
    //   "logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
    //   {
    //     input: {
    //       image_path: imageUrl,
    //       prompt: prompt
    //     }
    //   }
    // );

    // POST request to Replicate to start the image restoration generation process
    // let response = await fetch("https://replicate.com/logerzhu/ad-inpaint/api", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: "Token " + process.env.REPLICATE_API_KEY,
    //     Authorization: "Token " + "r8_f3BQ6YbD8yhAGaDN34jimjLb5DSAcy92RZRBM",
    //   },
    //   body: JSON.stringify({
    //     version:
    //       "b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
    //     input: {
    //       image_path: prompt,
    //       prompt: imageUrl,
    //     },
    //   }),
    // });
    const response = await replicate.run(
      'logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df',
      {
        input: {
          image_path: prompt,
          prompt: imageUrl,
        },
      }
    );
    console.log('prompt:', prompt);
    console.log('image', imageUrl);
    console.log('response is', response);

    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
