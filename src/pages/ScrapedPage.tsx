import useStore from 'store/zustand';
import EmptyScraped from 'components/scrapedPage/EmptyScraped';
import ScrapedHeader from 'components/scrapedPage/ScrapedHeader';

const ScrapedPage = () => {
  const { scrapedDocs } = useStore();
  return scrapedDocs.length === 0 ? (
    <EmptyScraped />
  ) : (
    <div>
      <ScrapedHeader />
    </div>
  );
};

export default ScrapedPage;
