/*
체육복
문제 설명
점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

제한사항
전체 학생의 수는 2명 이상 30명 이하입니다.
체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.
입출력 예
n	lost	reserve	return
5	[2, 4]	[1, 3, 5]	5
5	[2, 4]	[3]	4
3	[3]	[1]	2
입출력 예 설명
예제 #1
1번 학생이 2번 학생에게 체육복을 빌려주고, 3번 학생이나 5번 학생이 4번 학생에게 체육복을 빌려주면 학생 5명이 체육수업을 들을 수 있습니다.

예제 #2
3번 학생이 2번 학생이나 4번 학생에게 체육복을 빌려주면 학생 4명이 체육수업을 들을 수 있습니다.

출처

※ 공지 - 2019년 2월 18일 지문이 리뉴얼되었습니다.
※ 공지 - 2019년 2월 27일, 28일 테스트케이스가 추가되었습니다.
*/

function solution(n, lost, reserve) {
    let answer = 0;
    let setResult = [];
    
    // i => 학생 번호 기준
    for(let i = 1; i <= n; i++) {
        // 학생들에게 체육복 1개 씩
        setResult.push(1);
        // 체육복을 도난당한 학생이 있으면 1개 빼기
        if(lost.includes(i)) setResult[i - 1]--;
        // 여벌 체육복 가진 학생이 있으면 1개 더하기
        if(reserve.includes(i)) setResult[i - 1]++;
    }
    
    // i => 인덱스 기준
    for(let i = 0; i < n; i++) {
        // 체육복이 0개 일 때
        if(!setResult[i]) {
            // 전 학생이 체육복 여벌이 있을 때
            if(setResult[i - 1] === 2) {
                // 빌린 학생의 체육복 한 개 더하기
                setResult[i] += 1;
                // 빌려준 학생의 체육복 한 개 빼기
                setResult[i - 1] -= 1;
            // 다음 학생이 체육복 여벌이 있을 때
            } else if(setResult[i + 1] === 2) {
                // 빌린 학생의 체육복 한 개 더하기
                setResult[i] += 1;
                // 빌려준 학생의 체육복 한 개 빼기
                setResult[i + 1] -= 1;
            }
        }
    }
    
    for(let i = 0; i < n; i++) {
        // 학생의 체육복이 1개 이상일 때, 결과값 1씩 더하기
        if(setResult[i] >= 1) answer++;
    }
    
    return answer;
}

// map, filter 사용 버전

function solution(n, lost, reserve) {
    // 실제로 체육복을 잃어버린 학생
    let lostCloth = lost.filter(v => !reserve.includes(v));
    // 실제로 체육복 여분을 챙긴 학생
    let reserveCloth = reserve.filter(v => !lost.includes(v));

    return n - lostCloth.filter(v => {
        // 체육복이 2개인 학생과 체격차가 1인 학생
        // abs는 절대값 구하기 => 예. -1을 1로
        let findReserve = reserveCloth.find(r => Math.abs(r - v) <= 1);

        // 체격차가 1인 학생이 없을 때, 그대로 출력
        if(!findReserve) return true;

        // 체격자가 1인 학생을 찾았을 때, lost에서 받은 학생 제외, reserve에서 빌려준 학생 제외
        reserveCloth = reserveCloth.filter(r => r !== findReserve);
    }).length;
}