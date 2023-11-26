import useStore from 'store/zustand';
import EmptyScraped from 'components/scrapedPage/EmptyScraped';
import ScrapedHeader from 'components/scrapedPage/ScrapedHeader';
import Articles from 'components/scrapedPage/Articles';

const ScrapedPage = () => {
  const { scrapedDocs } = useStore();
  return scrapedDocs.length === 0 ? (
    <EmptyScraped />
  ) : (
    <div>
      <ScrapedHeader />
      <Articles />
    </div>
  );
};

export default ScrapedPage;
