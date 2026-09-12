function showTestResult(testName, success, message) {
    const result = document.getElementById("testResult");

    if (success) {
        result.textContent = testName + " PASS - " + message;
    } else {
        result.textContent = testName + " FAIL - " + message;
    }
}


// C01 정상 로그인
function testLoginSuccess() {
    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    if (id === USER_ID && pw === USER_PW) {
        showTestResult(
            "T05-C01",
            true,
            "정상 로그인 정보 확인"
        );
    } else {
        showTestResult(
            "T05-C01",
            false,
            "아이디 또는 비밀번호가 올바르지 않음"
        );
    }
}


// C02 잘못된 아이디
function testWrongId() {
    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    if (id !== USER_ID && pw === USER_PW) {
        showTestResult(
            "T05-C02",
            true,
            "잘못된 아이디 로그인 실패 확인"
        );
    } else {
        showTestResult(
            "T05-C02",
            false,
            "잘못된 아이디 조건이 아님"
        );
    }
}


// C03 잘못된 비밀번호
function testWrongPw() {
    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    if (id === USER_ID && pw !== USER_PW) {
        showTestResult(
            "T05-C03",
            true,
            "잘못된 비밀번호 로그인 실패 확인"
        );
    } else {
        showTestResult(
            "T05-C03",
            false,
            "잘못된 비밀번호 조건이 아님"
        );
    }
}


// C04 아이디 빈칸
function testEmptyId() {
    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    if (id === "" && pw === USER_PW) {
        showTestResult(
            "T05-C04",
            true,
            "아이디 빈칸 로그인 실패 확인"
        );
    } else {
        showTestResult(
            "T05-C04",
            false,
            "아이디 빈칸 조건이 아님"
        );
    }
}


// C05 비밀번호 빈칸
function testEmptyPw() {
    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    if (id === USER_ID && pw === "") {
        showTestResult(
            "T05-C05",
            true,
            "비밀번호 빈칸 로그인 실패 확인"
        );
    } else {
        showTestResult(
            "T05-C05",
            false,
            "비밀번호 빈칸 조건이 아님"
        );
    }
}


// C06 둘 다 빈칸
function testEmptyBoth() {
    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    if (id === "" && pw === "") {
        showTestResult(
            "T05-C06",
            true,
            "아이디와 비밀번호 모두 빈칸 로그인 실패 확인"
        );
    } else {
        showTestResult(
            "T05-C06",
            false,
            "아이디와 비밀번호를 모두 비워야 함"
        );
    }
}