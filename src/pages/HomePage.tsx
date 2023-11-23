import clsx from 'clsx';
import { justifyBetween } from 'lib/styles';

const HomePage = () => {
  return (
    <div className={clsx(justifyBetween)}>
      <div className="text-red-500 text-lg">hello world</div>
      <span>kkkkk</span>
    </div>
  );
};

export default HomePage;
