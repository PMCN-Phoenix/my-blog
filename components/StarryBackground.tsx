// components/StarryBackground.tsx
export default function StarryBackground() {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-950">
        {/* 星空层：使用多个绝对定位的点，或者通过 CSS 动画生成 */}
        <div className="stars-container absolute inset-0" />
        {/* 太阳 */}
        <div className="sun absolute bottom-10 right-10 w-32 h-32 rounded-full bg-yellow-200 opacity-80 blur-xl animate-pulse" />
        <div className="sun-core absolute bottom-12 right-12 w-24 h-24 rounded-full bg-yellow-100 opacity-90 blur-sm" />
      </div>
    );
  }