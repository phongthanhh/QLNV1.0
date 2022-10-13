const addUserbtn = document.getElementById('addUserBtn');

// function get ID
function getEl(id) {
    return document.getElementById(id);
}

// function constructor
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
            switch (this.posi) {
                case '1':
                    {
                        return +this.pay * 3
                    }
                case '2':
                    {

                        return +this.pay * 2
                    }
                case '3':
                    {

                        return +this.pay
                    }
            }
        },
        this.rank = () => {
            if (+this.time < 160) {
                return 'Trung bình'
            } else if (+this.time >= 160 && +this.time < 176) {
                return 'Khá'
            } else if (+this.time >= 176 && +this.time < 192) {
                return 'Giỏi'
            } else {
                return 'Xuất sắc'
            }
        }
}


var staffs = []

const getUser = getEl('addusername');
const getName = getEl('addName');
const getEmail = getEl('addEmail');
const getPass = getEl('addPassword');
const getDate = getEl('addDate');
const getPosi = getEl('addPosi');
const getPay = getEl('addPay');
const getTime = getEl('addTime');

const getInputAdd = document.querySelectorAll('.gruopAdd .input__add')
const listStaff = [getUser, getName, getEmail, getPass, getDate, getPosi, getPay, getTime];

// render
function renderInfo(data) {
    data = data || staffs;
    let tableHtml = document.querySelector('.renderTable')
    let htmlContent = ''
    staffs.forEach((staff, index) => {
        let staffId = index;
        let posiLabel = ''
        if (staff.posi == '1') {
            posiLabel = ` <td><span class="badge bg-label-warning me-1">Sếp</span></td>`
        } else if (staff.posi == '2') {
            posiLabel = ` <td><span class="badge bg-label-info me-1">Trưởng phòng</span></td>`
        } else {
            posiLabel = ` <td><span class="badge bg-label-success me-1">Nhân viên</span></td>`
        }

        let rankHtml = ''
        if (0 < +staff.time && +staff.time < 160) {
            rankHtml = `<td class="text-danger" >${staff.rank()}</td>`
        } else if (+staff.time >= 160 && +staff.time < 176) {
            rankHtml = `<td class="text-success" >${staff.rank()}</td>`
        } else if (+staff.time >= 176 && +staff.time < 192) {
            rankHtml = `<td class="text-info" >${staff.rank()}</td>`
        } else {
            rankHtml = `<td class="text-warning" >${staff.rank()}</td>`
        }

        htmlContent += `
        <tr>
        <td><strong>${staff.userName}</strong></td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>
        <td>${staff.date}</td>
        ${posiLabel}
        <td>${staff.calcSalary()} $</td>
        ${rankHtml}
        <td>
            <div class="action">
                <a class="action__edit" data-bs-toggle="modal" data-bs-target="#modalUpdate"href="javascript:void(0);" onclick="editInfo(${staffId})" ><i class="bx bx-edit-alt "></i> </a>

                <a class="action__del" data-bs-toggle="modal" data-bs-target="#modalDel" href="javascript:void(0);" onclick="delInfo(${staffId})" ><i class="bx bx-trash "></i> </a>
             </div>
        </td>
    </tr>
        `
    })
    tableHtml.innerHTML = htmlContent
}

// { /* <td class="" id="ranking">${staff.rank()}</td> */ }
// renderInfo(staffs)


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
            // input.value = input.value.trim();
            if (!input.value) {
                showError(input)
            } else {
                showSucess(input)
            }
        }
    })
}
oninputt(listStaff)

// func Remove class
function removeActiveAdd(input) {
    input.forEach(input => {
        let parentInput = input.closest('.input-group')
        parentInput.classList.remove('showError')
    })
}

// Btn Add
addUserbtn.addEventListener('click', function() {

    // Get close modal elements
    // const closeModalEl = document.querySelector('#modalAdd .btn-close')

    removeActiveAdd(listStaff)

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
        renderInfo()
        saveData()
        getEl('btnReset').click()
        closeModal('modalAdd')
        Swal.fire(
            'Add Success!',
            'Have a nice day!',
            'success'
        )

    } else {
        console.log('false')
    }
})

// Save data local stogare

function saveData() {
    // Chuyển staffs ==> chuỗi JSON
    localStorage.setItem("staff", JSON.stringify(staffs));
}

// function : lấy dữ liệu từ localStorage và in ra màn hình ngay khi load.
function fetchData() {
    const localStaff = localStorage.getItem("staff");
    //   kiểm tra tồn tại
    if (localStaff) {
        //   chuyển lại từ chuỗi ra array
        const arrLocal = JSON.parse(localStaff)
        arrLocal.forEach((item) => {
            const newStaff = new Staff(
                item.userName,
                item.name,
                item.email,
                item.password,
                item.date,
                item.posi,
                item.pay,
                item.time,
            )
            staffs.push(newStaff)
        })
        renderInfo()
    }
}
fetchData()

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

// Update 
function editInfo(id) {

    getEl("upUser").value = staffs[id].userName
    getEl("upName").value = staffs[id].name
    getEl("upEmail").value = staffs[id].email
    getEl("upPass").value = staffs[id].password
    getEl("upDate").value = staffs[id].date
    getEl("upSelect").value = staffs[id].posi
    getEl("upPay").value = staffs[id].pay
    getEl("upTime").value = staffs[id].time

    getEl('upUser').setAttribute("disabled", true);

    const cfUpdate = getEl('cfUpdate')
    cfUpdate.addEventListener('click', () => {

        const upUser = getEl("upUser").value.trim()
        const upName = getEl("upName").value.trim()
        const upEmail = getEl("upEmail").value.trim()
        const upPass = getEl("upPass").value.trim()
        const upDate = getEl("upDate").value.trim()
        const upSelect = getEl("upSelect").value.trim()
        const upPay = getEl("upPay").value.trim()
        const upTime = getEl("upTime").value.trim()

        const newUpdate = new Staff(
            upUser,
            upName,
            upEmail,
            upPass,
            upDate,
            upSelect,
            upPay,
            upTime
        )
        staffs[id] = newUpdate
        renderInfo()
        saveData()
        closeModal('modalUpdate')
        Swal.fire(
            'Update Success!',
            'Have a nice day!',
            'success'
        )
        console.log('PhongThanh 🚀 ~> staffs', staffs)
    })

}

// Del value
function delInfo(id) {
    const cfDel = getEl('cfDel')
    cfDel.addEventListener('click', () => {

        staffs.splice(id, 1)
        renderInfo()
        console.log('PhongThanh 🚀 ~> staffs', staffs)
        saveData()
        closeModal('modalDel')
        Swal.fire(
            'Delete Success!',
            'Have a nice day!',
            'success'
        )
    })
}


//  function close Modal
function closeModal(id) {
    document.querySelector(`#${id} .btn-close `).click()
}