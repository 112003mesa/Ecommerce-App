import React, { useState } from 'react';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';
import { ImageGarareyProps, LinksGarareyProps } from '../type';
import { nanoid } from 'nanoid';

const SectionGararey: React.FC = () => {
  const imgs: ImageGarareyProps[] = [
    { img: "image/AqsKmswsQvUvsEJZj8yYvA8sPE5HqUdC78MKt89x.jpg" },
    { img: "image/qJzYpDZjx9avisDr8Z4xdnyY5miVKBwG520PVfEa.jpg" },
  ];

  const linksGararey: LinksGarareyProps[] = [
    { id: nanoid(), img: "image/img-1.jpg", title: "daily_use", link: "section-new-product" },
    { id: nanoid(), img: "/image/img-2.jpg", title: "new_products", link: "section-new-product" },
    { id: nanoid(), img: "image/img-3.jpg", title: "sports-compression-wear", link: "section-sport" },
    { id: nanoid(), img: "image/img-4.jpg", title: "men's-shapewear", link: "section-men" },
    { id: nanoid(), img: "image/img-5.jpg", title: "best-seller", link: "section-best-selling" },
    { id: nanoid(), img: "image/img-6.jpg", title: "plus-size", link: "section-new-product" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % imgs.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  const handleDotClick = (index: number) => setCurrentIndex(index);

  return (
    <div className='container mx-auto px-4 grid grid-cols-4 gap-4 mt-4'>
      {/* Sidebar Sticky */}
      <div className='hidden lg:block'>
        <div className='sticky top-20 h-fit'>
          <h2 className='bg-[#d9ebe9] text-black h-fit w-full ps-3 py-2 text-3xl font-semibold'>Categories</h2>
          <ul className='w-full'>
            {linksGararey.map((link) => (
              <li key={link.id}>
                <a className='bg-white w-full flex items-center gap-2 border-b px-3 py-1 transition duration-300 hover:bg-primary hover:text-white' href={`#${link.title}`}>
                  <img className='size-[20px]' src={link.img} alt={link.title} />
                  <span>{link.title.replace(/-/g, ' ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Slider */}
      <div className='col-span-4 lg:col-span-3'>
        <div className='relative overflow-hidden'>
          {/* Slider Images */}
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {imgs.map((image, index) => (
              <img
                key={index}
                src={image.img}
                alt=""
                className='w-full flex-shrink-0 h-[400px] object-cover'
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow cursor-pointer z-30'
          >
            <PiCaretLeftLight size={24} />
          </button>
          <button
            onClick={handleNext}
            className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow cursor-pointer z-30'
          >
            <PiCaretRightLight size={24} />
          </button>

          {/* Pagination */}
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
            {imgs.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 mb-3 rounded-full border ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className='mt-5'>
          <ul className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {linksGararey.map((link) => (
              <li key={link.id}>
                <a href={`#${link.title}`}>
                  <div className='bg-white'>
                    <img className='w-full h-[125px]' src={link.img} />
                    <h3 className='px-2 py-2 text-sm text-gray-600'>{link.title.replace(/-/g, ' ')}</h3>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionGararey;
