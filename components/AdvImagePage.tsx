'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import Loader from './loader';
import { useProModal } from '@/hooks/use-pro-modal';
import { formSchema } from './AdvImageconstants';
import CustomUploadDropZone from './UploadDropZone';
import downloadPhoto from '../utils/downloadPhoto';

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
    const timeoutDuration = 20000; // Set timeout to 20s
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


//   // Start a timer to track the response time
//   const timeoutPromise = new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error('Server is busy, please try again later'));
//     }, timeoutDuration);
//   });

//   try {
//     if (imageUrl) {
//       const res = await Promise.race([timeoutPromise, fetch('/api/advertising', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt, imageUrl }),
//       })]);

//       // Check if the response is the timeout error
//       if (res instanceof Error && res.message === 'Server is busy, please try again later') {
//         setError(res.message);
//       } else if (res.status !== 200) {
//         setError('An error occurred.');
//       } else {
//         const newPhoto = await res.json();
//         setGeneratedImage(newPhoto[1]);
//         setDisplayImages(true); // Set displayImages to true after successful API call
//       }
//     } else {
//       // Handle the case where no image is uploaded
//     }
//   } catch (error) {
//     setError('An error occurred.');
//   } finally {
//     // Always clear the loading state when done
//     setIsLoading(false);
//   }
// };


  return (
    <div className="text-white">
      <div className="flex items-center">
        <a href="https://github.com/Elsaam2y/ProdGPT" target="_blank" rel="noopener noreferrer">
          <svg
            aria-hidden="true"
            className="h-5 w-5 mr-3 fill-yellow-500 group-hover:fill-yellow-300"
          >
            <path d="M12 2C6.4772Z" />
          </svg>
        </a>
      </div>  
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
                width={200}
                height={200}
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
              className="col-span-12 lg:col-span-2 w-full hover:bg-blue-500 bg-blue-600"
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
                  width={200}
                  height={200}
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
                    width={200}
                    height={200}
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
