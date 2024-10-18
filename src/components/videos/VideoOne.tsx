import React from 'react';

const VideoOne = () => {
  return (
    <video width='100%' height='100%' muted loop playsInline controls className='rounded-md'>
      <source src='https://res.cloudinary.com/dtjasyr7k/video/upload/v1729206346/picai-demo_kpc9ec.mp4' />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoOne;

// autoPlay
