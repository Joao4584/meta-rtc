'use client';

export default function AuthPage() {
  return (
    <section 
      className='w-screen h-screen relative overflow-y-hidden' 
      style={{
        backgroundImage: "url('/randon-background.jpg')", 
        backgroundSize: "cover", 
        backgroundPosition: 'center'
      }}
    >
      <div 
        className='absolute inset-0 bg-black/30'
        style={{
          backdropFilter: 'blur(12px)'
        }}
      ></div>
      <div className="relative z-10 text-white">
        
      </div>
    </section>
  );
}
