// components/ImageCropper.js
import React, { useState, useRef, useCallback } from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'next/image';

const ImageCropper = ({ onCropped }) => {
  const [upImg, setUpImg] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imageRef = useRef(null);
  const fileUrlRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setUpImg(result);
        if (fileUrlRef.current) {
          URL.revokeObjectURL(fileUrlRef.current);
        }
        fileUrlRef.current = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoaded = useCallback((img) => {
    imageRef.current = img;
  }, []);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropComplete = (newCrop) => {
    setCompletedCrop(newCrop);
  };

  const getCroppedImg = async (image, crop) => {
    if (!crop || !image) {
      return null; // Return null if crop or image is missing
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (image instanceof HTMLImageElement) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            reject(new Error('Canvas is empty'));
            return;
          }
          blob.name = 'cropped.jpg';
          resolve(blob);
        }, 'image/jpeg');
      });
    }

    return null; // Return null if image is not an instance of HTMLImageElement
  };

  const handleCrop = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (completedCrop && imageRef.current) {
      try {
        const croppedImageBlob = await getCroppedImg(imageRef.current, completedCrop);
        if (croppedImageBlob) {
          onCropped(croppedImageBlob);
        }
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {upImg && (
        <Cropper crop={crop} onChange={onCropChange} onComplete={onCropComplete}>
          <Image src={upImg} onLoad={onImageLoaded} alt="Source" width={340} height={200} />
        </Cropper>
      )}
      {completedCrop && (
        <button onClick={handleCrop}>Crop to save Image</button>
      )}
    </div>
  );
};

export default ImageCropper;
