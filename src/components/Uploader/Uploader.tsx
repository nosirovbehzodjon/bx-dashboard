'use client';

import { UploadCloud, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploaderProps {
  onImageUpload?: (file: File) => void;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

export function ImageUploader({
  onImageUpload,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
}: ImageUploaderProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Reset error
    setError(null);

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError('Please upload an image file (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size should be less than ${maxSizeMB}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Call the callback
    onImageUpload?.(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-md border-none mx-auto">
      <div
        className={`relative flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <div className="relative w-full aspect-video">
            <img
              src={preview || '/placeholder.svg'}
              alt="Preview"
              className="object-cover w-full h-full rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={e => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground">
                  Supports JPEG, PNG, GIF and WEBP up to {maxSizeMB}MB
                </p>
              </div>
            </div>
            {error && (
              <p className="absolute bottom-2 left-2 right-2 text-xs text-destructive">{error}</p>
            )}
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </Card>
  );
}
