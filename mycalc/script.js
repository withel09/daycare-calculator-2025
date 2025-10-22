// 어린이집 점수 계산기 JavaScript
console.log('계산기 시작');

function calculateScore() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var totalScore = 0;
    var priority1Score = 0;
    var priority2Score = 0;

    for(var i = 0; i < checkboxes.length; i++) {
        var points = parseInt(checkboxes[i].getAttribute('data-points'));
        if (checkboxes[i].classList.contains('priority-1')) {
            priority1Score += points;
        } else if (checkboxes[i].classList.contains('priority-2')) {
            priority2Score += points;
        }
    }

    totalScore = priority1Score + priority2Score;
    document.getElementById('totalScore').textContent = totalScore;
    
    updateRankDisplay(priority1Score, priority2Score);
    updateProbability(totalScore, priority1Score);
}

function updateRankDisplay(priority1Score, priority2Score) {
    var rankDiv = document.getElementById('rankDisplay');
    if(!rankDiv) return;
    
    var rankText = '';
    if (priority1Score > 0) {
        rankText = '🥇 1순위';
    } else if (priority2Score > 0) {
        rankText = '🥈 2순위';
    } else {
        rankText = '🥉 3순위 (일반)';
    }
    rankDiv.textContent = rankText;
}

function updateProbability(score, priority1Score) {
    var probabilityDiv = document.getElementById('probability');
    var resultContent = document.getElementById('resultContent');
    if(!probabilityDiv || !resultContent) return;
    
    var message = '';
    var detailMessage = '';
    var color = '';

    if (score >= 600) {
        message = '입소 가능성: 매우 높음 ⭐⭐⭐';
        detailMessage = '<p><strong>축하합니다!</strong> 국공립 어린이집 입소 가능성이 매우 높습니다.</p><p>대부분의 국공립 어린이집에서 우선적으로 입소할 수 있습니다.</p>';
        color = '#38a169';
    } else if (score >= 400) {
        message = '입소 가능성: 높음 ⭐⭐';
        detailMessage = '<p>국공립 어린이집 입소 가능성이 높은 편입니다.</p><p>여러 어린이집에 대기 신청하는 것을 추천합니다.</p>';
        color = '#48bb78';
    } else if (score >= 200) {
        message = '입소 가능성: 보통 ⭐';
        detailMessage = '<p>지역과 경쟁률에 따라 입소 가능성이 있습니다.</p><p>국공립과 민간 어린이집을 함께 고려하세요.</p>';
        color = '#ed8936';
    } else if (score >= 100) {
        message = '입소 가능성: 낮음';
        detailMessage = '<p>국공립 어린이집 대기 기간이 길 수 있습니다.</p><p>민간 어린이집을 우선 고려하세요.</p>';
        color = '#dd6b20';
    } else if (score > 0) {
        message = '입소 가능성: 매우 낮음';
        detailMessage = '<p>국공립 어린이집 입소가 어려울 수 있습니다.</p><p>민간 어린이집 이용을 권장합니다.</p>';
        color = '#c05621';
    } else {
        message = '항목을 선택해주세요';
        detailMessage = '<p>위의 항목들을 선택하면 입소 가능성을 확인할 수 있습니다.</p>';
        color = '#718096';
    }

    if (priority1Score === 0 && score > 0) {
        detailMessage += '<p style="color: #e53e3e; font-weight: 700; margin-top: 20px; padding: 15px; background: #fff5f5; border-radius: 8px;">⚠️ 중요: 2순위만으로는 1순위를 앞설 수 없습니다.</p>';
    }

    probabilityDiv.textContent = message;
    probabilityDiv.style.color = color;
    if(resultContent) resultContent.innerHTML = detailMessage;
}

