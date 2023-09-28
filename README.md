# JustQ 프론트엔드 사전 과제

## 1. 지원자

| 사진                                                                                                                        | 정보                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/SeungGukYoo/justQ-project/assets/119836116/1a34fe0b-3072-482a-ae31-2f48cc6954c0" height="140"> | 이름: 유승국<br />이력서: https://seunggukyoo.github.io/Resume/<br />개인 블로그: https://9uk-e.tistory.com/<br />깃 주소: https://github.com/SeungGukYoo/SeungGukYoo |

## 2. 디렉토리 구조

```bash
├── README.md
├── index.d.ts
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   └── logo512.png
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── itemPerPage.tsx
│   │   ├── list.tsx
│   │   └── pageNavigation.tsx
│   ├── hooks
│   │   └── usePage.tsx
│   ├── index.css
│   ├── index.tsx
│   └── util
│       ├── httpClient.ts
│       └── sessionClient.ts
└── tsconfig.json
```

## 3. 개발 환경

| 환경     | 목적                                                                                                                   | 사용한 환경         |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 프론트   | 기본 리액트 환경에서 시작하기 위해 CRA를 선택하였습니다.                                                               | CRA                 |
| API 서버 | 백엔드 서버 없이 쉽게 서버를 구현할 수 있는 Vercel의 서버리스 기능과 Json-server를 선택하여 API 서버를 구축하였습니다. | Jseon-server-vercel |

## 4. 구현 영상

