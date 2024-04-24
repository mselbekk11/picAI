// This component renders a modal dialog for users to upload images and train a machine learning model through Astria API.
// The component integrates with the 'react-dropzone' for handling image uploads and validations (e.g., max file size and count).

'use client';

import { FC, useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn, errorToast } from '@/utils/utils';
import InputWrapper from '@/components/InputWrapper';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { FaImages } from 'react-icons/fa';
import { SubmitButton } from '../SubmitButton';
import { finetuneModelFn } from '@/app/generate/actions';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

interface ModalTrainModelProps {
  buttonText?: string;
}

const ModalTrainModel: FC<ModalTrainModelProps> = ({ buttonText }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();

  // This function handles image uploads and validates the uploaded files.
  const handleImageUploads = useCallback(
    async (acceptedFiles: File[]) => {
      const newImages: File[] =
        acceptedFiles.filter((file: File) => !images.some((f) => f.name === file.name)) || [];

      // If user tries to upload more than 10 files, display a toast
      if (newImages.length + images.length > 10) {
        errorToast('You can only upload up to 10 images in total. Please try again.', 'Too many images');
        return;
      }

      // Display a toast if any duplicate files were found
      if (newImages.length !== acceptedFiles.length) {
        errorToast(
          'Some of the images you selected were already added. They were ignored.',
          'Duplicate image names'
        );
        return;
      }

      const totalSize = images.reduce((acc, file) => acc + file.size, 0);
      const newSize = newImages.reduce((acc, file) => acc + file.size, 0);

      // Check that in total images do not exceed a combined 4.5mb
      // This limit is set by the Vercel, since they allow 4.5mb of request body size
      // You can overcome this by handling the file upload in the client side itself, and sending the uploaded image url in the server
      if (totalSize + newSize > 4.5 * 1024 * 1024) {
        errorToast(
          'The total combined size of the images cannot exceed 4.5MB',
          'Total images exceed size limit'
        );
        return;
      }

      setImages([...images, ...newImages]);
    },
    [images]
  );

  // Function to remove a file from the list of uploaded images
  const removeFile = useCallback(
    (file: File) => {
      setImages(images.filter((f) => f.name !== file.name));
    },
    [images]
  );

  // This function handles the form submission for training a machine learning model with uploaded images.
  // It appends image files to FormData and sends a POST request to astria's finetuning API endpoint.
  // The function also handles navigation and user feedback via toast messages.
  // In case of API errors or successful training, it updates the UI and navigates as needed.
  const trainModel = async (inputData: FormData) => {
    images.forEach((file) => {
      inputData.append(`images`, file);
    });

    // Calls the finetuneModelFn function from src/app/generate/actions.ts with images as input
    const response = await finetuneModelFn(inputData);
    if (response) {
      errorToast(response);
      return;
    } else {
      toast({ description: 'Finetunning your model.' });
      setOpenModal(false);
      router.refresh();
    }
  };

  // Retrieving funtions with configuration from react-dropzone to handle image uploads
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUploads,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  });

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger className={cn(buttonVariants({ variant: 'blue' }), 'text-white hover:no-underline')}>
        {buttonText ?? 'Train Model'}
      </DialogTrigger>
      <DialogContent className='w-11/12 rounded-lg'>
        <DialogHeader className='mb-2 md:mb-4'>
          <DialogTitle className='text-xl'>Finetune your Model</DialogTitle>
        </DialogHeader>

        <form className='flex flex-col gap-4 md:gap-6'>
          <InputWrapper
            id='title'
            label='Title'
            description='Name of the subject or theme of training images'>
            <Input id='title' name='title' placeholder='e.g. Natalie Headshots' autoFocus />
          </InputWrapper>

          <InputWrapper label='Select Model'>
            <Select name='type' defaultValue='man'>
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='man'>Man</SelectItem>
                <SelectItem value='woman'>Woman</SelectItem>
                <SelectItem value='unisex'>Unisex</SelectItem>
              </SelectContent>
            </Select>
          </InputWrapper>

          <div>
            <InputWrapper
              label='Images'
              description='Upload 4-10 images of the person you want to generate headshots for. No nude.'
              className='mb-4'>
              <div
                {...getRootProps()}
                className={cn(
                  'border-2 border-dashed border-gray-300 rounded-lg py-4 text-center cursor-pointer hover:border-primary'
                )}>
                <Input {...getInputProps()} />
                <p className='text-xs md:text-sm opacity-50 h-full'>
                  <FaImages size={32} className='text-gray-700 mx-auto mb-2' />
                  Drag 'n' drop or upload the images
                </p>
              </div>
            </InputWrapper>

            {/* Section to show the uploaded (selected) files */}
            {images.length > 0 && (
              <div className='max-h-32 md:max-h-56 flex gap-4 flex-wrap overflow-auto'>
                {images.map((file) => (
                  <div key={file.name} className='flex flex-col gap-1'>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt='model image'
                      height={24}
                      width={24}
                      className='rounded-md size-20 md:size-24 object-cover'
                    />
                    <Button variant='outline' size={'sm'} className='w-full' onClick={() => removeFile(file)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className='sm:justify-start'>
            <SubmitButton className='md:w-1/3' formAction={trainModel}>
              Train
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTrainModel;