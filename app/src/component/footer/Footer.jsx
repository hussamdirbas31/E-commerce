import { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/Context';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const context = useContext(myContext);
  const { mode } = context;

  // Enhanced maroon color palette matching the Navbar
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    secondary: '#d4a59a',
    secondaryHover: '#c08e80',
    background: mode === 'light' ? '#ffffff' : '#0f0f0f',
    text: mode === 'light' ? '#1a1a1a' : '#f5f5f5',
    textSecondary: mode === 'light' ? '#4a4a4a' : '#d1d1d1',
    border: mode === 'light' ? '#e8e8e8' : '#2a2a2a',
    glass: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 15, 15, 0.95)',
  };

  const footerSections = [
    {
      title: 'CATEGORIES',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Order', path: '/orders' },
        { name: 'Local For Vocal', path: '/local' },
        { name: 'Cart', path: '/cart' }
      ]
    },
    {
      title: 'CUSTOMER SERVICE',
      links: [
        { name: 'Return Policy', path: '/returnpolicy' },
        { name: 'About', path: '/about' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'SERVICES',
      links: [
        { name: 'Privacy Policy', path: '/privacypolicy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook size={18} />, url: '#' },
    { icon: <FaTwitter size={18} />, url: '#' },
    { icon: <FaInstagram size={18} />, url: '#' },
    { icon: <FaLinkedin size={18} />, url: '#' }
  ];

  return (
    <footer 
      className="w-full border-t"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        borderColor: colors.border
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 
                className="font-medium uppercase tracking-wider text-sm"
                style={{ color: colors.primary }}
              >
                {section.title}
              </h3>
              <nav className="space-y-2">
                {section.links.map((link, idx) => (
                  <div key={idx}>
                    <Link
                      to={link.path}
                      className="text-sm transition-colors duration-200 block relative group"
                      style={{ color: colors.textSecondary }}
                    >
                      <span className="relative">
                        {link.name}
                        <span 
                          className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                      </span>
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          ))}

          <div className="space-y-4">
            <h3 
              className="font-medium uppercase tracking-wider text-sm"
              style={{ color: colors.primary }}
            >
              Payment Methods
            </h3>
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.glass }}>
              <img 
                src="https://ecommerce-sk.vercel.app/pay.png" 
                alt="Accepted payment methods" 
                className="w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div 
        className="border-t py-6"
        style={{ 
          borderColor: colors.border,
          backgroundColor: colors.glass
        }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span 
                className="text-2xl font-bold px-2 py-1 rounded tracking-tight hover:tracking-wide transition-all duration-300"
                style={{ color: colors.primary }}
              >
                Artizia
              </span>
            </Link>
            <p 
              className="text-sm ml-4"
              style={{ color: colors.textSecondary }}
            >
              © {new Date().getFullYear()} Artizia —
              <a 
                href="https://www.artizia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 hover:underline"
                style={{ color: colors.primary }}
              >
                www.Artizia.com
              </a>
            </p>
          </div>

          <div className="flex space-x-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-opacity-10 transition-all duration-300"
                style={{ 
                  color: colors.primary,
                  ':hover': { 
                    backgroundColor: colors.primary,
                    color: '#fff'
                  }
                }}
                aria-label={`Follow us on ${social.icon.type.name.replace('Fa', '')}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}