
export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* <!-- Gradient Background --> */}
        <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="bgGradientStop1" />
            <stop offset="100%" className="bgGradientStop2" />
            </linearGradient>
            
            <linearGradient id="sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stopGradient1" />
            <stop offset="100%" style={{ stopColor: "#f0f0f0", stopOpacity: 1 }} />
            </linearGradient>
            
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.2"/>
            </filter>
        </defs>
        
        {/* <!-- Main Circle with Gradient --> */}
        <circle cx="100" cy="100" r="90" fill="url(#bgGradient)" filter="url(#shadow)" />
        
        {/* <!-- Decorative Rings --> */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.3" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.2" />
        
        {/* <!-- SK Combined Logo Element --> */}
        <g transform="translate(55, 65) scale(0.9)">
            {/* <!-- S Shape --> */}
            <path d="M30 20 C10 20, 0 35, 0 55 C0 75, 15 85, 40 90 C65 95, 80 105, 80 125 C80 150, 60 165, 35 165 C10 165, -10 150, -10 125" 
                stroke="#ffffff" stroke-width="14" fill="none" stroke-linecap="round" />
            
            {/* <!-- K Shape --> */}
            <path d="M70 10 L70 140 M70 70 L120 10 M70 70 L120 140" 
                stroke="#ffffff" stroke-width="14" fill="none" stroke-linecap="round" />
        </g>
        
        {/* <!-- Academic Element - Subtle Book Pages at Bottom --> */}
        <path d="M70 170 C85 160, 115 160, 130 170 L130 180 C115 170, 85 170, 70 180 Z" fill="#ffffff" opacity="0.7" />
        <path d="M70 175 C85 165, 115 165, 130 175 L130 185 C115 175, 85 175, 70 185 Z" fill="#ffffff" opacity="0.8" />
        
        {/* <!-- Digital/Modern Element --> */}
        <circle cx="160" cy="40" r="12" fill="#ffffff" opacity="0.8" />
        <circle cx="40" cy="40" r="8" fill="#ffffff" opacity="0.6" />
        <circle cx="170" cy="170" r="6" fill="#ffffff" opacity="0.4" />
        <circle cx="30" cy="170" r="10" fill="#ffffff" opacity="0.5" />
        </svg>
    );
}

