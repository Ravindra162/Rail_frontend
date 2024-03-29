import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="bg-gradient-to-r from-[#591979] via-[#991986] to-[#591979] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-200 font-semibold tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Explore Our Offerings
          </p>
          <p className="mt-4 max-w-2xl text-xl text-indigo-200 lg:mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt minima, maxime ipsa architecto quo
            inventore harum ex vitae modi dicta, impedit cum autem eum recusandae magnam!
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap -m-4">
            {/* Service 1 */}
            <div className="lg:w-1/3 md:w-1/2 p-4">
              <div className="flex relative">
                <img alt="service" className="absolute inset-0 w-full h-full object-cover" src="service1.jpg" />
                <div className="relative w-full h-64 bg-white bg-opacity-75 rounded-lg p-8">
                  <h3 className="text-xl font-medium text-gray-900 title-font mb-2">Service 1</h3>
                  <p className="leading-relaxed">Description of Service 1</p>
                </div>
              </div>
            </div>
            {/* Service 2 */}
            <div className="lg:w-1/3 md:w-1/2 p-4">
              <div className="flex relative">
                <img alt="service" className="absolute inset-0 w-full h-full object-cover" src="service2.jpg" />
                <div className="relative w-full h-64 bg-white bg-opacity-75 rounded-lg p-8">
                  <h3 className="text-xl font-medium text-gray-900 title-font mb-2">Service 2</h3>
                  <p className="leading-relaxed">Description of Service 2</p>
                </div>
              </div>
            </div>
            {/* Service 3 */}
            <div className="lg:w-1/3 md:w-1/2 p-4">
              <div className="flex relative">
                <img alt="service" className="absolute inset-0 w-full h-full object-cover" src="service3.jpg" />
                <div className="relative w-full h-64 bg-white bg-opacity-75 rounded-lg p-8">
                  <h3 className="text-xl font-medium text-gray-900 title-font mb-2">Service 3</h3>
                  <p className="leading-relaxed">Description of Service 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div to="/user" 
        onClick={()=>{
            window.scrollTo(0, 0);
        }}
        className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg">
          Back to Home
        </div>
      </div>
    </div>
  );
};

export default Services;
