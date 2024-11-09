// This component renders a modal dialog for users to upload images and train a machine learning model through Astria API.
// The component integrates with the 'react-dropzone' for handling image uploads and validations (e.g., max file size and count).

'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { IoCloudUploadOutline } from 'react-icons/io5';
import { SubmitButton } from '../../SubmitButton';
import { finetuneModelFn } from '@/app/(dashboard)/home/actions';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { FaPlus } from 'react-icons/fa6';
import { supabaseBrowserClient } from '@/utils/supabase/client';
// import { getSubscription } from '@/app/(dashboard)/home/actions';
import { useCredits } from '@/context/CreditsContext';
import { Zap } from 'lucide-react';
import Link from 'next/link';

import ImageOne from '../../../../public/1.png';
import ImageTwo from '../../../../public/2.png';
import ImageThree from '../../../../public/3.png';
import ImageFour from '../../../../public/4.png';
import ImageFive from '../../../../public/bad-1.png';
import ImageSix from '../../../../public/bad-2.png';
import ImageSeven from '../../../../public/bad-3.png';
import ImageEight from '../../../../public/bad-4.png';

const goodImages = [ImageOne, ImageTwo, ImageThree, ImageFour];
const badImages = [ImageFive, ImageSix, ImageSeven, ImageEight];

interface ModalTrainModelProps {
  buttonText?: string;
}

const ModalTrainModel: FC<ModalTrainModelProps> = ({ buttonText }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [hasLimitExceeded, setHasLimitExceeded] = useState(false);
  const { modelCredits, imageCredits } = useCredits();

  const router = useRouter();

  //function to check the limit of content creations and set the state accordingly
  const limitUser = useCallback(async () => {
    const supabase = supabaseBrowserClient();
    const { error, count } = await supabase
      .from('headshot_models')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return errorToast(error.message);
    }
    if (count && count >= 100) {
      setHasLimitExceeded(true);
    }
  }, []);

  //checking on load if the user has reached the limit of content creations
  useEffect(() => {
    limitUser();
  }, [limitUser]);

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
    if (hasLimitExceeded) {
      return errorToast(
        'You have reached the limit of content creations. Please purchase a plan to continue.',
        'Limit Exceeded'
      );
    }
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
      <DialogTrigger className={cn(buttonVariants({ variant: 'default' }), 'w-full gap-2')}>
        <FaPlus className='size-4' /> {buttonText ?? 'Train Model'}
      </DialogTrigger>
      <DialogContent className='rounded-lg w-full max-w-7xl p-8'>
        <div className='grid gap-8 grid-cols-1 lg:grid-cols-2'>
          <div>
            <DialogHeader>
              <DialogTitle className='text-default font-semibold'>Finetune your model</DialogTitle>
              {/* <DialogDescription className='text-subtle text-sm mt-2'>
                Train your model with images to generate headshots.
              </DialogDescription> */}
            </DialogHeader>

            <form className='flex flex-col gap-6 mt-4'>
              <InputWrapper id='title' label='Title'>
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
                      'border-2 border-dashed rounded-lg py-4 text-center cursor-pointer hover:border-primary'
                    )}>
                    <Input {...getInputProps()} />
                    <div className='my-4 flex flex-col items-center'>
                      <IoCloudUploadOutline className='size-5 mb-4' />
                      <div>
                        <span className='font-semibold text-primary mr-1'>Click to upload</span>
                        <span className='text-sm'>or drag and drop</span>
                      </div>
                      <div className='text-xs mt-1'>PNG, JPG (max. 4MB)</div>
                    </div>
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
                        <Button
                          variant='outline'
                          size={'sm'}
                          className='w-full'
                          onClick={() => removeFile(file)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter className='flex gap-2 sm:justify-start'>
                {/* <DialogClose className='w-full'>
              <Button className='w-full' variant='outline'>
                Cancel
              </Button>
            </DialogClose> */}
                <Button
                  type='button'
                  className='w-full'
                  variant='outline'
                  onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
                {modelCredits && imageCredits ? (
                  <SubmitButton
                    className='w-full'
                    formAction={async (formData: FormData) => {
                      await trainModel(formData);
                    }}
                    disabled={hasLimitExceeded}>
                    Train
                  </SubmitButton>
                ) : (
                  <Link href='/billing' className='w-full'>
                    <Button variant='purple' size='sm' className='w-full' onClick={() => setOpenModal(false)}>
                      <Zap size={16} className='mr-1' />
                      Upgrade
                    </Button>
                  </Link>
                )}
              </DialogFooter>
            </form>
          </div>
          <div>
            <div>
              <DialogHeader>
                <DialogTitle className='text-default font-semibold'>✅ Choose Good Pictures</DialogTitle>
                <DialogDescription className='text-sm mt-2 text-gray-400'>
                  5-10 high quality samples, front facing, square aspect ratio, 1 person in frame, variety
                </DialogDescription>
                <div className='grid grid-cols-4 gap-4 w-full'>
                  {/* <Image src={ImageOne} alt='example' height={24} width={24} />
                <Image src={ImageTwo} alt='example' height={24} width={24} />
                <Image src={ImageThree} alt='example' height={24} width={24} />
                <Image src={ImageFour} alt='example' height={24} width={24} /> */}
                  {goodImages.map((item, idx) => (
                    <Image
                      key={idx}
                      src={item}
                      alt='example'
                      height={113}
                      width={113}
                      className='w-full rounded-lg'
                    />
                  ))}
                </div>
              </DialogHeader>
            </div>
            <div className='mt-8'>
              <DialogHeader>
                <DialogTitle className='text-default font-semibold'>❌ Examples of Bad Pictures</DialogTitle>
                <DialogDescription className='text-sm mt-2 text-gray-400'>
                  Multiple Subjects, face covered, NSFW Images, blurry, uncropped, full length
                </DialogDescription>
                <div className='grid grid-cols-4 gap-4 w-full'>
                  {/* <Image src={ImageOne} alt='example' height={24} width={24} />
                <Image src={ImageTwo} alt='example' height={24} width={24} />
                <Image src={ImageThree} alt='example' height={24} width={24} />
                <Image src={ImageFour} alt='example' height={24} width={24} /> */}
                  {badImages.map((item, idx) => (
                    <Image
                      key={idx}
                      src={item}
                      alt='example'
                      height={113}
                      width={113}
                      className='w-full rounded-lg'
                    />
                  ))}
                </div>
              </DialogHeader>
            </div>
            <div className='mt-8'>
              <DialogHeader>
                <DialogTitle className='text-default font-semibold'>✅ Train your Model</DialogTitle>
                <DialogDescription className='text-sm mt-2 text-gray-400'>
                  Train your model with images to generate headshots. Training takes around 30 minutes. Feel
                  free to leave and come back later.
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className='mt-8'>
              <DialogHeader>
                <DialogTitle className='text-default font-semibold'>✅ Generate Images</DialogTitle>
                <DialogDescription className='text-sm mt-2 text-gray-400'>
                  Once your model is trained, you can generate images using prompts. Make sure to include the
                  subject keyword in your prompts.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTrainModel;
