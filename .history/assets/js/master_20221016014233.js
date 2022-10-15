// function get ID
const getEl = id => document.getElementById(id);

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


const staffs = []

// TODO ------------Input add-----------------

const userEl = getEl('addusername');
const nameEl = getEl('addName');
const emailEl = getEl('addEmail');
const passEl = getEl('addPassword');
const dateEl = getEl('addDate');
const posiEl = getEl('addPosi');
const payEl = getEl('addPay');
const timeEl = getEl('addTime');

const getInputAdd = document.querySelectorAll('.gruopAdd .input__add');

const listStaff = [userEl, nameEl, emailEl, passEl, dateEl, posiEl, payEl, timeEl];

// List Input Update
const userUpEl = getEl('upUser');
const nameUpEl = getEl('upName');
const emailUpEl = getEl('upEmail');
const passUpEl = getEl('upPass');
const dateUpEl = getEl('upDate');
const posiUpEl = getEl('upSelect');
const payUpEl = getEl('upPay');
const timeUpEl = getEl('upTime');

// const listStaffUp = [getUserUp, getNameUp, getEmailUp, getPassUp, getDateUp, getPosiUp, getPayUp, getTimeUp]

// render
const renderInfo = data => {
    data = data || staffs;

    const tableHtml = document.querySelector('.renderTable')
    let htmlContent = ''

    data.forEach((staff, index) => {
        const staffId = index;
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

// !! --------------------FUNC ALERTS!!!------------------------

// Func Show error 
const showError = (input, message) => {
    // get the form-field element
    const parentInput = input.closest('.input-group')

    // Remove the true class
    parentInput.classList.remove('showTrue')
    parentInput.classList.add('showError');

    // show the error message
    const showMessage = input.closest('.group__form').querySelector('.showError__message')
    showMessage.innerHTML = message
};


// Func Show Success
const showSucess = input => {
    // get the form-field element
    const parentInput = input.closest('.input-group');

    // Remove the error class
    parentInput.classList.remove('showError')
    parentInput.classList.add('showTrue')

    // hide the error message
    const showMessage = input.closest('.group__form').querySelector('.showError__message')
    showMessage.innerHTML = ''
}

// func Remove class
const removeActiveAdd = inputs => {
    inputs.forEach(input => {
        const parentInput = input.closest('.input-group')
        parentInput.classList.remove('showTrue')
    })
}



// !! -------------------Validations CHECK-------------------------
// Func check Empty
const isRequired = value => value === '' ? false : true;

// Func check length
const isLenghtValid = (length, min, max) => length < min || length > max ? false : true;

// fun checkEmail
const isEmailValid = email => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email)
}

// fun  regex checkStringr
const isStringValid = value => {
    const reString = /^[a-zA-Z]+$/
    return reString.test(value)
}

// FUNC check Salary
const isSalaryValid = (salary, min, max) => +salary < min || +salary > max ? false : true;

// Func check time
const isTimeValid = (time, min, max) => +time < min || +time > max ? false : true;

// Func checkPass
const isPasswordSecure = password => {
    //  Pass Chứa: +1 kí tự thường
    //              + 1 kí tự hoa
    //              + 1 số
    //              + 1 kí tự đặc biệt
    //              + chứa 8 kí tự trở lên
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

// fun check add
const isCheckUser = user => {
    let valid = true;
    if (staffs) {
        staffs.forEach(item => {
            if (user === item.userName) {
                valid = false
            }
        })
    }
    return valid
}


//TODO -------------------------Validations------------------------

// !Check User
const checkUser = () => {
    let valid = false
    const min = 3,
        max = 25;
    const user = userEl.value.trim();
    if (!isRequired(user)) {
        showError(userEl, 'User cannot be blank!')
    } else if (!isLenghtValid(user.length, min, max)) {
        showError(userEl, `User must between ${min} and ${max}`)
    } else {
        showSucess(userEl)
        valid = true
    }
    return valid
}

// ! Check Name
const checkName = () => {
    let valid = false
    const name = nameEl.value.trim();
    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank!')
    } else if (!isStringValid(name)) {
        showError(nameEl, `Name must be characters`)
    } else {
        showSucess(nameEl)
        valid = true
    }
    return valid
}

// ! Check Email 
const checkEmail = () => {
    let valid = false

    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank!')
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email invalidate')
    } else {
        showSucess(emailEl)
        valid = true
    }
    return valid
}

