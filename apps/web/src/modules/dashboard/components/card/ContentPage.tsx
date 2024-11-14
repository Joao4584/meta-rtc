import { ReactNode } from 'react';

interface ContentComponentPageProps {
  title: string;
  children: ReactNode;
}

export default function ContentComponentPage({ title, children }: ContentComponentPageProps) {
  return (
    <div className="p-6  min-h-screen text-white">
      <h1 className="text-2xl font-semibold mb-6">{title}</h1>
      
      <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-lg">
       
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}
