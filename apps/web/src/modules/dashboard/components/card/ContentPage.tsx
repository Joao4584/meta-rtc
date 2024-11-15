import { ReactNode } from 'react';

interface ContentComponentPageProps {
  className? : string,
  children: ReactNode
}

export default function ContentComponentPage({ className, children }: ContentComponentPageProps) {
  return (
    <div className={`p-6   text-white ${className}`}>
      <div className={`bg-gradient-to-tr from-gray-800 to-transparent bg-opacity-60 p-4 pt-1 rounded-xl shadow-lg`}>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}
