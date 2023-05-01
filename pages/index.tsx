import type { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import {ObjectId  } from 'mongodb';

export type Car = {
  _id: ObjectId;
  name: string;
  description: string;
  pricePerMonth: number;
  availableFrom: string;
  rating: number;
  locality: string;
  image: string;
};

export default function Home({ cars }: { cars: Car[] }) {
  const [name, setName] = useState('');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const filtered : any = cars.filter((car) => {
      return car.name.toLowerCase().includes(name.toLowerCase());
    }
    );
    setFilteredCars(filtered);
  }
  , [name]);

  const sortByPrice = () => {
    const sorted = [...filteredCars].sort((a, b) => {
      return a.pricePerMonth - b.pricePerMonth;
    });
    setFilteredCars(sorted);
  }

  const sortByRating = () => {
    const sorted = [...filteredCars].sort((a, b) => {
      return b.rating - a.rating;
    });
    setFilteredCars(sorted);
  }
 
  if(!cars) return (<div>loading...</div>)

  return (
    <div className='w-full flex flex-col p-20'>
       <Navbar />
       <div className='flex w-full justify-between items-center hover:opacity-90'>
       <input value={name} placeholder='Search your dream car' onChange={(e) => handleChange(e)} className='text-black p-2 w-1/4 mt-5'/>
       <div className='flex justify-evenly w-1/4 items-center mt-5'>
        <button className='p-2 bg-orange-400 rounded-md hover:opacity-90' onClick={sortByPrice}>By price</button>
        <button className='p-2 bg-orange-400 rounded-md hover:opacity-90'  onClick={sortByRating}>By Rating</button>
       </div>
       </div>
       <h1 className="text-4xl font-semibold my-6 text-center">RENT YOUR DREAM CAR</h1>
      <div className='flex flex-col'>
      <h2 className='text-xl px-4'>Available Cars</h2>
        <div className='flex w-full flex-wrap justify-center'>
        {filteredCars?.map((car, index) => (
       <Link href={`/car/${car._id}`} key={index} className='hover:opacity-80 flex flex-col w-full md:w-[400px] p-5 m-2 border border-gray-300 rounded-lg'>
       <h3 className='text-2xl text-center mb-4 font-semibold'>{car.name}</h3>
       <img src={car.image} alt={car.name} className='py-2 object-cover w-full h-[150px] mb-4 rounded' />
       <p className='text-sm mb-2'>{car.description}</p>
       <p className='text-lg mb-2'>Price per month: ${car.pricePerMonth}</p>
       <p className='text-lg mb-2'>Available from: {car.availableFrom}</p>
       <p className='text-lg mb-2'>Rating: {car.rating} &#9733;</p>
       <p className='text-lg mb-2'>Locality: {car.locality}</p>
     </Link>     
        ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cars`);
  const cars: Car[] = await res.json();

  return {
    props: {
      cars,
    },
  };
};


