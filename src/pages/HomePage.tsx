import clsx from 'clsx';
import HomeHeader from 'components/homePage/HomeHeader';
import Articles from 'components/homePage/Articles';

const HomePage = () => {
  return (
    <div className={clsx()}>
      <HomeHeader />
      <Articles />
    </div>
  );
};

export default HomePage;