// ! Check Password
const checkPassword = () => {
    let valid = false
    password = passEl.value.trim();
    if (!isRequired(password)) {
        showError(passEl, 'Password cannot be blank!')
    } else if (!isPasswordSecure(password)) {
        showError(passEl, `Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`)
    } else {
        showSucess(passEl)
        valid = true
    }
    return valid
}

// ! Check DateTime

const checkDateTime = () => {
    let valid = false
    const dateTime = dateEl.value
    if (!isRequired(dateTime)) {
        showError(dateEl, 'DateTime cannot be blank!')
    } else {
        showSucess(dateEl)
        valid = true
    }
    return valid
}

// !Check Posi

const checkPosi = () => {
    let valid = false
    const posi = posiEl.value
    if (!isRequired(posi)) {
        showError(posiEl, 'Position invalid')
    } else {
        showSucess(posiEl)
        valid = true
    }
    return valid
}

// !Check Pay
const checkPay = () => {
    let valid = false
    const min = 1000000,
        max = 20000000;
    const pay = payEl.value
    if (!isRequired(pay)) {
        showError(payEl, 'Salary cannot be blank!')
    } else if (!isSalaryValid(pay, min, max)) {
        const newsMin = min.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            useGrouping: true,
            maximumSignificantDigits: 3,
        });
        const newsMax = max.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            useGrouping: true,
            maximumSignificantDigits: 3,
        });
        showError(payEl, `Salary must between  ${newsMin} -  ${newsMax}`)
    } else {
        showSucess(payEl)
        valid = true
    }
    return valid
}

// ! Check Time
const checkTime = () => {
    let valid = false
    const min = 80,
        max = 200;
    const time = timeEl.value
    if (!isRequired(time)) {
        showError(timeEl, 'Time cannot be blank!')
    } else if (!isTimeValid(time, min, max)) {
        showError(timeEl, `Time must between ${min}h - ${max}h`)
    } else {
        showSucess(timeEl)
        valid = true
    }
    return valid
}


// Func oninput 
function oninputt(listInput) {
    listInput.forEach(input => {
        input.onblur = function() {
            if (input === userEl) {
                checkUser()
            }
            if (input === nameEl) {
                checkName()
            }
            if (input === emailEl) {
                checkEmail()
            }
            if (input === passEl) {
                checkPassword()
            }
            if (input === dateEl) {
                checkDateTime()
            }
            if (input === posiEl) {
                checkPosi()
            }
            if (input === payEl) {
                checkPay()
            }
            if (input === timeEl) {
                checkTime()
            }
        }
    })
}
oninputt(listStaff)


// !!--------------------------------------------------------------
// Save data local stogare
const saveData = () => {
    // Chuyển staffs ==> chuỗi JSON
    localStorage.setItem("staff", JSON.stringify(staffs));
}

// function : lấy dữ liệu từ localStorage và in ra màn hình ngay khi load.
const fetchData = () => {
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
};
// Show table ngay khi load trang
fetchData()


// TODO -----------------ADD - UPDATE -DEL -------------------

//! ADD
const addUserbtn = document.getElementById('addUserBtn');

