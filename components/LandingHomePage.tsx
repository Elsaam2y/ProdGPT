'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Button } from './ui/button';
import '../landing-page.css';

export const LandingHomePage = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen max-w-50xl">
      {/* <Header /> */}
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl animate-title">
          Product <span className="animate-color-change">advertising image</span> generator{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="animate-color-change2">using AI</span>
        </span>
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400 text-gray-500 leading-7">
        Upload a picture of your product and generate various advertising images for it using a text description.
        </h2>
        <div className="mt-6">
          {' '}
          {/* Added mt-6 for vertical spacing */}
          <Link href={isSignedIn ? '/Images' : '/sign-up'}>
            <Button
              className="md:text-lg flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
            >
              Start Generating Product Images
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg text-white">
                  Input image + text prompt
                </h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/shoe.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg text-white">
                  Generated image
                </h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/ad_inpaint_3.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
