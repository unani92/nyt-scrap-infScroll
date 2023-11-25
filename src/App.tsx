import clsx from 'clsx';
import { justifyAround, justifyCenter } from 'lib/styles';
import { BookText, Home, LucideIcon } from 'lucide-react';
import HomePage from 'pages/HomePage';
import { ReactElement } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ReactQueryProvider from 'store/reactQueryStore';

function App() {
  return (
    <ReactQueryProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </ReactQueryProvider>
  );
}

function Layout({ children }: { children: JSX.Element }) {
  return (
    <main className={clsx('max-w-[560px] min-w-[375px] w-full p-0 m-0 h-[100vh] bg-gray-200 overflow-y-hidden')}>
      {children}
      <BottomNav />
    </main>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  const navs: { route: `/${string}`; icon: ReactElement<LucideIcon>; label: string }[] = [
    { label: '홈', route: '/', icon: <Home color="white" size={24} /> },
    { label: '스크랩', route: '/scrap', icon: <BookText color="white" size={24} /> },
  ];
  return (
    <div className={clsx(justifyAround, 'bg-black-100 p-5 absolute bottom-0 left-0 w-full rounded-t-lg')}>
      {navs.map(nav => (
        <div className={clsx(justifyCenter, 'flex-col')} key={nav.route} onClick={() => navigate(nav.route)}>
          <div className="mb-2">{nav.icon}</div>
          <span className="text-white text-xs">{nav.label}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
