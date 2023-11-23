import clsx from 'clsx';
import { justifyBetween } from 'lib/styles';
import HomeHeader from 'components/HomeHeader';

const HomePage = () => {
  return (
    <div className={clsx(justifyBetween)}>
      <HomeHeader />
    </div>
  );
};

export default HomePage;
