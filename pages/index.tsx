import type { GetStaticProps } from 'next';
import Navbar from '../components/Navbar';

type Car = {
  id: string;
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
     <h1 className='text-3xl text-center'>Car Rental App</h1>
      <div className='flex flex-col'>
      <h2 className='text-xl'>Available Cars</h2>
        <div className='flex '>
        {cars?.map((car, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
            <h3>{car.name}</h3>
            <img src={car.image} alt={car.name} style={{ width: '100%', maxHeight: '200px'}} />
            <p>{car.description}</p>
            <p>Price per month: ${car.pricePerMonth}</p>
            <p>Available from: {car.availableFrom}</p>
            <p>Rating: {car.rating}</p>
            <p>Locality: {car.locality}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/cars');
  const cars: Car[] = await res.json();

  return {
    props: {
      cars,
    },
    revalidate: 60, // Optional: Set the number of seconds to re-fetch the data.
  };
};
