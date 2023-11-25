import clsx from 'clsx';
import HomeHeader from 'components/HomeHeader';
import Articles from 'components/Articles';

const HomePage = () => {
  return (
    <div className={clsx()}>
      <HomeHeader />
      <Articles />
    </div>
  );
};

export default HomePage;
