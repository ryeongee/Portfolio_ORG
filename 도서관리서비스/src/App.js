import React, { useState, useEffect } from "react";
// import axios from "axios";
import { bookSearch } from "./component/api";
import Item from "./component/item";
import "./App.css";
/**
 * Week Final - 최종 평가 (part. 2)
 * 범위: Week 1 ~ Week 12
 * 총점: 40
 *
 * 아래 과정을 "----잘----"읽고 풀이해주세요.
 *
 * 1. 보고 계신 sandbox를 fork 해주세요.
 * 2. 아래 링크를 방문하여 구현 결과 영상을 확인해주세요.
 * https://drive.google.com/file/d/1-rGlhKIGd3kIHSn1zZP6CKNVmbI_s2Xp/view?usp=sharing
 * 
 * 3. 카카오 도서 검색 api 사용 방법:
 * 3.1. https://developers.kakao.com 방문
 * 3.2. 우측 상단 "로그인" 버튼 클릭 후 카카오 로그인
 * 3.3. 3.2. "로그인" 버튼 좌측의 "내 애플리케이션" 버튼 클릭
 * 3.4. "애플리케이션 추가하기" 클릭 후 앱 등록 (앱이름, 사업자명은 원하시는대로 작성하시면됩니다.)
 * 3.5. 3.4.에서 생성한 앱으로 이동 -> 앱 키 목록 중 "JavaScript 키" 확인 (api 사용시 필요)
 * 3.6. https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book 으로 이동
 * 3.7. 책 검색 api 사용 가이드를 "----잘----" 읽고 과제 풀이에 사용하시면됩니다.
 * 3.8. (주의) Request 파라미터 중 size, target은 각각 10, 'title'을 사용해주세요.
 * 
 * 4. 페이지 디자인은 원하시는대로 진행하시면됩니다. 단, 최소한의 성의는 보여주세요. (구현 결과 영상만큼이라도..)
 * 5. 요구 사항:
 * 5.1. 최초 실행 시 "검색어를 입력해주세요." 텍스트를 표시한다.
 * 5.2. 검색어 입력 후 검색 버튼을 누르면 검색 결과 노출 전까지 로딩 중이란 것을 표시한다.
 * 5.3. 검색 결과에는 각 도서의 썸네일(thumbnail), 제목(title), 작가(authors), 출판사(publisher), 출판 날짜(datetime), 가격(sale_price 혹은 price)을 표시한다.
 * 5.4. 썸네일이 제공되지 않을 경우, no-picture.jpg를 사용한다.
 * 5.5. status가 '정상판매'일 경우 sale_price를 사용한다. 만약 sale_price가 유효하지 않은 값이면(ex. 음수), price를 대신 사용한다.
 * 5.6. 각 도서 영역을 클릭하면 해당 도서의 상세 페이지(url)로 이동한다. (새 탭으로 이동)
 * 5.7. 검색 결과는 10개씩 노출한다. 만약 검색 결과가 11개 이상이면, 스크롤이 최하단에 위치했을 때 10개를 추가 노출한다. 또한, 목록이 추가되기 전 로딩 중이란 것을 표시한다.
 * 
 * 예를 들어, 검색 결과가 총 23개 일 때, 최초 10개 노출 -> 스크롤 (로딩 중 표시) ->
 * 10개 추가 노출 (20개 노출) -> 스크롤 (로딩 중 표시)-> 3개 추가 노출 (23개 노출)
 * 
 * 5.8. 모든 결과를 표시한 경우 스크롤이 최하단에 위치했을 때 아무 변화도 일어나지 않는다.
 * 5.9. 검색 결과가 존재하지 않을 경우 검색 결과가 없다는 것을 표시한다.
 * 5.10. 에러 발생 시 "에러 발생" 텍스트를 페이지에 표시한다.
 * 
 * 6. 풀이를 마쳤다면 fork한 sandbox에 멘토를 초대해주세요.
 * 7. sandbox의 url을 Week 13 - 최종 평가 과제에 제출해주세요.
 *
 * 채점 기준:
 * 검색 요청 (10점)
 * 결과 표시 (10점)
 * 인피니트 스크롤 구현 (10점)
 * 디자인 (10점)
 *
 * Tip:
 * 도서 검색 api 사용 가이드를 잘 읽어주세요. (제발요)
 * 필요한 라이브러리는 직접 설치하여 사용해주세요.
 */

function App() {
  // do something
  let msg;
  const [searchname, setSearchname] = useState("");
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [item, setItem] = useState();
  const [pageNum, setPageNum] = useState();

  const searchContainerStyle = {
    width: "100%",
    display: "block",
    marginLeft: "10%",
    marginRight: "10%"
  };

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    if (query.length > 0) {
      setPageNum(1);
      setTimeout(() => bookSearchHttpHandler(searchname, true), 1000); // 컴포넌트 마운트 후에, 함수를 호출한다.
    }
  }, [query]);

  const bookSearchHttpHandler = async (query, reset) => {
    // paramter 설정
    
    setItem(10);
    const params = {
      query: query,
      sort: "accuracy", // accuracy | recency 정확도 or 최신
      page: pageNum, // 페이지번호
      size: item // 한 페이지에 보여 질 문서의 개수
    };
    const { data } = await bookSearch(params); // api 호출
    try {
      // 결과 호출
      if (reset) {
        setBooks(data.documents);
        if (!(data.documents.length > 0)) {
          document.getElementById("secondTextID").innerHTML =
            "검색 결과가 없습니다.";
        }

      } else {
        setBooks(books.concat(data.documents));
      }
    } catch (error) {
      console.log(error);
      alert("에러발생");
    }
  };

  const infiniteScroll = () =>{
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if(scrollTop+clientHeight>=scrollHeight){
      // var i = item+10;
      setItem(20);
      var tmp = pageNum+1;
      setPageNum(tmp);
    }
  };
  
  const loading = () => {
    document.getElementById("secondTextID").innerHTML = "로딩중...";
    setTimeout(function () {
      document.getElementById("secondTextID").innerHTML = "";
    }, 1000);
  };

  const onClick = () => {
    setQuery(searchname);
    loading();
    console.log(books);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const onChange = (e) => {
    msg = e.target.value;
    setSearchname(msg);
  };

  return (
    <div>
      <div className="searchContainer" style={searchContainerStyle}>
        <input
          className="input_text"
          type="search"
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={searchname}
        ></input>
        <button onClick={onClick}>검색</button>
        <br></br>
        <p className="secondText" id="secondTextID">
          검색어를 입력해주세요
        </p>
        <ul>
          {books.map((books, index) => (
            <Item
              key={index}
              url={books.url}
              thumbnail={books.thumbnail}
              title={books.title}
              authors={books.authors}
              publisher={books.publisher}
              datetime={books.datetime}
              sale_price={books.sale_price}
              price={books.price}
              status={books.status}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
