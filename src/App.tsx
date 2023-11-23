import clsx from 'clsx';
import HomePage from 'pages/HomePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

function Layout({ children }: { children: JSX.Element }) {
  return <main className={clsx('max-w-[560px] min-w-[375px] w-full p-0 m-0 h-[100vh] bg-gray-200')}>{children}</main>;
}

export default App;
