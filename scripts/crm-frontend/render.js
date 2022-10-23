function initToolBar(elem){
    const tool = document.createElement('div')
    tool.classList.add('toolbar')

    const type = document.createElement('span')
    type.textContent = elem.getAttribute(`data-type`) + ':'
    type.style = `margin-right:3px`

    const val = document.createElement('span')
    const href = elem.getAttribute('href')
    val.textContent = href.includes(`:`) ? href.split(`:`)[1]:href
    tool.append(type)
    tool.append(val)
    elem.append(tool)
}

function parseContacts(list, elem){
    const contactsList = {
        tel:`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <circle cx="8" cy="8" r="8" fill="#9873FF"/>
        <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g>
        </svg>`,
        vk:`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
        </svg>`,
        fb:`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
        </svg>`,
        mail:`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
        </svg>`,
        another:`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
        </svg>`
    }
    const contactsFlex = document.createElement('div')
    contactsFlex.classList.add('contactsFlex')
    contactsFlex.classList.add('contacts-wrapper')
    for (let i of list){
        let a = document.createElement('a')
        a.classList.add('contacts-link')
        if (i.type.toLowerCase() === 'телефон'){
            a.href = `tel:${i.value}`
            a.innerHTML = contactsList.tel
        } else if (i.type.toLowerCase() === 'email'){
            a.href = `mailto:${i.value}`
            a.innerHTML = contactsList.mail
        } else if (i.type.toLowerCase() === 'vk'){
            a.href = `${i.value}`
            a.innerHTML = contactsList.vk
        } else if (i.type.toLowerCase() === 'facebook'){
            a.href = `${i.value}`
            a.innerHTML = contactsList.fb
        } else {
            a.href = `${i.value}`
            a.innerHTML = contactsList.another
        }
        a.setAttribute(`data-type`, i.type)
        contactsFlex.append(a)
        initToolBar(a)
    }
    if(contactsFlex.children.length>4){
        for (let i = 4; i<contactsFlex.children.length; i++){
            contactsFlex.children[i].style.display = 'none'
        }
        const more = document.createElement('button')
        more.classList.add('btn-reset')
        more.classList.add('btn-more-contact')
        more.textContent = `+${contactsFlex.children.length-4}`
        more.addEventListener('click', ()=>{
            for (let i = 4; i<contactsFlex.children.length; i++){
                contactsFlex.children[i].style.display = 'inline-block'
            }
            more.style.display = 'none'
        })
        contactsFlex.append(more)
    }
    elem.append(contactsFlex)
}

function getInputsNumberValue(input){
    return input.value.replace(/\D/g, '')
}

function onPhoneFunction(e){
    const input = e.target
    let inputNumberValue = getInputsNumberValue(input)
    let formattedInput = ''
    let selectionStart = input.selectionStart
    if (!inputNumberValue){
        return input.value = ''
    }

    if (selectionStart != input.value.length){
        if (e.data && /\D/g.test(e.data)){
            input.value = inputNumberValue 
        }
        return
    }

    if(['7','8','9'].indexOf(inputNumberValue[0]) > -1){
        if (inputNumberValue[0]=='9') inputNumberValue = '7' + inputNumberValue
        const firstSymbol = (inputNumberValue[0]=='8')? '+7':'+7'
        formattedInput = firstSymbol + ' '
        if (inputNumberValue.length > 1) {
            formattedInput += '(' + inputNumberValue.substring(1,4)
        }
        if (inputNumberValue.length > 4) {
            formattedInput += ') ' + inputNumberValue.substring(4,7)
        }
        if (inputNumberValue.length > 7) {
            formattedInput += '-' + inputNumberValue.substring(7,9)
        }
        if (inputNumberValue.length > 9) {
            formattedInput += '-' + inputNumberValue.substring(9,11)
        }
    } else {
        formattedInput =  "+" + inputNumberValue.substring(0, 16)
    }
    input.value = formattedInput 
}

function deleteFirst(e){
    if (e.key === 'Backspace') {
        if (e.target.value.length <= 3 && e.target.value[1]== '7'){
            e.target.value = ''
        }
    }
}