function showRegionInfo() {
    var region = document.getElementById('region-select').value;
    var infos = {
        "서울": {url:"http://seoul.childcare.go.kr/", tel:"02-1661-5666", addr:"서울특별시 마포구 서강로 75-16"},
        "부산": {url:"http://busan.childcare.go.kr/", tel:"051-463-0517", addr:"부산광역시 연제구 거제천로 262"},
        "대구": {url:"http://daegu.childcare.go.kr/", tel:"053-803-7979", addr:"대구 서구 달구벌대로 371길 30"},
        "인천": {url:"http://incheon.childcare.go.kr/", tel:"032-512-4412", addr:"인천 남동구 소래로 500 남동체육관1층"},
        "광주": {url:"http://gwangju.childcare.go.kr/", tel:"062-714-3636", addr:"광주 광산구 첨단강변로 100"},
        "대전": {url:"http://daejeon.childcare.go.kr/", tel:"042-863-3636", addr:"대전 유성구 월드컵대로 32"},
        "울산": {url:"http://ulsan.childcare.go.kr/", tel:"052-235-3636", addr:"울산 동구 바드래 1길 61"},
        "세종": {url:"http://sejong.childcare.go.kr/", tel:"044-863-3636", addr:"세종 복지센터 1층"},
        "경기": {url:"http://gyeonggi.childcare.go.kr/", tel:"031-267-3579", addr:"경기 수원시 권선구 호매실로 46-16"},
        "강원": {url:"http://gangwon.childcare.go.kr/", tel:"033-243-9030", addr:"강원 춘천시 성심로 47번길 35"},
        "충북": {url:"http://chungbuk.childcare.go.kr/", tel:"043-238-9001", addr:"충북 청주시 상당구 용담로 7"},
        "충남": {url:"http://chungnam.childcare.go.kr/", tel:"041-631-7070", addr:"충남 예산군 삽교읍 예학로 10-22"},
        "전북": {url:"http://jeonbuk.childcare.go.kr/", tel:"063-236-3636", addr:"전북 전주시 덕진구 만성중앙로 53-46"},
        "전남": {url:"http://jeonnam.childcare.go.kr/", tel:"061-285-3636", addr:"전남 무안군 삼향읍 어진누리길 30"},
        "경북": {url:"http://gyeongbuk.childcare.go.kr/", tel:"054-650-7003", addr:"경북 예천군 호명면 도청대로 53"},
        "경남": {url:"http://gyeongnam.childcare.go.kr/", tel:"055-268-3579", addr:"경남 창원시 의창구 창원대학로 20"},
        "제주": {url:"http://jeju.childcare.go.kr/", tel:"064-757-1400", addr:"제주도 제주시 해안마을북길 13-26"}
    };
    
    var data = infos[region];
    var resultDiv = document.getElementById('region-result');
    
    if(data && resultDiv) {
        resultDiv.innerHTML = '<div class="region-detail">' +
            '<h4><a href="' + data.url + '" target="_blank">' + region + ' 육아종합지원센터 바로가기 →</a></h4>' +
            '<p>📞 전화: ' + data.tel + '</p>' +
            '<p>🚩 주소: ' + data.addr + '</p>' +
            '</div>';
    } else if(resultDiv) {
        resultDiv.innerHTML = '';
    }
}

function copyLink() {
    var url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function() {
            alert('✅ 링크가 복사되었습니다!\\n\\n주변 엄마들에게 공유해주세요.');
        }, function() {
            alert('링크 복사에 실패했습니다. 주소창의 URL을 직접 복사해주세요.');
        });
    } else {
        alert('이 브라우저는 자동 복사를 지원하지 않습니다.\\n주소창의 URL을 직접 복사해주세요.');
    }
}

function shareKakao() {
    alert('카카오톡 공유 기능은 카카오 개발자 등록 후 사용 가능합니다.\\n\\n지금은 "링크 복사" 버튼을 사용해서 공유해주세요!');
}

window.onload = function() {
    console.log('페이지 로드 완료');
    
    var allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log('체크박스 개수:', allCheckboxes.length);
    
    for(var i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].addEventListener('change', calculateScore);
    }
    
    calculateScore();
    console.log('초기화 완료');
};