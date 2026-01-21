document.addEventListener('DOMContentLoaded', function () {
    const flipbook = document.getElementById("flipbook");

    const BASE_WIDTH = 550;
    const BASE_HEIGHT = 733;
    const PAGE_RATIO = BASE_WIDTH / BASE_HEIGHT;

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const isMobile = window.innerHeight > window.innerWidth;

    let pageWidth, pageHeight;

    if (isMobile) {
        // 모바일: width 기준으로 계산 (예: 좌우 여백 감안해서 -20)
        pageWidth = viewportWidth - 20;
        pageHeight = Math.round(pageWidth / PAGE_RATIO);
    } else {
        // 데스크탑: height 기준으로 계산 (예: 상하 여백 감안해서 80%)
        pageHeight = viewportHeight * 0.8;
        pageWidth = Math.round(pageHeight * PAGE_RATIO);
        pageWidth = Math.min(pageWidth, 700); // 최대 너비 제한
    }

    const pageFlip = new St.PageFlip(flipbook, {
        width: pageWidth,
        height: pageHeight,

        size: "fixed",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,

        flippingTime: 600,
        usePortrait: true,
        maxShadowOpacity: 0.5,
        showCover: false,
        mobileScrollSupport: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    document.querySelector(".page-total").innerText = pageFlip.getPageCount();

    // 사운드 파일 로드
    const flipSound = new Audio('/assets/sound/page_flip.mp3');
    let isMuted = false;

    // 음소거 토글 버튼
    const btnSound = document.getElementById('btn-sound');
    btnSound.addEventListener('click', () => {
        isMuted = !isMuted;
        btnSound.textContent = isMuted ? '🔇' : '🔈';
    });

    // 페이지 넘길 때 소리 재생 (음소거 상태면 재생 안 함)
    pageFlip.on('changeState', (e) => {
        console.log(e)
        if (e.data === 'flipping') {
            if (!isMuted) {
                flipSound.currentTime = 0;
                flipSound.play().catch(console.error);
            }
        }
        if (e.data === 'user_fold') {
            if (!isMuted) {
                flipSound.currentTime = 0;
                flipSound.play().catch(console.error);
            }
        }
    });

    document.querySelector(".btn-prev").addEventListener("click", () => {
        console.log('prev clicked');
        pageFlip.flipPrev();
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext();
    });

    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
    });
});
