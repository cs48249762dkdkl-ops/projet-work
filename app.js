function createPlan() {
    const title = document.getElementById("planTitle").value;
    const date = document.getElementById("planDate").value;
    const priority = document.getElementById("planPriority").value;
    const success = document.getElementById("planSuccess").value;
    const expectedTime = document.getElementById("planExpectedTime").value;

    if (title.trim() === "") {
        alert("계획 이름을 입력하세요.");
        return;
    }

   const plan = {
    id: Date.now(),
    title: title,
    date: date,
    priority: priority,
    success: success,
    expectedTime: expectedTime,
    completed: false
};

    const plans = JSON.parse(localStorage.getItem("plans") || "[]");

    plans.push(plan);

    localStorage.setItem("plans", JSON.stringify(plans));

    exportT06Data();

    alert("계획이 저장되었습니다.");

    renderPlans();
}

function renderPlans() {
    const planList = document.getElementById("planList");

    const plans = JSON.parse(localStorage.getItem("plans") || "[]");

    if (plans.length === 0) {
        planList.innerHTML = "아직 저장된 계획이 없습니다.";
        return;
    }

    planList.innerHTML = "";

    plans.forEach(function(plan) {
        const div = document.createElement("div");

        div.className = "plan";

        div.innerHTML = `
    <h3>${plan.title}</h3>
    <p>📅 날짜: ${plan.date || "미정"}</p>
    <p>⭐ 우선순위: ${plan.priority}</p>
    <p>🎯 성공 기준: ${plan.success || "없음"}</p>
    <p>⏱️ 예상 시간: ${plan.expectedTime || 0}분</p>

    <p>
        상태:
        ${plan.completed ? "✅ 달성 완료" : "⏳ 진행 중"}
    </p>

    <button onclick="togglePlan(${plan.id})">
        ${plan.completed ? "달성 취소" : "달성"}
    </button>

    <button onclick="deletePlan(${plan.id})">
        🗑️ 삭제
    </button>
`;

        planList.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderPlans();
    renderTodos();
    renderReview();
});

function togglePlan(id) {
    const plans = JSON.parse(localStorage.getItem("plans") || "[]");

    const plan = plans.find(function(plan) {
        return plan.id === id;
    });

    if (!plan) return;

    plan.completed = !plan.completed;

    localStorage.setItem("plans", JSON.stringify(plans));

    exportT06Data();

    renderPlans();
}


function deletePlan(id) {
    const answer = confirm("이 계획을 삭제할까요?");

    if (!answer) return;

    let plans = JSON.parse(localStorage.getItem("plans") || "[]");

    plans = plans.filter(function(plan) {
        return plan.id !== id;
    });

    localStorage.setItem("plans", JSON.stringify(plans));

    exportT06Data();

    renderPlans();
}

function createTodo() {
    const title = document.getElementById("todoTitle").value;

    if (title.trim() === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    const todo = {
        id: Date.now(),
        title: title,
        completed: false
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    exportT06Data();

    document.getElementById("todoTitle").value = "";

    renderTodos();
}


function renderTodos() {
    const todoList = document.getElementById("todoList");

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    if (todos.length === 0) {
        todoList.innerHTML = "아직 할 일이 없습니다.";
        return;
    }

    todoList.innerHTML = "";

    todos.forEach(function(todo) {
        const div = document.createElement("div");

        div.className = "plan";

        div.innerHTML = `
            <h3>${todo.completed ? "✅" : "⬜"} ${todo.title}</h3>

            <button onclick="toggleTodo(${todo.id})">
                ${todo.completed ? "완료 취소" : "완료"}
            </button>

            <button onclick="deleteTodo(${todo.id})">
                🗑️ 삭제
            </button>
        `;

        todoList.appendChild(div);
    });
}


function toggleTodo(id) {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    const todo = todos.find(function(todo) {
        return todo.id === id;
    });

    if (!todo) return;

    todo.completed = !todo.completed;

    localStorage.setItem("todos", JSON.stringify(todos));

    exportT06Data();

    renderTodos();
}


function deleteTodo(id) {
    const answer = confirm("이 할 일을 삭제할까요?");

    if (!answer) return;

    let todos = JSON.parse(localStorage.getItem("todos") || "[]");

    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    exportT06Data();

    renderTodos();
}

function renderReview() {
    const reviewResult = document.getElementById("reviewResult");

    const plans = JSON.parse(localStorage.getItem("plans") || "[]");

    if (plans.length === 0) {
        reviewResult.innerHTML = "아직 돌아볼 기록이 없습니다.";
        return;
    }

    // 날짜별로 묶기
    const grouped = {};

    plans.forEach(function(plan) {
        const date = plan.date || "날짜 없음";

        if (!grouped[date]) {
            grouped[date] = [];
        }

        grouped[date].push(plan);
    });

    reviewResult.innerHTML = "";

    // 날짜순으로 표시
    const dates = Object.keys(grouped).sort();

    dates.forEach(function(date) {
        const dateBox = document.createElement("div");
        dateBox.className = "plan";

        dateBox.innerHTML = `
            <h3>📅 ${date}</h3>
        `;

        grouped[date].forEach(function(plan) {
            const item = document.createElement("div");

            item.innerHTML = `
                <hr>
                <h4>${plan.completed ? "✅" : "⏳"} ${plan.title}</h4>
                <p>우선순위: ${plan.priority}</p>
                <p>성공 기준: ${plan.success || "없음"}</p>
                <p>예상 시간: ${plan.expectedTime || 0}분</p>
                <p>
                    결과:
                    ${plan.completed ? "달성 완료" : "미완료"}
                </p>
            `;

            dateBox.appendChild(item);
        });

        reviewResult.appendChild(dateBox);
    });
}

let executionStartTime = null;

function startExecution() {
    executionStartTime = new Date();

    document.getElementById("executionStatus").textContent =
        "▶ 실행 시작: " + executionStartTime.toLocaleString("ko-KR");

    document.getElementById("executionResult").innerHTML =
        "실행 중입니다...";
}

function finishExecution() {
    if (!executionStartTime) {
        alert("먼저 실행 시작 버튼을 눌러주세요.");
        return;
    }

    const endTime = new Date();

    const elapsedMilliseconds =
        endTime - executionStartTime;

    const elapsedMinutes =
        Math.floor(elapsedMilliseconds / 60000);

    const record = {
        startTime: executionStartTime.toISOString(),
        endTime: endTime.toISOString(),
        elapsedMinutes: elapsedMinutes,
        completed: true
    };

    const records =
        JSON.parse(localStorage.getItem("executionRecords") || "[]");

    records.push(record);

    localStorage.setItem(
        "executionRecords",
        JSON.stringify(records)
    );

    exportT06Data();

    document.getElementById("executionStatus").textContent =
        "■ 실행 종료: " + endTime.toLocaleString("ko-KR");

    document.getElementById("executionResult").innerHTML = `
        <p>✅ 달성 완료</p>
        <p>📅 달성 날짜: ${endTime.toLocaleDateString("ko-KR")}</p>
        <p>🕐 시작 시간: ${executionStartTime.toLocaleTimeString("ko-KR")}</p>
        <p>🕐 종료 시간: ${endTime.toLocaleTimeString("ko-KR")}</p>
        <p>⏱️ 실제 소요 시간: ${elapsedMinutes}분</p>
    `;

    executionStartTime = null;

    renderReview();
}

function exportT06Data() {
    const plans = JSON.parse(
        localStorage.getItem("plans") || "[]"
    );

    const todos = JSON.parse(
        localStorage.getItem("todos") || "[]"
    );

    const executionRecords = JSON.parse(
        localStorage.getItem("executionRecords") || "[]"
    );

    const data = {
        source: "T06",
        exportedAt: new Date().toISOString(),
        plans: plans,
        todos: todos,
        executionRecords: executionRecords
    };

    localStorage.setItem(
        "T06_LATEST_DATA",
        JSON.stringify(data)
    );
}

fetch("https://blank-nodejs-project--cs48249762dkdkl.replit.app/import-t06", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log("T07 전송 결과:", result);
})
.catch(error => {
    console.error("T07 전송 실패:", error);
});
