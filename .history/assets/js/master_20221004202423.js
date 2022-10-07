const addUserbtn = document.getElementById('addUserBtn');

function Staff(userName, name, email, password, date, posi, pay, time, ) {
    // Property
    this.userName = userName;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.posi = posi;
    this.pay = pay;
    this.time = time;
    // Methods 
    this.calcSalary = () => {
        console.log(first)
    }
}



var staffs = [{
        date: "2022-10-05",
        email: "demo@gmail.com",
        name: "Phong Thanh",
        password: "123123",
        pay: "1000000",
        posi: "1",
        time: "123",
        userName: "phong1"
    },
    {
        date: "2022-10-05",
        email: "demo2@gmail.com",
        name: "Hue",
        password: "123123",
        pay: "1000000",
        posi: "2",
        time: "123",
        userName: "hue"
    }
]

const getUser = document.getElementById('addusername');
const getName = document.getElementById('addName');
const getEmail = document.getElementById('addEmail');
const getPass = document.getElementById('addPassword');
const getDate = document.getElementById('addDate');
const getPosi = document.getElementById('addPosi');
const getPay = document.getElementById('addPay');
const getTime = document.getElementById('addTime');

const getInputAdd = document.querySelectorAll('.gruopAdd .input__add')
const listStaff = [getUser, getName, getEmail, getPass, getDate, getPosi, getPay, getTime];

// render
function renderInfo(staffs) {
    let tableHtml = document.querySelector('.renderTable')
    let htmlContent = ''
    staffs.forEach(staff => {
        let posiLabel
        if (staff.posi == '1') {
            posiLabel = 'Sếp'
        } else if (staff.posi == '2') {
            posiLabel = 'Trưởng phòng'
        } else {
            posiLabel = 'Nhân viên'
        }
        htmlContent += `
        <tr>
        <td><strong>${staff.userName}</strong></td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>
        <td>${staff.date}</td>
        <td><span class="badge bg-label-success me-1">${posiLabel}</span></td>
        <td>${staff.pay}$</td>
        <td class="text-warning">${staff.userName}</td>
        <td>
            <div class="action">
                <a class="action__edit" data-bs-toggle="modal" data-bs-target="#modalUpdate " href="javascript:void(0);"><i class="bx bx-edit-alt "></i> </a>
                <a class="action__del" href="javascript:void(0);"><i class="bx bx-trash "></i> </a>
             </div>
        </td>
    </tr>
        `
    })
    tableHtml.innerHTML = htmlContent
}

renderInfo(staffs)


// Func Show error 
function showError(input) {
    let parentInput = input.closest('.input-group')
    parentInput.classList.remove('showTrue')
    parentInput.classList.add('showError')
    input.setAttribute('placeholder', 'Không được để trống !')
}


// Func Show Success
function showSucess(input) {
    let parentInput = input.closest('.input-group')
    parentInput.classList.remove('showError')
    parentInput.classList.add('showTrue')
    input.removeAttribute('placeholder')
}

function checkEmpty(listInput) {
    let isEmpty = false;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value) {
            showError(input)
            isEmpty = true
        } else {
            showSucess(input)
        }
    })
    return isEmpty
}

// Func oninput 
function oninputt(listInput) {
    listInput.forEach(input => {
        input.oninput = function() {
            input.value = input.value.trim();
            if (!input.value) {
                showError(input)
                isEmpty = true
            } else {
                showSucess(input)
            }
        }
    })
}
oninputt(listStaff)


// Btn Add
addUserbtn.addEventListener('click', function() {
    const modalEl = document.getElementById('modalAdd')
    console.log('PhongThanh 🚀 ~> modalEl', modalEl)
    let isEmpty = checkEmpty(listStaff)
    if (!isEmpty) {
        const userName = getUser.value.trim()
        const name = getName.value.trim()
        const email = getEmail.value.trim()
        const password = getPass.value.trim()
        const date = getDate.value
        const posi = getPosi.value
        const pay = getPay.value.trim()
        const time = getTime.value.trim()

        const newStaff = new Staff(userName, name, email, password, date, posi, pay, time, )

        staffs.push(newStaff)

        console.log(staffs)
        renderInfo(staffs)

    } else {
        console.log('false')
    }
})


// ShowHide Password    
function showPass() {
    const getInputP = document.getElementById('addPassword');
    let getIcon = document.querySelector('.iconShowP i');

    if (getInputP.type === 'password') {
        getInputP.type = 'text'
        getIcon.setAttribute('class', 'bx bx-show')
    } else {
        getInputP.type = 'password'
        getIcon.setAttribute('class', 'bx bx-hide')
    }
}