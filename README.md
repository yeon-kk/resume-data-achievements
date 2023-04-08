# resume-data-achievements

티스토리 블로그 글의 총 수를 구하고, 일 평균 작성글 수, 주 평균 작성글 수를 보여줍니다.
프론트엔드 페이지만 배포했습니다.

### 배포 사이트  
[https://resume-data-achievements.vercel.app/](https://resume-data-achievements.vercel.app/)

### 설치
```
npm install
```

### 사용한 API
- 티스토리 Open API  
[https://tistory.github.io/document-tistory-apis/](https://tistory.github.io/document-tistory-apis/)  

### 기술 스택  
`TypeScript` `Chakra UI` `axios` `react-router-dom`  


### 프로그램 사용 방법
1.티스토리 오픈 API를 이용할 수 있도록 [앱 등록]과정이 필요합니다.  
[https://www.tistory.com/guide/api/manage/register](https://www.tistory.com/guide/api/manage/register)
![image](https://user-images.githubusercontent.com/86847564/230699489-625ac2b0-2c43-446e-ab42-dc13bdef03c2.png)

해당 페이지에서 작성해야 하는 부분은 다음 항목들이 있습니다.  
(1) 서비스 명  
(2) 서비스 URL  
(3) 서비스 형태  
(4) 서비스 권한  
(5) CallBack  

2.로컬 환경과 배포 환경에서 (2)와 (5)에 작성해야 하는 내용이 각각 다르기 때문에, 경우를 나누어 설명합니다.

- 로컬 환경에서 작성하는 방법(clone하신 경우)  
(1) 서비스 명 : 임의로 작성합니다.(제 경우에는 '블로그 글 개수 구하기'로 작성했습니다)   
(2) 서비스 URL : `http://localhost:3000/`  
(3) 서비스 형태 : 웹서비스  
(4) 서비스 권한 : 읽기전용  
(5) CallBack : `https://localhost:3000/redirect`  

- 배포 환경에서 작성하는 방법  
(1) 서비스 명 : 임의로 작성합니다.(제 경우에는 '블로그 글 개수 구하기'로 작성했습니다)  
(2) 서비스 URL : `https://resume-data-achievements.vercel.app/`  
(3) 서비스 형태 : 웹서비스  
(4) 서비스 권한 : 읽기전용  
(5) CallBack : `https://resume-data-achievements.vercel.app/redirect`  


3.프로그램을 실행합니다.
- 로컬 환경에서 실행
```
npm start
```  

- 배포 환경에서 실행: 배포 주소를 클릭합니다
[https://resume-data-achievements.vercel.app/](https://resume-data-achievements.vercel.app/)  

프로그램 폼 작성 방법  
(1) 위의 [앱 등록]한 페이지에서 [앱 관리]탭을 클릭합니다  
[https://www.tistory.com/guide/api/manage/register](https://www.tistory.com/guide/api/manage/register)  

(2) 설정을 클릭해서, `App ID`와 `Secret Key` 페이지를 참고할 예정입니다.  

(3) 프로그램을 실행 합니다  
![image](https://user-images.githubusercontent.com/86847564/230700078-dbc93d8e-66c8-4551-8921-e2964b024d90.png)  

(4)`client-id` 항목에 `App ID`를 붙여넣기 합니다  

(5) `redirect_uri(CallBack)` 항목을 작성하는데 이 때, 로컬 환경과 배포 환경의 redirect URI를 다르게 작성해야 합니다.  
  - 로컬 환경에서 실행하는 경우 : `https://localhost:3000/redirect`  
  - 배포 환경에서 실행하는 경우 : `https://resume-data-achievements.vercel.app/redirect`  

(6) `client_secret` 항목에 `Secret Key`를 붙여넣기 합니다.  

(7) `Authentication code URL 생성하기`버튼을 클릭합니다.  

(8) 생성된 링크를 클릭하고 [허가하기]버튼을 클릭합니다.  
티스토리 API 문서 참고: [https://tistory.github.io/document-tistory-apis/auth/authorization_code.html](https://tistory.github.io/document-tistory-apis/auth/authorization_code.html)  
![image](https://user-images.githubusercontent.com/86847564/230700460-f8764afc-ec9b-400a-b2eb-2aba27d1765d.png)  

(9) redirect된 페이지에서 Authorization code를 `복사`합니다.  

(10) 다시 폼을 작성하는 페이지로 와서, `code`항목에 복사한 Authorization code를 붙여넣기 합니다.  
![image](https://user-images.githubusercontent.com/86847564/230701963-6bfbff9e-9e8b-44d7-becc-c1f2f4b289ce.png)  

(11) `Access Token 발급 URL 생성` 버튼을 클릭합니다.  
생성된 URL을 Access Token 발급하는 방법은 두가지를 소개하겠습니다.  
첫번째는 postman 사이트를 이용하는 경우이고, 두번째는 인터넷 주소창에 입력하는 경우 입니다.  
두번째 방법도 소개하는 이유는 구글링을 했을 때 보편적으로 소개하는 방법입니다. 하지만 두번째 방법은 주의해야 할 부분이 있기 때문에 주의사항도 같이 작성합니다.  
  (1) postman을 사용하는 경우, [https://www.postman.com/](https://www.postman.com/)에서 GET 요청을 합니다.  
  (2) 새 창에서 `개발자 도구`를 `미리` 켜 놓은 뒤 발급받은 Access Token URL를 붙여넣기합니다.  

- Access Token발급은 1회만 가능합니다.  
보안을 이유로, 최초 1회는 사용자가 발급할 것으로 기대하기 때문에 2회 이상 Access Token이 발급되는 것을 방지하는 것으로 보입니다.    
- 만약, Access Token 발급을 실패한 경우 다시 (1) 항목으로 돌아가서 반복해야 합니다.  
실패하는 경우는, `개발자 도구를 미리 켜놓지 않은 상태`에서 발급받은 URL을 인터넷 주소창에 `바로 입력`하는 경우입니다.  

(12) 발급받은 Access Token을 복사합니다.  

(13) 다시 프로그램으로 돌아와서 Access Token을 붙여넣기 합니다  
![image](https://user-images.githubusercontent.com/86847564/230701984-70dccba6-dd83-4e8d-b186-d717d0d55fdc.png)  

(14) 블로그 이름을 작성합니다. (블로그 주소의 앞부분)  
![image](https://user-images.githubusercontent.com/86847564/230701994-a47a3ecd-fa0e-4b56-b5c5-08066fadcf69.png)  
티스토리 API 문서 참고: [https://tistory.github.io/document-tistory-apis/apis/v1/post/list.html](https://tistory.github.io/document-tistory-apis/apis/v1/post/list.html)  

(15) select box에서 년도와 월을 선택합니다.  
![image](https://user-images.githubusercontent.com/86847564/230702030-bcd7008f-3654-456e-8c64-a1babe14d341.png)  

(16) 발행, 보호, 비공개에서 원하는 옵션을 선택합니다.  
![image](https://user-images.githubusercontent.com/86847564/230702034-59842126-44be-4f81-aea9-535cce215678.png)  

(17) `조회`버튼을 클릭하면 해당 년도와 월을 포함해 현재까지의 기간 동안 작성된 글을 조회합니다.  
(18) 테이블에서 `합계`, `일 평균 글 작성 수`, `주 평균 글 작성 수`를 확인하실 수 있습니다.  

### 폴더 구조  
```
src  
 ┣ apis  
 ┃ ┗ instance.ts  
 ┣ components  
 ┃ ┣ CheckBox.tsx  
 ┃ ┣ List.tsx  
 ┃ ┗ Table.tsx  
 ┣ pages  
 ┃ ┣ Main.module.css  
 ┃ ┣ Main.tsx  
 ┃ ┗ Redirect.tsx  
 ┣ shared  
 ┃ ┗ Router.tsx  
 ┣ utils  
 ┃ ┣ date-utils  
 ┃ ┃ ┣ calculation.ts  
 ┃ ┃ ┗ dateCalculator.ts  
 ┃ ┗ string-utils  
 ┣ App.css  
 ┣ App.test.tsx  
 ┣ App.tsx  
 ┣ index.css  
 ┣ index.tsx  
 ┣ react-app-env.d.ts  
 ┣ reportWebVitals.ts  
 ┗ setupTests.ts  
 ```
 
### 타임라인
2023-04-04 ~ 2023-04-08 (5일)
| 기간 | 진행 사항 |
|------|------|
|2023-04-04| 기획 <br> Repository 생성 |
|2023-04-05| Redirect 페이지 추가 <br> AccessToken 발급 URL 문자열 생성 <br> 글 목록에 대한 GET 요청 문자열 생성 |
|2023-04-06| 글 공개 단계를 선택하는 checkbox 컴포넌트 생성 |
|2023-04-07| checkbox state 상태를 반영한 글목록 요청 <br> 글 합계와 일 평균과 주 평균을 구하는 함수 추가 <br> 글 목록을 테이블로 보여주는 컴포넌트 생성 |
|2023-04-08| README 작성 |
