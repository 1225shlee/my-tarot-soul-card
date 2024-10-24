// 양력 및 음력 결과 표시 여부 추적
let hasSolarResult = false;
let hasLunarResult = false;

// 양력 및 음력 소울카드 추적
let solarSoulCard = "";
let lunarSoulCard = "";

// 양력 소울카드 찾기 이벤트 리스너
document.getElementById("findSolarSoulCardButton").addEventListener("click", function() {
    if (!hasSolarResult) {
        findSoulCard("solar");
        hasSolarResult = true;  // 양력 소울카드가 출력된 후에는 true로 설정
    } else {
        alert("양력 소울카드는 이미 계산되었습니다.");
    }
});

// 음력 소울카드 찾기 이벤트 리스너
document.getElementById("findLunarSoulCardButton").addEventListener("click", function() {
    if (!hasLunarResult) {
        findSoulCard("lunar");
        hasLunarResult = true;  // 음력 소울카드가 출력된 후에는 true로 설정
    } else {
        alert("음력 소울카드는 이미 계산되었습니다.");
    }
});

function findSoulCard(type) {
    let birthday;
    if (type === "solar") {
        birthday = document.getElementById("solarBirthday").value;
    } else if (type === "lunar") {
        birthday = document.getElementById("lunarBirthday").value;
    }

    if (!birthday) {
        alert(type === "solar" ? "양력 생년월일을 입력하세요!" : "음력 생년월일을 입력하세요!");
        return;
    }

    console.log(type === "solar" ? "입력된 양력 생년월일:" : "입력된 음력 생년월일:", birthday);

    const dateParts = birthday.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    // 생년월일 8자리 (YYYYMMDD) 모두 더한 값
    let sum = [...year, ...month, ...day].reduce((acc, digit) => acc + parseInt(digit), 0);

    // 한 자리 수가 나올 때까지 계속 더함
    while (sum >= 10) {
        sum = [...sum.toString()].reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    // 소울카드 번호는 계산된 sum 값
    const tarotCards = [
        "바보 (The Fool)", "마법사 (The Magician)", "여사제 (The High Priestess)", "여황제 (The Empress)", 
        "황제 (The Emperor)", "교황 (The Hierophant)", "연인 (The Lovers)", "전차 (The Chariot)", 
        "힘 (Strength)", "은둔자 (The Hermit)", "운명의 수레바퀴 (Wheel of Fortune)", "정의 (Justice)", 
        "매달린 사람 (The Hanged Man)", "죽음 (Death)", "절제 (Temperance)", "악마 (The Devil)", 
        "탑 (The Tower)", "별 (The Star)", "달 (The Moon)", "태양 (The Sun)", "심판 (Judgement)", "세계 (The World)"
    ];

    const soulCard = tarotCards[sum];  // sum 값이 타로 카드 인덱스가 됨

    // 양력과 음력 결과를 따로 저장
    if (type === "solar") {
        solarSoulCard = soulCard;
    } else {
        lunarSoulCard = soulCard;
    }

    // 이전 결과를 유지하고 새로운 결과 추가
    const resultType = type === "solar" ? "양력 소울카드는" : "음력 소울카드는";
    document.getElementById("result").innerHTML += `
        <h2>${resultType} ${soulCard}입니다.</h2>
    `;

    // 양력과 음력 소울카드가 동일한지 확인
    if (solarSoulCard && lunarSoulCard && solarSoulCard === lunarSoulCard) {
        // 동일할 경우 "중첩입니다" 메시지 추가
        document.getElementById("result").innerHTML += `
            <h2 style="color: red;">중첩입니다</h2>
        `;
    }
}
