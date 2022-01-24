const addBtn = document.querySelector('.btn_add');
const text = document.querySelector('.text');
const list = document.querySelector('.list');
const list_footer = document.querySelector('.list_footer');
const tab = document.querySelector('.tab');
const tabLi = document.querySelectorAll('li');
const card = document.querySelector('.card_list');

let data = [];

//畫面重整時
document.addEventListener('DOMContentLoaded', getLocalTodos());

//渲染
function renderData(todo) {
    let str = '';
    todo.forEach(function (item, index) {
        str += `
        <li>
            <label class="checkbox" for="">
               <input class='${
                   item.completed ? 'completed' : ''
               }' data-num=${index} type="checkbox" />
               <span>${item.text}</span>
            </label>
            <a href="#" data-num=${index} class="delete"></a>
        </li>
        `;
    });
    list.innerHTML = str;
    saveLocalTodos(todo);

    const count = data.filter((e) => e.completed === false);
    let strP = '';
    strP += `
    <p>${count.length} 個待完成項目</p>
    <a class=deleteAll href="#">清除已完成項目</a>
    `;

    list_footer.innerHTML = strP;
}

//按鈕新增資料
addBtn.addEventListener('click', function (e) {
    addData();
    console.log('按鈕成功新增資料', data);
});

//鍵盤新增資料
text.addEventListener('keypress', function (e) {
    if (e.which === 13) {
        addData();
        console.log('鍵盤成功新增資料', data);
    }
});

//新增資料函式
function addData() {
    if (text.value == '') {
        return;
    } else {
        card.classList.remove('hide');
    }
    data.push({
        text: text.value,
        completed: false,
    });
    text.value = '';
    renderData(data);
    clearTab();
    tabLi[0].classList.add('check');
}

list.addEventListener('click', function (e) {
    const item = e.target;
    //刪除資料
    if (item.classList[0] === 'delete') {
        let num = e.target.getAttribute('data-num');
        e.preventDefault();
        console.log('成功刪除資料', data[num]);
        data.splice(num, 1);
        renderData(data);
        if (data.length === 0) {
            card.classList.add('hide');
        }
    }

    //勾選資料
    if (item.nodeName === 'INPUT') {
        let num = e.target.getAttribute('data-num');
        data[num].completed = !data[num].completed;
        console.log('成功勾選資料', data[num]);
        renderData(data);
    }
});

//篩選資料
tab.addEventListener('click', function (e) {
    let showData = [];
    const tabBtn = e.target;

    clearTab();
    switch (tabBtn.classList[0]) {
        case 'active':
            showData = data;
            console.log('成功點選全部', showData);
            tabBtn.classList.add('check');
            break;
        case 'completed':
            showData = data.filter((item) => {
                tabBtn.classList.add('check');
                return item.completed === true;
            });
            console.log('成功點選待完成', showData);
            break;
        case 'uncompleted':
            showData = data.filter((item) => {
                tabBtn.classList.add('check');
                return item.completed === false;
            });
            console.log('成功點選已完成', showData);
            break;
    }
    renderData(showData);
});

//清空所有已完成資料
list_footer.addEventListener('click', function (e) {
    if (e.target.classList[0] === 'deleteAll') {
        const deletaData = data.filter((e) => e.completed === false);
        data = deletaData;
        console.log('成功清除已完成資料 剩下資料為', deletaData);
        if (data.length === 0) {
            card.classList.add('hide');
        }
        renderData(deletaData);
    }
});

//儲存資料
function saveLocalTodos(data) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(data));
    console.log('成功儲存資料', todos);
}

//抓取資料
function getLocalTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    data = todos;
    renderData(todos);
    if (data.length === 0) {
        card.classList.add('hide');
    } else {
        card.classList.remove('hide');
    }
    console.log('成功抓取資料', todos);
}

//初始化Tab
function clearTab() {
    tabLi.forEach((li) => li.classList.remove('check'));
}
