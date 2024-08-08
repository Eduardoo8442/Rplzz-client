import React from 'react';


interface imageFocusProps {
    srcImage: string;
    func: any;
  }

export default function ImageFocus({srcImage, func}: imageFocusProps) {
    function handleClick() {
        window.open(srcImage, '_blank', 'noopener,noreferrer');
    }
    function handleFocus() {
        func(null);
    }
    return (
      <div>
        <div onClick={handleFocus} className="z-30 fixed top-0 left-0 h-full w-full bg-gray-950 opacity-80"></div>
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
          <img className="max-h-40" src={srcImage}/>
          <p onClick={handleClick} className="text-white geist text-xs mt-10 hover:text-gray-500 cursor-pointer">Abrir em outra página</p>
          </div>
        </div>
      </div>
    );
  }
  