function onPhonePaste(e){
    let pasted = e.clipboardData 
    let input = e.target
    let InputNumberValue = getInputsNumberValue(input)
    if (pasted){
        let pastedText = pasted.getData("Text")
        if (/\D/g.test(pastedText)){
            input.value = InputNumberValue
        } else {
            const totalStr = input.value + pastedText
            if (totalStr.length>18){
                input.value =  input.value.substring(0, 18)
            }
        }
    }
}

function toogleEvent(input, boo){
    if (boo){
        input.addEventListener('input',  onPhoneFunction)
        input.addEventListener('keydown',  deleteFirst)
        input.addEventListener('paste',  onPhonePaste)
    } else {
        input.removeEventListener('input',  onPhoneFunction)
        input.removeEventListener('keydown',  deleteFirst)
        input.removeEventListener('paste',  onPhonePaste)
    }
}

function cleanDataTime(elem, data){
    const dateElem = document.createElement('span')
    dateElem.classList.add('date-table')
    dateElem.textContent = `${data.getFullYear()}.${data.getMonth()+1}.${data.getDate()}`
    const timeElem = document.createElement('span')
    timeElem.classList.add('time-table')
    timeElem.textContent = `${data.getHours()}:${data.getMinutes()}`
    elem.append(dateElem)
    elem.append(timeElem)
}

export function cleanData(data){
    const cleanDataForSort = []
    for (let i of data){
        const itemCleanData = {}
        itemCleanData.id = Number(i.id)
        itemCleanData.name = i.surname + ' '+ i.name + ' ' + i.lastName
        itemCleanData.createdAt = new Date(i.createdAt)
        itemCleanData.updatedAt = new Date(i.updatedAt)
        itemCleanData.contacts = i.contacts
        cleanDataForSort.push(itemCleanData)
    }
    return cleanDataForSort
}

export function renderDeleteWindow(){
    document.body.classList.add('stop-scroll')
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('add-client-wrapper');

    const form = document.createElement('div');
    form.classList.add('delete-client-form');
    form.classList.add('flex');

    const h2 = document.createElement('h2')
    h2.classList.add('delete-window-title')
    h2.textContent = `Удалить клиента`

    const descr = document.createElement('div')
    descr.textContent = `Вы действительно хотите удалить данного клиента?`
    descr.classList.add(`delete-window-descr`)

    const delBtn = document.createElement('button')
    const delText = document.createElement('span')
    delText.textContent = `Удалить`
    delBtn.append(delText)
    delBtn.classList.add('remove-delete-window')
    delBtn.classList.add('btn-reset')
    delBtn.insertAdjacentHTML('afterbegin', `<span class="spinner spinner-save-btn" style="display: none;"></span>`)


    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = `Отмена`
    cancelBtn.classList.add('cancel-delete-window')
    cancelBtn.classList.add('btn-reset')

    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = `<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2332 7.73333L21.2665 6.76666L14.4998 13.5334L7.73318 6.7667L6.76652 7.73336L13.5332 14.5L6.76654 21.2667L7.73321 22.2333L14.4998 15.4667L21.2665 22.2334L22.2332 21.2667L15.4665 14.5L22.2332 7.73333Z" fill="#B0B0B0"/>
    </svg>`
    closeBtn.classList.add('add-input-closebutton')
    closeBtn.classList.add('btn-reset')

    form.append(h2)
    form.append(descr)
    form.append(delBtn)
    form.append(cancelBtn)
    form.append(closeBtn)
    modalWrapper.append(form)
    document.body.append(modalWrapper)

    return {
        form:form,
        modalWrapper:modalWrapper,
        delBtn:delBtn,
        cancelBtn:cancelBtn,
        closeBtn:closeBtn
    }
}

export function renderSplachScreen(list){
    const splash = document.createElement('div')
    splash.classList.add('work-section__splash')
    return splash 
}

export function renderHeaderTable(){
    const table=`            <table class="work-section__table table">
    <thead>
        <tr>
            <th scope="col" class="table__head-col">
                <button data-type="id" class="btn-reset sort-btn flex sort-btn--up sort-def">
                    <span>ID</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/>
                        </svg>                                     
                </button>
            </th>
            <th scope="col" class="table__head-col">
                <span>Фамилия Имя Отчество</span>
                <button data-type="name" class="btn-reset sort-btn  flex sort-name">
                    <span>А-Я</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/>
                        </svg>    
                </button>                            
            </th>
            <th scope="col" class="table__head-col">
                Дата и время создания
                <button data-type="createdAt" class="btn-reset sort-btn flex sort-def">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/>
                        </svg>     
                </button>                           
            </th>
            <th scope="col" class="table__head-col">
                Последние изменения
                <button data-type="updatedAt" class="btn-reset sort-btn flex sort-def">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/>
                        </svg>   
                </button>                             
            </th>
            <th scope="col" class="table__head-col">
                Контакты
            </th>
            <th scope="col" class="table__head-col">
                Действия
            </th>
        </tr>
    </thead>
    <tbody class="table__body">
    </tbody>
</table>`
return table
}

