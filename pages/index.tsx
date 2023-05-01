import type { GetStaticProps } from 'next';
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

  if(!cars) return (<div>loading...</div>)

  return (
    <div className='w-full flex flex-col p-20'>
       <Navbar />
       <h1 className="text-4xl font-semibold my-6 text-center">RENT YOUR DREAM CAR</h1>
      <div className='flex flex-col'>
      <h2 className='text-xl px-4'>Available Cars</h2>
        <div className='flex '>
        {cars?.map((car, index) => (
        <Link href={`/car/${car._id}`} key={index} className='hover:opacity-80' style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
            <h3>{car.name}</h3>
            <img src={car.image} alt={car.name} style={{ width: '100%', maxHeight: '200px'}} />
            <p>{car.description}</p>
            <p>Price per month: ${car.pricePerMonth}</p>
            <p>Available from: {car.availableFrom}</p>
            <p>Rating: {car.rating}</p>
            <p>Locality: {car.locality}</p>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cars`);
  const cars: Car[] = await res.json();

  return {
    props: {
      cars,
    },
    revalidate: 60, // Optional: Set the number of seconds to re-fetch the data.
  };
};