![ezgif com-video-to-gif (4)](https://github.com/SeungGukYoo/justQ-project/assets/119836116/2dad5635-e7b3-430e-aae0-00b44177e649)

## 5. 배포 링크

배포 링크 : [Vercel 바로가기](https://just-q-project.vercel.app/)

## 6. 로컬 환경에서 시작하기

```bash
git clone https://github.com/SeungGukYoo/justQ-project.git

cd justQ-project

npm i && npm start
```

## 7. 기능 구현

프로젝트를 시작하기 전에 주어진 데이터와 전체적인 프로젝트의 환경, 디자인 등에 대해서 생각해보았습니다.

- 레이아웃 구상</br>

  <img src="https://github.com/SeungGukYoo/justQ-project/assets/119836116/d2eb441b-e1da-472d-96b3-29ee19cf21ee" width="350">

* db.json

  ```json
  {
    "posts": [
      {
        "id": "0000034d-6e1f-4b5e-a0bd-871b6e1f4da2",
        "category_code": "69338",
        "status": "4",
        "owner_product_code": "W8F2359",
        "product_name": "10족 고탄력 기본 세트 스타킹 여성 커피색 팬티",
        "price": "10460",
        "main_image": "http://cdn.ownerclan.com/fBFxi6t1acJRJ1VGwEcM_K5XlbBaIvoXQSjNxaJBFC4/marketize/640/as/v1.jpg",
        "origin": "국산",
        "brand": "상세설명 참조",
        "model": "",
        "keywords": [
          "여자양말;양말;패션양말;발목양말;정장양말;이쁜양말;양말브랜드;스포츠양말"
        ]
      },
  	//...
  }
  ```

### 7.1 API 서버

API 서버를 구축하기 위해서 Json-sever-vercel을 사용하여 간단하게 API 서버를 구축해 보았습니다. <br>
주어진 json파일을 `db.json`파일의 body에 넣어 사용하였습니다.<br>
서버 레파지토리 바로가기: [JustQ Server Repasitory](https://github.com/SeungGukYoo/JustQ-Json-server-vercel)<br>
API: [API 호출 결과 보기](https://just-q-json-server-vercel-14upfqa6z-seunggukyoo.vercel.app/posts)

```ts
// 요청 예시
fetch("https://just-q-json-server-vercel-14upfqa6z-seunggukyoo.vercel.app/posts");
```

### 7.2 파일 구조

프로젝트를 시작하기 전에 레이아웃을 구상한 후에 이를 토대로 파일 구조를 예상해보았습니다. <br>
프로젝트의 규모가 작고, prop-drilling 또한 큰 문제가 되지 않을 것이라고 생각하였기에 전역 상태를 사용하지 않았습니다.

```tsx
<>
  <MainTitle />
  <ItemPerPage />
  <List>
    <Item />
  </List>
  <PageNavigation />
</>
```

### 7.3 과제를 수행에 중점을 둔 부분

#### 상황에 맞는 데이터 가공

과제의 조건 중 "**처음에 받아온 데이터를 재사용하는 것이아닌 매번 이동할 때마다 데이터를 호출해야한다.**"라는 조건이 있었고, API 또한 특정 범위에 해당하는 데이터만 반환해주는 기능이 없었기 때문에 매번 호출한 후에 현재 보여지고 있는 제품의 갯수와 현재 몇 페이지를 보고 있는지, 총 몇 페이지인지를 확인하는 로직이 추가됬어야 했습니다.
<br><br>

- 제품 수에 따른 총 페이지 수 구하기

  우선 총 몇 페이지인지를 확인하기 위해 보여지는 제품의 수가 5개, 10개, 50개, 100개 일때 총 페이지의 수가 달라지므로 아래와 같은 로직을 통해 총 페이지수를 구하였습니다.

  ```ts
  // usePage.tsx

  // 총 페이지 수
  const [totalPage, setTotalPage] = useState(0);
  // 처음에 보여지는 아이템 갯수는 기본 30으로 고정(페이지당 30개의 제품을 보여줌)
  const [perPage, setPerPage] = useState(30);

  const data = await httpClient.get();

  // 총 데이터 길이 / 현재 보여지는 제품 수 = Value.xx
  // 이후 Value.xx 반올림 = Value+1 페이지(= 총 페이지)
  const calcTotalPage = Math.ceil(data.length / perPage);
  ```

* 제품 수에 맞는 데이터 렌더링

  API로부터 받은 응답데이터를 화면에 렌더링 될 제품의 갯수만큼 필터링하는 로직을 아래와 같이 구현하였습니다.

  ```ts
  // 화면에 보여질 제품 수만큼 필터링된 데이터
  const [itemList, setItemList] = useState([]);
  // 처음에 보여지는 아이템 갯수는 기본 30으로 고정(페이지당 30개의 제품을 보여줌)
  const [perPage, setPerPage] = useState(30);
  // 현재 보고 있는 페이지
  const [currentPage, setCurrentPageCount] = useState(0);
  const data = await httpClient.get();
  const convertDataToArray = [];

  for (let i = 0; i < totalPage; i++) {
    // i*perPage ~ (i+1)*perPage
    // [0~30,31~60,61~90,...,450~480,481~500]
    const filterData = data.slice(i * perPageCount, (i + 1) * perPageCount);
    convertDataToArray.push(filterData);
  }

  setItemList(convertDataToArray[currentPage]);
  ```

  이후에 보여지는 제품수를 변경하고 싶다면 `perPageCount`를 업데이트 해주게 됩니다.

  ```tsx
  // usePage.tsx
  const updatePerPage = (pageCount: number) => {
    //pageCount =  5, 10, 30, 50, 100
    setPerPageCount(pageCount);
    // 처음 페이지로 돌아가이 위한 페이지 값 초기화
    setCurrentPageCount(0);
  };
  ```

- 페이지 이동 시 페이지에 맞는 데이터 렌더링

  받은 응답데이터 중 현재 페이지에 맞는 데이터만을 필터링 하는 로직은 아래와 같이 구현하였습니다.

  ```tsx
  // usePage.tsx
  const [currentPage,setCurrentPage]=useState(0);

  const movePage = (pageIndex) => {
    // state 업데이트로 인한 useEffect 코드 실행
    setCurrentPage(pageIndex);
  }

  // pageNavigation.tsx
  return (
    <button onClick=(()=>movePage(0))>first page</button>
    <button onClick=(()=>movePage(currentPage-1))>before page</button>
    <button onClick=(()=>movePage(currentPage+1))>next page</button>
    <button onClick=(()=>movePage(totalPage-1))>last page</button>
  )
  ```

  `useEffect`의 의존성 배열에서 curretPage가 있기 때문에 API를 호출하는 Effect가 재실횡되면서 업데이트된 값을 바탕으로 요청을 하게 됩니다.

  ```tsx
  const updateList = useCallback(async () => {
    const data = await httpClient.get();
    const convertDataToArray = [];
    for (let i = 0; i < Math.ceil(data.length / perPageCount); i++) {
      convertDataToArray.push(data.slice(i * perPageCount, (i + 1) * perPageCount));
    }
    // code
    setItemList(convertDataToArray[currentPage]);
    setCurrentPageCount(currentPage);
  }, [currentPage, perPageCount]);
  ```

#### 새로 고침시 값 유지

새로고침시 이전 페이지에 대한 정보를 저장하기 위해 브라우저에서 제공하는 스토리지 기능을 활용하여 값을 저장하고자 하였고, 브라우저에서 제공하는 스토리지는 총 4가지가 있었습니다.

1. 로컬 스토리지
   - 장점: 브라우저를 닫아도 지속되며 5MB의 데이터를 저장하는 것이 가능하다.
   - 단점: 보안에 취약하며 데이터의 만료를 위해 수동적으로 관리를 해줘야 한다.
2. 세션 스토리지
   - 장점: 해당 탭내에서만 접근할 수 있어 탭을 닫으면 자동으로 제거되고, 5MB의 데이터를 저장하는 것이 가능하다.
   - 단점: 보안에 취약하며 탭을 닫으면 데이터가 사라지게 된다.
3. 쿠키 스토리지
   - 장점: 자동으로 만료가 되며, 모든 브라우저에서 작동한다.
   - 단점: 4KB의 적은 양의 데이터, 보안에 취약하다.
4. 캐시 스토리지
   - 장점: 이전에 받아온 리소스를 재사용하기 때문에 네트워크 트래픽을 감소시키며, 캐싱 전략이 가능해진다.
   - 단점: 관리가 복잡해지며 캐시에 대한 적절한 관리가 필요하고 이에 따른 관리가 어려워질 수 있다.

스토리지의 사용 목적은 단순히 이전 페이지에 필요한 값을 잠깐만 저장하는 목적이였으며, 해당 데이터는 보안과는 크게 연관되지 않았기 때문에 로컬 스토리지와 세션 스토리지중 하나를 선택하고자 하였습니다.<br>보관되는 데이터는 영구적으로 갖고있을 필요가 없었기 때문에 데이터 관리를 보다 쉽게 하고자 세션 스토리지를 선정하였습니다.
<br><br>
윈도우에서 제공하는 `beforeunload`이벤트를 통해서 새로고침이 되는 것을 감지하고, 새로고침이 되었을 때 페이지를 유지하기 위해 필요한 값을 세션 스토리지에 저장하는 로직을 구상하였습니다.

```tsx
// usePage
useEffect(() => {
  const beforeUnloadSavedPage = () => {
    sessionStorage.setItem("pageInfo", perPageCount.toString() + "-" + currentPage.toString());
  };
  window.addEventListener("beforeunload", beforeUnloadSavedPage);
  return () => window.removeEventListener("beforeunload", beforeUnloadSavedPage);
}, [perPageCount, currentPage]);
```

그후 리액트가 첫 렌더링이 될 때 state를 생성하면서 session의 값 초기값으로 설정하는 로직을 아래와 같이 작성하였습니다.

```tsx
// sessionClient.ts
export function isSavedSessionData() {
  const sessionData = sessionStorage.getItem("pageInfo")?.split("-");
  let perPageCount = 0;
  let pageCount = 0;
  if (sessionData) {
    perPageCount = parseInt(sessionData[0]);
    pageCount = parseInt(sessionData[1]);
  }
  return { perPageCount, pageCount };
}

// usePage.tsx
const [perPageCount, setPerPageCount] = useState(isSavedSessionData().perPageCount || 30);
const [currentPage, setCurrentPageCount] = useState(isSavedSessionData().pageCount || 0);
```
