## NYT API를 활용한 기사 검색 웹앱

![NodeJS](https://img.shields.io/badge/nodeJS-v.18.17.0-green.svg)<br>

![React](https://img.shields.io/badge/react-v.18.2.0-blue)<br>

![zustand](https://img.shields.io/badge/zustand-v.4.4.6-blue)<br>

### 실행 방법

해당 프로젝트는 `node version 18.17.0` 에서 제작되었습니다.
따라서 이하 버전 사용 시 nvm을 통해 **버전에 맞는 node를 먼저 설치 후 진행**해야 합니다.

```bash
$ nvm use
$ yarn install
$ yarn start
```

### 주의사항

- 자유로운 테스트를 위해 환경변수에 저장된 API 키값을 공유합니다.
- [nyt open api는 일일 500회 분당 5회로 호출이 제한되어 있습니다.](https://developer.nytimes.com/faq#a11) (출처: 주의사항 11번)
- 따라서 **과도한 호출(무한스크롤 및 필터 테스트)에 주의를 요망합니다.**
  - 호출을 아끼기 위해 scrapscreen은 homescreen 처럼 API 호출로 구현하지 않았습니다.
  - 실제 프로덕트로서 기획을 통해 개발되는 상황이라면 scrap된 리스트를 호출하는 API를 서버단과 논의할 것이라 판단했습니다.
  - 따라서 API가 있다는 가정 하에 별표 토글링을 통해 zustand state에 저장된 값들을 활용해 구현했습니다.
  - 실제 호출시 리턴되는 기사 object 내에 glocation을 특정할 필드가 없기 때문에 homescreen에서 적용한 필터의 glocation을 기준으로 필터링을 구현했습니다.
- 이전에 요청한 필터, 페이지의 경우에는 react-query를 통해 캐싱된 결과가 노출됩니다.

  ```typescript
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false, staleTime: 300000 },
    },
  });
  ```

### 사용 기술 스택

- React: react^18.2, @tanstack/react-query^5
- 상태관리: zutand
- css / ui: tailwindcss, @headlessui/react, lucide-react(svg 아이콘), react-loader-spinner

### 요구사항 구현내용

#### HomeScreen

- 헤더바 필터 구현
- 필터 내부 인풋 컴포넌트화
- 무한스크롤
- 기사제목 클릭 시 기사 페이지 이동 & 복귀 시 상태 데이터 유지
- 스크랩 토글 기능

#### ScrapScreen

- homescreen과 독립된 필터 구현
- scrap된 기사 없을 시 홈으로 라우팅 유도하는 컴포넌트 구현
- 앱 종료 후 재실행 및 새로고침 시에도 스크랩된 데이터 유지
- homescreen과 동일한 UX Flow 구현

### 추가 구현사항

- 로딩스피너 추가
- 필터 모달에서 날짜, 헤드라인 초기화 가능하도록 UI 추가
- homescreen 검색 결과가 없을 시 필터 모달 활성화 버튼 노출하는 UI 추가
- react-query 활용을 통해 300초 이내 동일 호출은 캐시값을 활용해 구현
  - 동일호출: fq(`type string`), page(`type number`) 가 같을 경우 동일호출로 간주
- 429 ERROR(Too many request) 발생 시 불필요한 무한스크롤 방지 및 안내 스낵바 추가
