import { ImageUploader } from '@/components/Uploader';

export const ProfileCreate = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/10">
      <ImageUploader
        onImageUpload={file => {
          console.log('Uploaded file:', file);
        }}
      />
    </div>
  );
};
