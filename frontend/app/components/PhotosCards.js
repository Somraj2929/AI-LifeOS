"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function PhotosCards({ placeNames = [] }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const res = await fetch("/api/place-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ places: placeNames }),
      });
      const data = await res.json();
      setPhotos(data.photos);
      setLoading(false);
    }

    if (placeNames.length > 0) {
      fetchPhotos();
    }
  }, [placeNames]);

  if (loading) {
    return (
      <div className="text-gray-400 text-center">
        <p>Loading photos...</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6">
      {photos.map((place, index) => (
        <div
          key={index}
          className="bg-white/10 p-4 rounded-lg shadow backdrop-blur-lg border border-white/10"
        >
          <h3 className="text-xl font-bold mb-3 text-white">{place.title}</h3>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="rounded-lg"
          >
            {place.photoUrls.map((url, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={url}
                  alt={`${place.title} - ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}