addUserbtn.addEventListener('click', () => {
    let isUserValid = checkUser(),
        isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isPassValid = checkPassword(),
        isDateTimeValid = checkDateTime(),
        isPosiValid = checkPosi(),
        isPayValid = checkPay(),
        isTimeValid = checkTime();

    let isFormValid = isUserValid && isNameValid && isEmailValid && isPassValid && isDateTimeValid && isPosiValid && isPayValid && isTimeValid;

    if (isFormValid) {
        const userName = userEl.value.trim()
        const name = nameEl.value.trim()
        const email = emailEl.value.trim()
        const password = passEl.value.trim()
        const date = dateEl.value
        const posi = posiEl.value
        const pay = payEl.value.trim()
        const time = timeEl.value.trim()

        let isCheckUserr = isCheckUser(userName)
        if (isCheckUserr) {
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
            removeActiveAdd(listStaff)
        } else {
            // userEl.value = ''
            showError(userEl, 'Tài khoản đã tồn tại')
            removeActiveAdd(listStaff)
        }
    }
})


//! Update 
const editInfo = id => {
    console.log(id)
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
        // cfUpdate.addEventListener('click', () => {
        //     let isEmpty = checkEmpty(listStaffUp)
        //     if (!isEmpty) {
        //         const upUser = getEl("upUser").value.trim()
        //         const upName = getEl("upName").value.trim()
        //         const upEmail = getEl("upEmail").value.trim()
        //         const upPass = getEl("upPass").value.trim()
        //         const upDate = getEl("upDate").value
        //         const upSelect = getEl("upSelect").value
        //         const upPay = getEl("upPay").value.trim()
        //         const upTime = getEl("upTime").value.trim()

    //         const newUpdate = new Staff(
    //             upUser,
    //             upName,
    //             upEmail,
    //             upPass,
    //             upDate,
    //             upSelect,
    //             upPay,
    //             upTime
    //         )
    //         staffs[id] = newUpdate
    //         renderInfo()
    //         saveData()
    //         closeModal('modalUpdate')
    //         Swal.fire(
    //             'Update Success!',
    //             'Have a nice day!',
    //             'success'
    //         )
    //     } else {
    //         console.log('false')
    //     }

    // })

}

//! Del value
const delInfo = id => {
    const cfDel = getEl('cfDel')
    cfDel.addEventListener('click', () => {

        staffs.splice(id, 1)
        renderInfo()
        saveData()
        closeModal('modalDel')
        Swal.fire(
            'Delete Success!',
            'Have a nice day!',
            'success'
        )
    })
}

//TODO ------------------Linh tinh----------------------
//  function close Modal
const closeModal = id => {
    document.querySelector(`#${id} .btn-close `).click()
}

// ShowHide Password    
const showPass = (input, parent) => {
    const getInputP = getEl(input);
    let getIcon = document.querySelector(`#${parent} .iconShowP i`);

    if (getInputP.type === 'password') {
        getInputP.type = 'text'
        getIcon.setAttribute('class', 'bx bx-show')
    } else {
        getInputP.type = 'password'
        getIcon.setAttribute('class', 'bx bx-hide')
    }
}


// TODO----------------------------------
// Func Sắp xếp rank
const ranksl = getEl('rankSelect')
ranksl.onchange = () => {
    let rankValue = ranksl.value;
    //   kiểm tra tồn tại
    var result = staffs.filter(item => {
        switch (rankValue) {
            case '4':
                {
                    return +item.time < 160
                }
            case '3':
                {
                    return +item.time >= 160 && +item.time < 176
                }
            case '2':
                {
                    return +item.time >= 176 && +item.time < 192
                }
            case '1':
                {
                    return +item.time >= 192
                }
            default:
                {
                    return item
                }
        }
    })
    renderInfo(result)
}

// Func Search

const searchInput = document.querySelector('.filter__rank .searchInfo')
searchInput.oninput = () => searchInfo()

const searchInfo = () => {
    const InfoSearch = document.querySelector('.filter__rank .searchInfo').value
    Info = InfoSearch.trim()
    const result = staffs.filter(value => {
        return value.userName.toUpperCase().includes(Info.toUpperCase())
    })
    renderInfo(result)
}