import { useNavigate } from 'react-router-dom'

const initials = (name) =>
  name
    ?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '??'

export default function PoliticianCard({ politician }) {

  const navigate = useNavigate()

  const {
    _id,
    name,
    party,
    location,
    image,
    partySymbol,
    slogan,
  } = politician

  return (
    <div
      onClick={() => navigate(`/politician/${_id}`)}
      className="card cursor-pointer group hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >

      {/* Slogan Marquee */}
      {slogan && (
        <div className="bg-gold text-black text-xs py-1 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block px-4 font-semibold">
            {slogan}
          </div>
        </div>
      )}

      <div className="p-5">

        <div className="flex gap-4 items-start">

          {/* Profile */}
          <div className="relative">

            {image ? (
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border border-gold/30"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                {initials(name)}
              </div>
            )}

            {/* Party Symbol */}
            {partySymbol && (
              <img
                src={partySymbol}
                alt="party"
                className="w-7 h-7 rounded-full object-cover absolute -bottom-1 -right-1 border-2 border-black"
              />
            )}

          </div>

          {/* Info */}
          <div className="flex-1">

            <h3 className="text-parchment font-semibold text-lg">
              {name}
            </h3>

            <p className="text-gold text-sm mt-1">
              {party}
            </p>

            <p className="text-slate-portal text-sm mt-2">
              {location}
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}