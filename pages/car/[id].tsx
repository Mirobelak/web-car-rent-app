import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { GetServerSideProps } from 'next';
import {Car} from "../index"
import CheckoutForm from '../../components/CheckoutForm';


export default function CarPage({car} : {car: Car}) {
  const router = useRouter();
  const { id } = router.query;

  if(!id) return (<div>loading...</div>)

  if(!car) return (<div>loading...</div>)

  return (
    <div className="container mx-auto px-4">
        <Navbar />
        <h1 className="text-4xl font-semibold my-6">{car.name}</h1>
      <div className="flex flex-wrap mt-8">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            className="w-full h-auto object-cover"
            src={car.image}
            alt={car.name}
          />
        </div>
        <div className="w-full lg:w-1/2 px-5 flex flex-col gap-2">
        <p className="mb-4 text-2xl">Rating: {car.rating} &#9733;</p>
          <p className="mb-4 text-2xl">{car.description}</p>
          <p className="mb-4 text-2xl">Locality: {car.locality}</p>
          <p className="mb-4 text-2xl">Price: ${car.pricePerMonth} per month</p>
          <p className="mb-4 text-2xl">Available from: {car.availableFrom}</p>
        </div>
        <div className="mt-8 w-full lg:w-1/2 flex justify-evenly items-center">
            <button className="bg-orange-400 text-white py-2 px-4 mr-4 rounded">
            &#8383; Pay with Crypto  &#8383;
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded">
              Pay with Fiat Money
            </button>
          </div>
      </div>
      {/* Reviews section */}
      <div className='flex '>
      <div className="mt-16 w-full lg:w1/2">
        <h2 className="text-3xl font-semibold mb-6">Reviews</h2>
        <p>Be first to add review </p>
        {/* {car.reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded">
            <h3 className="font-semibold mb-2">{review.author}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.content}</p>
          </div>
        ))} */}
      </div>

      {/* Video player */}
      <div className="my-5 py-5 w-full lg:w1/2">
  <h2 className="text-3xl font-semibold mb-6">Video</h2>
  <div className="w-full aspect-w-16 aspect-h-9">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Wy1lHtzz7ms" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  </div>
</div>
      </div>
      <CheckoutForm />

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
  
    // Fetch the car data from the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/car?id=${id}`);
    const car = await res.json();

  
    return {
      props: {
        car,
      },
    };
  };

