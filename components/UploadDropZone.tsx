import React, { useState } from 'react';
import { UploadDropzone } from 'react-uploader';
import { Uploader } from 'uploader';

const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : 'free',
});

const options = {
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  editor: { images: { crop: false } },
  styles: {
    // Define your custom styles here
  },
};

interface UploadDropZoneProps {
  onImageUpdate: (fileUrl: string, photoName: string) => void;
}

const CustomUploadDropZone: React.FC<UploadDropZoneProps> = ({
  onImageUpdate,
}) => {
  const [photoName, setPhotoName] = useState<string | null>(null);

  return (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          onImageUpdate(file[0].fileUrl.replace('raw', 'thumbnail'), "input.png");
        }
      }}
      width="670px"
      height="250px"
    />
  );
};

export default CustomUploadDropZone;