export function renderBodyTable(list, tbody, sortFunction){
    list.sort(sortFunction)
    for(let i of list){
        let tr = document.createElement('tr')

        let thID = document.createElement('th')
        thID.classList.add('table-id')
        thID.textContent = i.id

        let thName = document.createElement('th')
        thName.classList.add('table-item-name')
        thName.textContent = i.name

        let thCreate = document.createElement('th')
        cleanDataTime(thCreate, i.createdAt)

        let thUpdate = document.createElement('th')
        cleanDataTime(thUpdate, i.updatedAt)

        let thContacts = document.createElement('th')
        thContacts.classList.add('table-contact-item')
        parseContacts(i.contacts, thContacts)


        let thActions = document.createElement('th')
        let deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('data-id', `${i.id}`)
        const spanDeleteText = document.createElement('span')
        spanDeleteText.textContent = 'Удалить'
        deleteBtn.append(spanDeleteText)
        deleteBtn.insertAdjacentHTML('afterbegin', `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
        </svg>
        `)
        deleteBtn.classList.add('btn-reset')
        deleteBtn.classList.add('btn-del')

        let editBtn = document.createElement('a')
        editBtn.href = `?id=${i.id}`
        editBtn.setAttribute('data-id', `${i.id}`)
        const spanEditText = document.createElement('span')
        spanEditText.textContent = 'Изменить'
        editBtn.append(spanEditText)
        editBtn.classList.add('btn-reset')
        editBtn.classList.add('btn-edit')
        editBtn.insertAdjacentHTML('afterbegin', `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10.5V13H2.5L9.87333 5.62662L7.37333 3.12662L0 10.5ZM11.8067 3.69329C12.0667 3.43329 12.0667 3.01329 11.8067 2.75329L10.2467 1.19329C9.98667 0.933291 9.56667 0.933291 9.30667 1.19329L8.08667 2.41329L10.5867 4.91329L11.8067 3.69329V3.69329Z" fill="#9873FF"/>
        </svg>`)

        const wrapperForBtn = document.createElement(`div`)
        wrapperForBtn.classList.add('flex')
        wrapperForBtn.append(editBtn)
        wrapperForBtn.append(deleteBtn)

        thActions.append(wrapperForBtn)

        tr.append(thID)
        tr.append(thName)
        tr.append(thCreate)
        tr.append(thUpdate)
        tr.append(thContacts)
        tr.append(thActions)
        tbody.append(tr)
        for (let i of tbody.querySelectorAll(`.toolbar`)){
            const left = ((i.offsetWidth-16) / 2) * -1
            i.setAttribute('style', `left:${left}px;`)
        }
    }
}

