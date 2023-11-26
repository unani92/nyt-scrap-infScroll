import useStore from 'store/zustand';
import EmptyScraped from 'components/scrapedPage/EmptyScraped';

const ScrapedPage = () => {
  const { scrapedDocs } = useStore();
  return scrapedDocs.length === 0 ? (
    <EmptyScraped />
  ) : (
    <div>
      <div></div>
    </div>
  );
};

export default ScrapedPage;
