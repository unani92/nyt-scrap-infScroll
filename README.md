### NYT API를 활용한 기사 검색 웹앱

### 주의사항

- 자유로운 테스트를 위해 환경변수에 저장된 API 키값을 공유합니다.
- [nyt open api는 일일 500회 분당 5회로 호출이 제한되어 있습니다.](https://developer.nytimes.com/faq#a11) (출처: 주의사항 11번)
- 따라서 과도한 호출(무한스크롤 및 필터 테스트)에 주의를 요망합니다.
- 이전에 요청한 필터, 페이지의 경우에는 react-query를 통해 캐싱된 결과가 노출됩니다.
  ```typescript
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false, staleTime: 300000 },
    },
  });
  ```