export function renderAddWindow(str){
    document.body.classList.add('stop-scroll')
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('add-client-wrapper');

    const form = document.createElement('div');
    form.classList.add('add-client-form');
    form.classList.add('flex');

    const h2 = document.createElement('h2');
    h2.textContent = str;
    h2.classList.add('add-client-title')

    const inputName = document.createElement('input');
    inputName.classList.add('add-input-field');
    inputName.classList.add('add-input-field-head');
    inputName.classList.add('data-for-server');
    inputName.setAttribute('data-std-input', 'true')
    inputName.setAttribute('name', 'name')
    inputName.placeholder = `Имя`
    const necessarilyLabelName= document.createElement('label')
    necessarilyLabelName.classList.add('necessarily-label')
    necessarilyLabelName.classList.add('necessarily-label--name')
    necessarilyLabelName.append(inputName)
    inputName.addEventListener('focus', ()=>{
        necessarilyLabelName.classList.remove('necessarily-label--name')
        inputName.classList.remove('input-error')
    })
    inputName.addEventListener('blur', ()=>{
        if (inputName.value.length > 0) return
        necessarilyLabelName.classList.add('necessarily-label--name')
    })
    

    const inputSurname = document.createElement('input');
    inputSurname.classList.add('add-input-field');
    inputSurname.classList.add('add-input-field-head');
    inputSurname.classList.add('data-for-server');
    inputSurname.setAttribute('data-std-input', 'true')
    inputSurname.setAttribute('name', 'surname')
    inputSurname.placeholder = `Фамилия`
    const necessarilyLabelSurname = document.createElement('label')
    necessarilyLabelSurname.append(inputSurname)
    necessarilyLabelSurname.classList.add('necessarily-label')
    necessarilyLabelSurname.classList.add('necessarily-label--surname')
    inputSurname.addEventListener('focus', ()=>{
        necessarilyLabelSurname.classList.remove('necessarily-label--surname')
        inputSurname.classList.remove('input-error')
    })
    inputSurname.addEventListener('blur', ()=>{
        if (inputSurname.value.length > 0) return
        necessarilyLabelSurname.classList.add('necessarily-label--surname')
    })

    const inputLastName = document.createElement('input');
    inputLastName.classList.add('add-input-field');
    inputLastName.classList.add('data-for-server');
    inputLastName.setAttribute('data-std-input', 'true')
    inputLastName.setAttribute('name', 'lastName')
    inputLastName.placeholder = `Отчество`
    inputLastName.addEventListener('focus', ()=>{
        inputLastName.classList.remove('input-error')
    })

    const addContact = document.createElement('button');
    const addContactSpan = document.createElement('span');
    addContactSpan.textContent = `Добавить контакт`;
    const addContactIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.99998 3.66659C6.63331 3.66659 6.33331 3.96659 6.33331 4.33325V6.33325H4.33331C3.96665 6.33325 3.66665 6.63325 3.66665 6.99992C3.66665 7.36659 3.96665 7.66659 4.33331 7.66659H6.33331V9.66659C6.33331 10.0333 6.63331 10.3333 6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665 9.66659V7.66659H9.66665C10.0333 7.66659 10.3333 7.36659 10.3333 6.99992C10.3333 6.63325 10.0333 6.33325 9.66665 6.33325H7.66665V4.33325C7.66665 3.96659 7.36665 3.66659 6.99998 3.66659ZM6.99998 0.333252C3.31998 0.333252 0.333313 3.31992 0.333313 6.99992C0.333313 10.6799 3.31998 13.6666 6.99998 13.6666C10.68 13.6666 13.6666 10.6799 13.6666 6.99992C13.6666 3.31992 10.68 0.333252 6.99998 0.333252ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93992 1.66665 6.99992C1.66665 4.05992 4.05998 1.66659 6.99998 1.66659C9.93998 1.66659 12.3333 4.05992 12.3333 6.99992C12.3333 9.93992 9.93998 12.3333 6.99998 12.3333Z" fill="#9873FF"/>
    </svg>`;
    addContact.append(addContactSpan);
    addContact.insertAdjacentHTML('afterbegin', addContactIcon);
    addContact.classList.add('flex')
    addContact.classList.add('btn-reset')
    addContact.classList.add('add-input-addbutton')



    const saveBtn = document.createElement('button')
    const saveText = document.createElement('span')
    saveText.textContent = `Сохранить`
    saveBtn.append(saveText)
    saveBtn.classList.add('add-input-savebutton')
    saveBtn.classList.add('btn-reset')
    saveBtn.insertAdjacentHTML('afterbegin', `<span class="spinner spinner-save-btn" style="display: none;"></span>`)


    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = `Отмена`
    cancelBtn.classList.add('add-input-cancelbutton')
    cancelBtn.classList.add('btn-reset')

    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = `<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2332 7.73333L21.2665 6.76666L14.4998 13.5334L7.73318 6.7667L6.76652 7.73336L13.5332 14.5L6.76654 21.2667L7.73321 22.2333L14.4998 15.4667L21.2665 22.2334L22.2332 21.2667L15.4665 14.5L22.2332 7.73333Z" fill="#B0B0B0"/>
    </svg>`
    closeBtn.classList.add('add-input-closebutton')
    closeBtn.classList.add('btn-reset')

    for (let i of [h2, necessarilyLabelSurname, necessarilyLabelName,  inputLastName, addContact, saveBtn, cancelBtn , closeBtn]) {
        form.append(i)
    }

    formWrapper.append(form)
    document.body.append(formWrapper)
    return {
        modalWindow:formWrapper,
        form:form,
        title:h2, 
        surname:inputSurname, name:inputName, 
        lastname:inputLastName, 
        add:addContact, save:saveBtn, 
        cancel:cancelBtn , 
        close:closeBtn,
    }
}

export function initInputDropdown(list, def = "Телефон", btnAddContact){
    const inputWrapper = document.createElement('div')
    inputWrapper.classList.add('flex')
    inputWrapper.classList.add('input-wrapper')
    inputWrapper.classList.add('data-for-server')

    const input = document.createElement('input')
    input.classList.add('contact-input')
    if (def === "Телефон"){
        input.setAttribute('type', 'tel')
    } else {
        input.setAttribute('type', 'text')
    }
    input.setAttribute('placeholder', 'Введите данные контакта')
    toogleEvent(input, true)
    input.addEventListener('focus', ()=>{
        input.classList.remove('input-error')
    })

    const dropdownMenu = document.createElement('div')
    dropdownMenu.classList.add('drop-wrapper')

    const btnMenu = document.createElement('button')
    btnMenu.classList.add('flex')
    btnMenu.classList.add('input-selector')
    const textButton = document.createElement('span')
    textButton.textContent = def
    textButton.classList.add('name-form')
    btnMenu.append(textButton)
    btnMenu.insertAdjacentHTML('beforeend',`<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.495029 0.689972C0.250029 0.934972 0.250029 1.32997 0.495029 1.57497L4.65003 5.72997C4.84503 5.92497 5.16003 5.92497 5.35503 5.72997L9.51003 1.57497C9.75503 1.32997 9.75503 0.934971 9.51003 0.689972C9.26503 0.444971 8.87003 0.444971 8.62503 0.689972L5.00003 4.30997L1.37503 0.684973C1.13503 0.444972 0.735029 0.444972 0.495029 0.689972Z" fill="#9873FF"/>
    </svg>`)

    btnMenu.addEventListener('click', (e)=>{
        e.menu = true
        ul.classList.remove('hidden-dropdown-menu--up')
        ul.classList.toggle('hidden-dropdown-menu--open')
        btnMenu.classList.toggle('input-selector--active')
        const observer = new IntersectionObserver((entries, observer)=>{
            if(entries[0].isIntersecting){
                entries[0].target.classList.remove('hidden-dropdown-menu--up')
            } else {
                entries[0].target.classList.add('hidden-dropdown-menu--up')
            }
            observer.disconnect()
        }, {threshold:0.99});
        observer.observe(ul)
    })


    const ul = document.createElement('ul')
    ul.classList.add('hidden-dropdown-menu')
    const typeContacts = list
    for (let i = 0; i<5; i++){
        const li = document.createElement('li')
        li.classList.add('item-contact')
        li.textContent = typeContacts[i]
        li.addEventListener('click', ()=>{
            textButton.textContent = li.textContent
            if (textButton.textContent === 'Телефон'){
                input.setAttribute('type', 'tel')
                toogleEvent(input, true)
            } else {
                input.setAttribute('type', 'text')
                toogleEvent(input, false)
            }
            input.value = ''
            ul.classList.remove('hidden-dropdown-menu--open')
            btnMenu.classList.remove('input-selector--active')
        })
        ul.append(li)
    }


    window.addEventListener('wheel', ()=>{
        ul.classList.remove('hidden-dropdown-menu--open')
        btnMenu.classList.remove('input-selector--active')
    })

    dropdownMenu.append(btnMenu)
    dropdownMenu.append(ul)

    const btnClose = document.createElement('button')
    btnClose.innerHTML= `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/>
    </svg>`
    btnClose.classList.add('input-contact-close')
    btnClose.addEventListener('click', ()=>{
        let count = Number(btnAddContact.getAttribute('data-count-contacts'))
        count--
        if (count<10){
            btnAddContact.removeAttribute('style')
        }
        btnAddContact.setAttribute('data-count-contacts', `${count}`)
        inputWrapper.remove()
    })

    inputWrapper.append(dropdownMenu)
    inputWrapper.append(input)
    inputWrapper.append(btnClose)

    

    return inputWrapper
}
