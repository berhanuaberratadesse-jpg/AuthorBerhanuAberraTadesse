import { useState } from 'react';
import { Mail, Facebook, Linkedin, Phone } from 'lucide-react';
import { ChatBot } from '../chatbot/ChatBot';
import { ProductSelector } from '../components/ProductSelector';
import { Checkout } from '../components/Checkout';
import { YouTubeSection } from '../components/YouTubeSection';

export function Home() {
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <ChatBot />
      <ProductSelector
        isOpen={productSelectorOpen}
        onClose={() => setProductSelectorOpen(false)}
        onAddToCart={() => setCartOpen(true)}
      />
      <Checkout isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <main id="main" className="pt-16">
        <section id="about" className="py-20 bg-slate-800/40 backdrop-blur-sm">
          {/* Ensure your existing about content is here or imported */}
        </section>

        <section id="book" className="py-20 bg-slate-800/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Ensure your existing book content is here or imported */}
            </div>
          </div>
        </section>

        <YouTubeSection />

        <section id="testimonials" className="py-20 bg-slate-800/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Ensure your existing testimonials content is here or imported */}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-slate-900/90 text-white backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Contact: Get In Touch</h2>
              <p className="text-xl text-gray-300">
                Have questions or want to connect? Reach out to learn more about "True Light" and Berhanu's ministry work.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 max-w-2xl mx-auto">
              <form action="https://formsubmit.co/truelight@berhanutadesse.com" method="POST" className="space-y-6">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-8 py-4 bg-amber-500 text-white font-bold text-lg rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Mail className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}