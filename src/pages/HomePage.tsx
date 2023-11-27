import clsx from 'clsx';
import HomeHeader from 'components/homePage/HomeHeader';
import Articles from 'components/homePage/Articles';
import { useCallback, useState } from 'react';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const onChangeDocs = useCallback(() => setOpen(true), []);
  return (
    <div className={clsx()}>
      <HomeHeader open={open} onToggleModal={open => setOpen(open)} />
      <Articles emptySearchResultHandler={onChangeDocs} />
    </div>
  );
};

export default HomePage;
