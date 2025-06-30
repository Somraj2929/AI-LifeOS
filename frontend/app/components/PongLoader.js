export default function PongLoader() {
  return (
    <div className="flex justify-center items-center h-[224px] bg-gray-100 mb-4 mt-[-10px]">
      <div className="relative w-[64px] h-[64px]">
        {/* Left paddle */}
        <div className="absolute left-0 top-[20px] w-2 h-14 bg-black rounded animate-paddle-left" />
        {/* Right paddle */}
        <div className="absolute right-0 top-[10px] w-2 h-14 bg-black rounded animate-paddle-right" />
        {/* Ball */}
        <div className="absolute top-[36px] left-[1px] w-3 h-3 bg-red-500 rounded-full animate-pong-ball" />
      </div>
      <style jsx>{`
        @keyframes paddle-left {
          0%,
          100% {
            transform: translateY(-16px);
          }
          50% {
            transform: translateY(16px);
          }
        }
        @keyframes paddle-right {
          0%,
          100% {
            transform: translateY(16px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @keyframes pong-ball {
          0% {
            left: 8px;
            top: 36px;
          }
          50% {
            left: 45px;
            top: 25px;
          }
          100% {
            left: 8px;
            top: 36px;
          }
        }
        .animate-paddle-left {
          animation: paddle-left 1s infinite linear;
        }
        .animate-paddle-right {
          animation: paddle-right 1s infinite linear;
        }
        .animate-pong-ball {
          animation: pong-ball 1s infinite linear;
        }
      `}</style>
    </div>
  );
}
