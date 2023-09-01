'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Loader from './loader';
import { useProModal } from '@/hooks/use-pro-modal';
import { formSchema } from './AdvImageconstants';
import CustomUploadDropZone from './UploadDropZone';
import downloadPhoto from '../utils/downloadPhoto';
import { Camera } from 'lucide-react';

export const AdvImagePage = () => {
  const router = useRouter();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedLoaded, setGeneratedLoaded] = useState<boolean>(false);
  const [displayImages, setDisplayImages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [generateClicked, setGenerateClicked] = useState(false);
  const submitAdvertising = async (prompt: string, imageUrl: string | null) => {
    
    setIsLoading(true); // Set loading to true
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (imageUrl) {
      const res = await fetch('/api/advertising', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, imageUrl }),
      });

      const newPhoto = await res.json();
      if (res.status !== 200) {
        setError(newPhoto);
      } else {
        setGeneratedImage(newPhoto[1]);
        setDisplayImages(true); // Set displayImages to true after successful API call
      }
      setTimeout(() => {
        // setLoading(false);
        setIsLoading(false); // Set loading back to false
      }, 1300);
    } else {
      // Handle the case where no image is uploaded
    }
  };

  return (
    <div className="text-white">
      <Heading
        title={
          <div className="flex items-center">
            <a href="https://github.com/Elsaam2y/ProdGPT" target="_blank" rel="noopener noreferrer">
              <svg
                aria-hidden="true"
                className="h-5 w-5 mr-3 fill-yellow-500 group-hover:fill-yellow-300"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
            Advertising Images Generation
          </div>
        }
        description=""
        bgColor="bg-black-500/10"
        />
      <div className="px-4 lg:px-8 mt-10">
        <div className="px-4 lg:px-8 flex justify-center mt-3 items-center mb-5">
          {/* <div className="mx-auto max-w-4xl font-display text-6xl font-bold tracking-normal text-slate-100 sm:text-4xl mb-5"> */}
          <Image
            src="/number-1-white.svg"
            width={30}
            height={30}
            alt="1 icon"
          />
          <p className="text-left font-medium text-lg text-white">
            Provide a text description for the output image.
          </p>
        </div>
        <div className="flex justify-center mb-5">
          {' '}
          {/* Center horizontally */}
          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault(); // Prevent the default form submission
                const prompt = form.getValues().prompt; // Get the prompt from the form
              }}
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                rounded-lg 
                focus-visible:ring-0 
                focus-visible:ring-transparent
                py-2 
                text-sm 
                w-full
                max-w-xl    /* Adjust the max width as needed */
                grid-cols-12
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                w-96
                text-black   /* Add this class to set text color to black */
              "
                        disabled={isLoading}
                        placeholder="Place the item on a table next to flowers"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col space-y-4">
        {' '}
        {/* Center and space content */}
        <div className="px-4 lg:px-8 flex justify-center mt-3 items-center">
          {/* <div className="mx-auto max-w-4xl font-display text-6xl font-bold tracking-normal text-slate-100 sm:text-4xl mb-5"> */}
          <Image
            src="/number-2-white.svg"
            width={30}
            height={30}
            alt="2 icon"
          />
          <p className="text-left font-medium text-lg text-white">
            Upload your product image.
          </p>
        </div>
        {/* Use the custom UploadDropZone component */}
        <div className="flex items-center justify-center flex-col space-y-4">
          {' '}
          {/* Center and space content */}
          {!originalPhoto && (
            <div className="mt-4 w-full max-w-sm">
              {/* Use the custom UploadDropZone component */}
              <CustomUploadDropZone
                onImageUpdate={(fileUrl, name) => {
                  setPhotoName(name);
                  setUploadedImageFile(fileUrl); // Set the uploaded image URL as imageUrl
                  setOriginalPhoto(fileUrl);
                  setGenerateClicked(false); // Reset the generateClicked state
                }}
              />
            </div>
          )}
          {/* Display the uploaded image */}
          {originalPhoto && !displayImages && (
            <div className="mt-4 flex items-center justify-center">
              {' '}
              {/* Center the image */}
              <Image
                alt="Uploaded Photo"
                src={originalPhoto}
                className="rounded-2xl" // Adjust styling as needed
                width={350}
                height={350}
              />
            </div>
          )}
          {!displayImages && originalPhoto && (
            <Button
              type="submit"
              // onClick={() => submitAdvertising(uploadedImageFile, form.getValues().prompt)}
              onClick={() => {
                if (uploadedImageFile !== null) {
                  submitAdvertising(uploadedImageFile, form.getValues().prompt);
                  setGenerateClicked(true); // Set the generateClicked state to true
                } else {
                  // Handle the case where no image is uploaded
                }
              }}
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
              {/* Generate */}
            </Button>
          )}
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader color="black" />
            </div>
          )}
          {isLoading}
        </div>
        {displayImages && (
          <div className="flex items-center justify-center">
            {originalPhoto && (
              <div className="flex flex-col items-center justify-center mr-8">
                <h2 className="mb-1 font-medium text-lg">Uploaded Image</h2>
                <Image
                  alt="Uploaded Image"
                  src={originalPhoto}
                  className="rounded-2xl"
                  width={350}
                  height={350}
                />
              </div>
            )}

            {generatedImage && (
              <div className="flex flex-col items-center justify-center">
                <h2 className="mb-1 font-medium text-lg">Generated Image</h2>
                <a href={generatedImage} target="_blank" rel="noreferrer">
                  <Image
                    alt="Generated Image"
                    src={generatedImage}
                    className="rounded-2xl"
                    width={350}
                    height={350}
                    onLoadingComplete={() => setGeneratedLoaded(true)}
                  />
                </a>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="flex space-x-2 justify-center">
            {generatedLoaded && (
              <button
                onClick={() => {
                  downloadPhoto(generatedImage!, 'output.png');
                }}
                className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
              >
                Download Generated Image
              </button>
            )}
            {displayImages &&
              !loading && ( // Add this condition to display the button after image generation
                <button
                  onClick={() => {
                    setOriginalPhoto(null);
                    setGeneratedImage(null);
                    setGeneratedLoaded(false);
                    setError(null);
                    setDisplayImages(false); // Reset displayImages state
                  }}
                  className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition"
                >
                  Generate New Image
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
