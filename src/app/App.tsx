import { motion } from 'motion/react';
import { useEffect } from 'react';

const forestImages = [
  'https://images.unsplash.com/photo-1765974082420-f67520211419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZvcmVzdCUyMGluc3BpcmluZyUyMHBhbm9yYW1pY3xlbnwxfHx8fDE3NzA0MDMwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1667216324249-c04ad5284ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBzdW5zZXQlMjBsYW5kc2NhcGUlMjBpbnNwaXJpbmd8ZW58MXx8fHwxNzcwNDAzMDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1718433930602-ec186e9210d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXNoJTIwZ3JlZW4lMjBuYXR1cmUlMjBwYW5vcmFtYXxlbnwxfHx8fDE3NzA0MDMwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1729952551557-a403bc9277bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBhdXR1bW4lMjBmb3Jlc3QlMjBzY2VuaWN8ZW58MXx8fHwxNzcwNDAzMDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
];

export default function App() {
  useEffect(() => {
    document.title = 'Lin Capital';
    
    // Update favicon to just "L"
    const faviconSvg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2318181b"/><text x="50" y="70" text-anchor="middle" font-size="70" font-weight="400" font-family="Montserrat, sans-serif" fill="white">L</text></svg>`;
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = faviconSvg;
    if (!document.querySelector("link[rel~='icon']")) {
      document.head.appendChild(link);
    }
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lin Capital');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Lin Capital';
      document.head.appendChild(meta);
    }
    
    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (metaOgTitle) {
      metaOgTitle.setAttribute('content', 'Lin Capital');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Lin Capital';
      document.head.appendChild(meta);
    }
    
    const metaOgDescription = document.querySelector('meta[property="og:description"]');
    if (metaOgDescription) {
      metaOgDescription.setAttribute('content', 'Lin Capital');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Lin Capital';
      document.head.appendChild(meta);
    }
  }, []);
  
  return (
    <div className="size-full relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Animated forest background that moves inside the text */}
      <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start overflow-hidden md:p-4">
        <div 
          className="relative"
          style={{
            WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-size="280" font-weight="400" letter-spacing="12" font-family="Montserrat, sans-serif" fill="white">LIN</text></svg>')`,
            maskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400"><text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-size="280" font-weight="400" letter-spacing="12" font-family="Montserrat, sans-serif" fill="white">LIN</text></svg>')`,
            WebkitMaskSize: '400px 160px',
            maskSize: '400px 160px',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            width: '400px',
            height: '160px'
          }}
        >
          <motion.div
            className="absolute flex h-full"
            animate={{
              x: ['0px', '-2400px']
            }}
            transition={{
              duration: 180,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '4800px',
              top: 0,
              left: 0
            }}
          >
            {[...forestImages, ...forestImages].map((img, index) => (
              <div
                key={index}
                className="h-full"
                style={{
                  width: '600px',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}