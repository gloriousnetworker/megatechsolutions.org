import type { Partner } from '../types';

export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;

  const doubled = [...partners, ...partners];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />
      <div
        className="flex items-center gap-8 animate-marquee"
        style={{ width: 'max-content' }}
      >
        {doubled.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-center w-40 h-24 hover:shadow-md transition-all duration-300"
          >
            {partner.website ? (
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ) : (
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
