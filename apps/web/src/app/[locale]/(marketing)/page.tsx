'use server';

import { getI18n } from '@/locale/server';

export default async function HomePage() {
  const t = await getI18n();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(170)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400/30 dark:bg-purple-500/20 w-1 h-6 animate-rain rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center p-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 dark:from-purple-300 dark:via-purple-500 dark:to-purple-700 mb-4">
          {t("homepage.construction.title")}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {t("homepage.construction.description")}
        </p>
        <a href="https://github.com/Joao4584/meta-rtc" target="_blank"
          className="inline-block bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 hover:bg-purple-800 px-6 py-3 rounded-md font-semibold transition-colors duration-300"
        >
          {t("homepage.construction.button.github")}
        </a>
        <div className="mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} - Joao4584
          </p>
        </div>
      </div>
    </div>
  );
}
