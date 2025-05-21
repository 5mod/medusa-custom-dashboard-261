import { motion } from "motion/react"

import { IconAvatar } from "../icon-avatar"

export default function AvatarBox({ checked }: { checked?: boolean }) {
  return (
    <IconAvatar
      size="xlarge"
      className="bg-ui-button-neutral shadow-buttons-neutral after:button-neutral-gradient relative mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-xl after:inset-0 after:content-['']"
    >
      {checked && (
        <motion.div
          className="absolute -right-[5px] -top-1 flex size-5 items-center justify-center rounded-full border-[0.5px] border-[rgba(3,7,18,0.2)] bg-[#3B82F6] bg-gradient-to-b from-white/0 to-white/20 shadow-[0px_1px_2px_0px_rgba(3,7,18,0.12),0px_1px_2px_0px_rgba(255,255,255,0.10)_inset,0px_-1px_5px_0px_rgba(255,255,255,0.10)_inset,0px_0px_0px_0px_rgba(3,7,18,0.06)_inset]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <motion.path
              d="M5.8335 10.4167L9.16683 13.75L14.1668 6.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.3,
                delay: 1.1,
                bounce: 0.6,
                ease: [0.1, 0.8, 0.2, 1.01],
              }}
            />
          </svg>
        </motion.div>
      )}
      <svg
        className="rounded-[10px]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#18181B" />
        {/* Modern and cool stars SVG */}
        <g>
          <g>
            <polygon
              points="200,80 217,150 290,150 230,190 250,260 200,215 150,260 170,190 110,150 183,150"
              fill="url(#starGradient1)"
              stroke="white"
              strokeWidth="4"
              opacity="0.95"
            />
            <polygon
              points="320,110 325,130 345,130 328,142 334,162 320,150 306,162 312,142 295,130 315,130"
              fill="url(#starGradient2)"
              stroke="white"
              strokeWidth="2"
              opacity="0.7"
            />
            <polygon
              points="80,300 85,315 105,315 90,325 95,340 80,330 65,340 70,325 55,315 75,315"
              fill="url(#starGradient3)"
              stroke="white"
              strokeWidth="2"
              opacity="0.7"
            />
            <polygon
              points="340,300 345,315 365,315 350,325 355,340 340,330 325,340 330,325 315,315 335,315"
              fill="url(#starGradient4)"
              stroke="white"
              strokeWidth="2"
              opacity="0.7"
            />
            <polygon
              points="60,100 65,115 85,115 70,125 75,140 60,130 45,140 50,125 35,115 55,115"
              fill="url(#starGradient5)"
              stroke="white"
              strokeWidth="2"
              opacity="0.7"
            />
          </g>
          <circle
            cx="200"
            cy="200"
            r="60"
            fill="url(#starGlow)"
            opacity="0.25"
          />
        </g>
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbe6" stopOpacity="1" />
            <stop offset="100%" stopColor="#fffbe6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="starGradient1" x1="200" y1="80" x2="200" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffbe6" />
            <stop offset="1" stopColor="#facc15" />
          </linearGradient>
          <linearGradient id="starGradient2" x1="320" y1="110" x2="320" y2="162" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0abfc" />
            <stop offset="1" stopColor="#a21caf" />
          </linearGradient>
          <linearGradient id="starGradient3" x1="80" y1="300" x2="80" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bae6fd" />
            <stop offset="1" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="starGradient4" x1="340" y1="300" x2="340" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bbf7d0" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="starGradient5" x1="60" y1="100" x2="60" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fca5a5" />
            <stop offset="1" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
      </svg>
    </IconAvatar>
  )
}
