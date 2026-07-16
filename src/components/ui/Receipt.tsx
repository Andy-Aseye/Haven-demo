import React from 'react';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';

const barcodeWidths = [
  2, 4, 1, 3, 2, 1, 5, 2, 1, 2, 4, 1, 2, 3, 2, 1, 4, 2, 1, 2,
  3, 1, 2, 4, 1, 2, 1, 5, 2, 3, 1, 2, 4, 2, 1, 3, 2, 1, 4, 2,
  1, 2, 3, 2, 1, 2, 4, 1, 2, 3, 2, 1, 4, 2, 1, 3, 2, 1, 5
];

export default function Receipt() {
  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden shadow-2xl relative font-sans text-black min-h-[600px] flex flex-col">
      {/* Curved Header background */}
      <div className="relative w-full h-32 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
        {/* Subtle gradients to mimic the curve design */}
        <div className="absolute top-[-30%] left-[-10%] w-[120%] h-[120%] rounded-[50%] border-[15px] border-[#3a3a3a] opacity-50"></div>
        <div className="absolute top-[-40%] left-[-5%] w-[110%] h-[130%] rounded-[50%] border-[20px] border-[#555555] opacity-30"></div>
        
        {/* The White Dome */}
        <div className="absolute -bottom-10 left-[-10%] w-[120%] h-[120px] bg-white rounded-t-[50%]"></div>
      </div>

      <div className="px-10 pb-10 flex-grow flex flex-col bg-white z-10">
        {/* Logo Section */}
        <div className="flex justify-center -mt-14 mb-4">
          <div className="w-20 h-24 relative bg-white rounded-full flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="OAA Logo" 
              fill
              className="object-contain" 
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-[2.5rem] font-bold mb-4 tracking-tight leading-none text-black">
          Receipt
        </h1>

        {/* Red Divider */}
        <div className="h-[2px] bg-[#8B0000] w-full my-4"></div>

        {/* Subtitle row */}
        <div className="flex justify-between items-center mb-6 text-lg">
          <span className="font-medium tracking-tight">By Old Achimotan Association</span>
          <ChevronsRight className="text-gray-500 w-6 h-6" />
        </div>

        {/* Date */}
        <div className="flex justify-end mb-6 text-lg">
          <span className="font-medium tracking-tight">
            2<sup>nd</sup> July, 2026
          </span>
        </div>

        {/* Payment Details Header */}
        <h2 className="font-medium text-lg mb-6 tracking-tight">Payment Details</h2>

        {/* Details Grid */}
        <div className="space-y-4 text-[1.1rem] mb-12">
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <span className="text-black">Name:</span>
            <span className="text-black">kofi Gyamfi</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <span className="text-black">Year Group:</span>
            <span className="text-black">2007</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <span className="text-black">Item:</span>
            <span className="text-black">Cloth</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <span className="text-black">Qty:</span>
            <span className="text-black">2</span>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-4">
            <span className="text-black">Amount:</span>
            <span className="text-black">GHS 200</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto text-center">
          <h3 className="font-extrabold italic text-3xl mb-4 tracking-widest text-black">
            THANK YOU!
          </h3>
          
          <div className="text-black tracking-widest text-xl mb-6">
            *******************************
          </div>
          
          {/* Barcode */}
          <div className="flex justify-center items-end h-16 w-full gap-[2px] px-2 opacity-90">
            {barcodeWidths.map((width, i) => (
              <div 
                key={i} 
                className="h-full bg-black" 
                style={{ width: `${width}px` }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
