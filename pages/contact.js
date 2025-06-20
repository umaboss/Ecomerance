import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout title="Contact Us - Genroar Fashion">
      <section className="relative bg-gradient-to-br from-secondary-50 to-white py-20 text-center">
        <h1 className="text-5xl font-bold text-secondary-700 mb-4">Contact Genroar Fashion</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you! Fill out the form below or reach us directly.
        </p>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-gray-50 rounded-xl shadow p-8 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" className="input-field w-full" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="input-field w-full" placeholder="you@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea className="input-field w-full" rows={5} placeholder="Type your message..." required />
            </div>
            <button className="btn-primary py-3 text-lg">Send Message</button>
          </form>

          {/* Contact Info & Map */}
          <div className="flex flex-col gap-8 justify-center">
            <div className="bg-primary-50 rounded-xl p-6 shadow text-left">
              <h3 className="text-xl font-semibold text-primary-700 mb-2">Contact Information</h3>
              <p className="text-gray-700 mb-2">Email: <a href="mailto:contact@genroar.com" className="text-primary-600 underline">contact@genroar.com</a></p>
              <p className="text-gray-700 mb-2">Phone: <a href="tel:+1234567890" className="text-primary-600 underline">+1 234 567 890</a></p>
              <p className="text-gray-700">Address: 123 Fashion Street, Style City, Country</p>
            </div>
            <div className="rounded-xl overflow-hidden shadow">
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                [Map Placeholder]
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 