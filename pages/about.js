import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="About Us - Genroar Fashion">
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20 text-center">
        <h1 className="text-5xl font-bold text-primary-700 mb-4">About Genroar Fashion</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Genroar Fashion is your go-to destination for the latest trends, premium quality, and unbeatable style. We believe fashion is more than just clothing—it's a statement, an experience, and a way to express yourself.
        </p>
        <img src="/assets/banner.jpeg" alt="Genroar Fashion" className="mx-auto rounded-2xl shadow-lg w-full max-w-3xl mb-8" />
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-50 rounded-xl p-8 shadow">
              <h3 className="text-xl font-semibold text-primary-700 mb-2">Mission</h3>
              <p className="text-gray-700">To empower individuals to express their unique style with confidence by providing high-quality, affordable, and trendsetting fashion for everyone.</p>
            </div>
            <div className="bg-secondary-50 rounded-xl p-8 shadow">
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">Vision</h3>
              <p className="text-gray-700">To become the most loved and trusted online fashion destination, inspiring millions to embrace their individuality and creativity.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" className="w-24 h-24 rounded-full mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">Ali Raza</h3>
              <p className="text-primary-600">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" className="w-24 h-24 rounded-full mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">Sara Khan</h3>
              <p className="text-secondary-600">Head of Design</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Team Member" className="w-24 h-24 rounded-full mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">Bilal Ahmed</h3>
              <p className="text-accent-600">Marketing Lead</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Team Member" className="w-24 h-24 rounded-full mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">Ayesha Noor</h3>
              <p className="text-primary-500">Customer Success</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What Makes Genroar Unique?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-50 rounded-xl p-8 shadow text-center">
              <h3 className="text-xl font-semibold text-primary-700 mb-2">Trendsetting Styles</h3>
              <p className="text-gray-700">We bring you the latest and most stylish collections, handpicked by our expert team.</p>
            </div>
            <div className="bg-secondary-50 rounded-xl p-8 shadow text-center">
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">Quality & Affordability</h3>
              <p className="text-gray-700">Premium quality at prices you'll love—because everyone deserves to look their best.</p>
            </div>
            <div className="bg-accent-50 rounded-xl p-8 shadow text-center">
              <h3 className="text-xl font-semibold text-accent-700 mb-2">Customer First</h3>
              <p className="text-gray-700">Our customers are at the heart of everything we do. Your satisfaction is our top priority.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 