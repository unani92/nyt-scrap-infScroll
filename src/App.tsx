import clsx from 'clsx';
import { black80, justifyAround, justifyCenter } from 'lib/styles';
import { BookText, Home, LucideIcon } from 'lucide-react';
import HomePage from 'pages/HomePage';
import ScrapedPage from 'pages/ScrapedPage';
import { ReactElement, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ReactQueryProvider from 'store/reactQueryStore';

function App() {
  return (
    <ReactQueryProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scraped" element={<ScrapedPage />} />
        </Routes>
      </Layout>
    </ReactQueryProvider>
  );
}

function Layout({ children }: { children: JSX.Element }) {
  return (
    <main
      className={clsx('max-w-[560px] min-w-[375px] w-full p-0 m-0 h-[100vh] bg-gray-200 overflow-y-hidden relative')}
    >
      {children}
      <BottomNav />
    </main>
  );
}

type Nav = {
  route: `/${string}`;
  icon: (isPresentRoute: boolean) => ReactElement<LucideIcon>;
  label: string;
};

function BottomNav() {
  const navigate = useNavigate();
  const navs = useMemo<Nav[]>(
    () => [
      {
        label: '홈',
        route: '/',
        icon: (isPresentRoute: boolean) => <Home color={isPresentRoute ? 'white' : black80} size={24} />,
      },
      {
        label: '스크랩',
        route: '/scraped',
        icon: (isPresentRoute: boolean) => <BookText color={isPresentRoute ? 'white' : black80} size={24} />,
      },
    ],
    []
  );
  const presentRoute = useLocation().pathname;
  return (
    <div className={clsx(justifyAround, 'bg-black-100 p-5 absolute bottom-0 left-0 w-full rounded-t-lg')}>
      {navs.map(nav => (
        <div className={clsx(justifyCenter, 'flex-col')} key={nav.route} onClick={() => navigate(nav.route)}>
          <div className={clsx('mb-2')}>{nav.icon(presentRoute === nav.route)}</div>
          <span className={clsx('text-black-80 text-xs', presentRoute === nav.route && 'text-white')}>{nav.label}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
