import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-green-100">
      <header className="bg-combination py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">About Safe Spoon</h1>
        </div>
      </header>
      <div>
        
      </div>
      <main className="container   mx-auto mt-10  px-4 sm:px-6  lg:px-8">
    
        <section className="bg-c2 mt-10 p-8  rounded-lg mx-auto w-1/2 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <p className="text-black-900 font-bold text-3xl mb-4">Overview</p>
            <p className="text-gray-700 text-lg">
              At Safe Spoon, we are dedicated to revolutionizing the way you approach your health and nutrition. Our innovative web application is designed to make your life easier and healthier by providing personalized dietary solutions tailored specifically to your needs. Our mission is to empower individuals to make informed decisions about their nutrition and health. We aim to simplify the process of understanding the ingredients in your groceries and how they fit into your unique dietary requirements.
            </p>
          </div>
        </section>
        <section className="bg-c2 mt-10 p-8 a rounded-lg mx-auto w-1/2 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <p className="text-black-900 font-bold text-3xl mb-4">How to Use Safe Spoon</p>
            <p className="text-gray-700 text-lg">
              1. Sign In: Begin by signing in to your Safe Spoon account. <br />
              2. Sign Up: If you don't have an account, sign up to get started. <br />
              3. Input Allergies: Provide any allergy information and dietary restrictions. <br />
              4. Scan or Upload Image: Click or upload a picture of your grocery or its ingredients. <br />
              5. Get Personalized Suggestions: Receive personalized suggestions, including risk levels, based on the uploaded ingredients and your allergies.
            </p>
          </div>
        </section>
        <section className="bg-c2 mt-10 p-8 rounded-lg mx-auto w-1/2 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <p className="text-black-900 font-bold text-3xl mb-4">Why Choose Safe Spoon?</p>
            <p className="text-gray-700 text-lg">
              User-Friendly Interface: Our web app is designed to be intuitive and easy to use, so you can focus on your health without any hassle. <br />
              Personalized Plans: We understand that everyone is unique. Our solutions are customized to meet your individual needs. <br />
              Comprehensive Health Approach: We go beyond just nutrition. By integrating diet and exercise, we provide a holistic approach to health and wellness. <br />
              Expert-Backed: Our recommendations are developed with the guidance of nutritionists and fitness experts to ensure you receive the best advice. <br />
              Join us on a journey to better health with Safe Spoon. Let us help you make smart, informed choices about your nutrition and fitness. Your health is our priority.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
