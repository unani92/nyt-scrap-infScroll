import useStore from 'store/zustand';

const ScrapedPage = () => {
  const { scrapedDocs } = useStore();
  return (
    <div>
      {scrapedDocs.length === 0 ? (
        <div>
          <div></div>
        </div>
      ) : (
        <div></div>
      )}
      <div></div>
    </div>
  );
};

export default ScrapedPage;
