import { FC, useState, FormEvent } from 'react';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = "" }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail("");
    } catch (err) {
      setError("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`bg-[#111723] mt-3 ${className}`} role="contentinfo">
      <div className="container mx-auto px-4 pt-5">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="lg:w-1/3 order-2 lg:order-1">
            <img
              className="w-20 h-16 mb-3"
              src="/image/bD9EZ6eoPgcRV7MGFqpc99FnbYMxFKF63uhWAwA5.jpg"
              alt="Logo"
              width={80}
              height={64}
              loading="lazy"
            />
            <p className="text-white text-sm leading-relaxed">
              Enjoy your body enhancement journey with Fagas Corset, the leading brand in health and beauty. Discover our high-quality body shaping tools and innovative medical corsets. Explore the benefits of our natural soaps and unique perfumes. Visit our website for a unique shopping experience and enjoy a healthy, beautiful body.
            </p>

            <form onSubmit={handleSubmit} className="mt-4" aria-label="Newsletter subscription">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="flex-1 p-2 rounded-l bg-white outline-none text-sm"
                  aria-label="Email address"
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  className="bg-primary text-white px-4 rounded-r text-sm"
                  disabled={isSubmitting}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>

          {/* Right Side */}
          <div className="lg:w-2/3 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Contact Info */}
              <section aria-labelledby="contact-heading">
                <h6 
                  id="contact-heading"
                  className="border-b border-gray-700 text-white pb-2 mb-3"
                >
                  Contact Info
                </h6>
                <address className="not-italic">
                  <div className="mb-2">
                    <span className="text-gray-500 text-sm">Address:</span>
                    <div className="text-gray-400 text-sm">Egypt</div>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-500 text-sm">Phone:</span>
                    <div className="text-gray-400 text-sm">
                      <div>
                        1102893016
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-gray-500 text-sm">Email:</span>
                    <div className="text-sm">
                      <a 
                        href="mailto:pubgmedox@gmail.com" 
                        className="hover:text-white text-gray-400 transition duration-300"
                      >
                        pubgmedox@gmail.com
                      </a>
                    </div>
                  </div>
                </address>
              </section>

              {/* Social Media */}
              <section aria-labelledby="social-heading">
                <h6 
                  id="social-heading"
                  className="border-b border-gray-700 text-white pb-2 mb-3"
                >
                  Social Media
                </h6>
                <nav aria-label="Social media links">
                  <ul className="space-y-2">
                    <li>
                      <a href="https://wa.me/201102893016" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white">
                        WhatsApp
                      </a>
                    </li>
                    <li>
                      <a href="https://wa.me/201102893016" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/mohamed.mesa.10" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tiktok.com/@mesa112003?lang=ar" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white">
                        TikTok
                      </a>
                    </li>
                    <li>
                      <a href="https://wa.me/201102893016" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white">
                        Snapchat
                      </a>
                    </li>
                  </ul>
                </nav>
              </section>

              {/* My Account */}
              <section aria-labelledby="account-heading">
                <h6 
                  id="account-heading"
                  className="border-b border-gray-700 text-white pb-2 mb-3"
                >
                  My Account
                </h6>
                <nav aria-label="Account links">
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-400 text-sm hover:text-white">
                        Login
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 text-sm hover:text-white">
                        Order History
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 text-sm hover:text-white">
                        My Wishlist
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 text-sm hover:text-white">
                        Track Order
                      </a>
                    </li>
                  </ul>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#0d111b] py-2 mt-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-sm">
            © fagas {currentYear}
          </div>
          <div>
            <img 
              src="/image/fott.png" 
              alt="Payment methods" 
              className="w-[350px]" 
              width={350}
              height={50}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
