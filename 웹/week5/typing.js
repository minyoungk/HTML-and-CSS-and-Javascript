const GAME_TIME = 10; // 기본 게임시간초
let wordList = ['apple','orange','mango','banana']; // 단어리스트
let wordCount = 0; // wordList의 몇번째값을 보여줄지 결정하는 인덱스값
let score = 0; // 스커어 변수
let time = GAME_TIME; // 1씩 줄이는 용도의 변수
let isPlaying = true; // 게임이 현재 진행중인 아닌지 체크하는값 
const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const scoreTag =  document.querySelector('.score');
const timeTag = document.querySelector('.time');

// 단어가져오기 API호출 AJAX통신
fetch('http://random-word-api.herokuapp.com/word?number=30') // #1. HTTP 요청
    .then(function(response) { // #2. 요청을 하고나면 응답값이 response라고 하는 변수에 담겨진다
        return response.json(); // #3. response에 body에 있는 텍스트값을 json으로 바꿔서 다음 Then한테 넘겨줌
    })
    .then(function(result){ // result라는 변수가 json으로 바뀐값을 받음
        wordList = result;
        // 기본값 셋팅
        wordDisplay.innerText = wordList[wordCount]; // 워드디스플레이에 단어 출력
        timeTag.innerText = GAME_TIME; // 10초라고 디스플레이 되도록 기본값
        let timeInterval = setInterval(countDown, 1000); // 1초에 한번 countDown 함수를 실행 시켜줘
        wordInput.addEventListener('input', checkMatch) // 값을 입력하는경우 checkMath함수 실행
    })

function countDown() {
    // 시간초를 줄이는 함수
    // 3항연산자
    // 조건 ? 조건에부합되는경우 실행될 소스 : 아닌경우 소스
    // time > 0 ? time-- : isPlaying = false;
    if (time > 0) {
        time--
    } else { // time이 0보다작은경우
        isPlaying = false;
    }

    if (isPlaying === false) { // 시간초가 다 지났으면, 시간초가 0이 된 순간 실행
        clearInterval(timeInterval); // 더이상 countDown함수는 실행되지 않음
    }
    timeTag.innerText = time;
}

function checkMatch() {
    // 사용자의입력값이 디스플레이 되는 단어와 일치하는지 체크하는 함수
    if (wordInput.value === wordDisplay.innerHTML) {
        score++; // 스코어값을 1 증가
        wordCount++; // 다음단어를 보여주기 위해 인덱스값 1증가
        wordDisplay.innerText = wordList[wordCount]; // 다음 단어 보여주기
        scoreTag.innerText = score; // 스코어 출력
        wordInput.value = ''; // 입력하는칸 빈값으로 초기화
        timeTag.innerText = GAME_TIME; // 시간초가 10초로 다시보이게
        time = GAME_TIME; // 시간초도 10초로 초기화
    }
}