function includesRusSymbols(str){
    const rus = 'абвгдежзийклмнопрстуфхцчшщъыьэю'
    let answer = false
    for (let i of str){
        if (rus.includes(i.toLowerCase())){
            answer = true
            break
        }
    }
    return answer

}

function parseInput(client){
    const info = {}
    for (let i of Array.from(client)){
        if (i.hasAttribute('data-std-input')){
            info[i.getAttribute('name')] = {value: i.value.trim(), elem:i}
        } else {
            if (!info.contacts){
                info.contacts = []
            }
            info.contacts.push({
                type:i.querySelector('.name-form').textContent,
                value: i.querySelector('.name-form').textContent==='Телефон'? telNormalize(i.querySelector('.contact-input').value):i.querySelector('.contact-input').value.trim(),
                elem:i.querySelector('.contact-input')
            })
        }
    }
    return info
}

function telNormalize(tel){
    while (tel.includes(' ') || tel.includes('-')){
        tel = tel.replace(' ', '')
        tel = tel.replace('-', '')
    }
    tel = tel.replace('(', '')
    tel = tel.replace(')', '')
    return tel
}

export function getServerClient(){
    const res = fetch('http://localhost:3000/api/clients')
    .then(data=>{
        if (data.status < 200 || data.status > 201){
            const err = new Error('C сервера пришла ошибка')
            err.number = data.status
            err.type = 'server-contect'
            throw err
        }
        return  data.json()
    }).then(data=>{
        return data
    })
    return res
}

export function getClientById(id){
    const res = fetch(`http://localhost:3000/api/clients/${id}`)
    .then(data=>{
        if (data.status < 200 || data.status > 201){
            const err = new Error('C сервера пришла ошибка')
            err.number = data.status
            err.type = 'server-contect'
            throw err
        }
        return  data.json()
    }).then(data=>{
        return data
    })
    return res
}

export function validateValue(client, deleteInputValue = true){
    const errorList = []
    const data = parseInput(client)
    const cleanData ={}

    if (data.name.value === ''){
        errorList.push({
            message:'Имя должно содержать хотя бы один знак',
            elem:data.name.elem
        })
    } else {
        cleanData.name = data.name.value
    }

    if (data.surname.value === ''){
        errorList.push({
            message:'Фамилия должно содержать хотя бы один знак',
            elem:data.surname.elem
        })
    } else {
        cleanData.surname = data.surname.value
    }
    
    if (data.lastName){
        cleanData.lastName = data.lastName.value
    }

    cleanData.contacts = []

    if (data.contacts){
        for (let i of data.contacts){

            if (i.type ==='Телефон'){
                if (i.value.length < 12){
                    errorList.push({
                        message:'В телефонном номере должно быть минимум 10 цифр не считая кода страны',
                        elem:i.elem
                    })
                } else {
                    cleanData.contacts.push({
                        type:i.type,
                        value:i.value
                    })
                }
            }

            if (i.type ==='Facebook' || i.type ==='Twitter' ||  i.type ==='Vk' ){
                if (i.value.length === 0 || includesRusSymbols(i.value)){
                    errorList.push({
                        message:'Ссылка на социальную сеть должна иметь хотя бы один символ и не содержать кириллицу',
                        elem:i.elem
                    })
                } else {
                    cleanData.contacts.push({
                        type:i.type,
                        value:i.value
                    })
                }
            }


            if (i.type ==='E-mail'){
                if (i.value.length < 6 || !i.value.includes('@') || includesRusSymbols(i.value) || !i.value.includes('.')){
                    errorList.push({
                        message:`Электронная почта должна иметь знаки '.' и '@' а также  не содержать кириллицу`,
                        elem:i.elem
                    })
                } else {
                    cleanData.contacts.push({
                        type:i.type,
                        value:i.value
                    })
                }
            }
        }
    }

    if(errorList.length > 0) {
        const error = new Error('Ошибка валидации перед отправкой на сервер')
        error.list = errorList
        error.type = 'validatedError'
        throw error
    } else if (deleteInputValue) {
        for (let i of Object.keys(data)){
            if (i === 'contacts'){
                for (let j of Object.keys(data[i])){
                    data[i][j].elem.value = ''
                }
            } else {
                data[i].elem.value = ''
            }
        }
    }
    return cleanData
}

export async function deleteClientInServer(id){
    try {
        const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
            method:'DELETE'
        })
        if (res.status === 500){
            throw new Error('Ошибка на сервере, попробуйте зайти позже или перезагрузить страницу :(')
        }
        return res
    } catch (err){
        console.log(err.message, err.name)
    }
}

export async function pushNewClientInServer(client, id){
    const res = await fetch('http://localhost:3000/api/clients', {
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(client)
    })
    if (res.status < 200 || res.status > 201 ){
        const err = new Error('Не получилось создать клиента')
        err.type = 'serverError'
        err.status = res.status
    }
    return res
}

export async function patchClient(client, id){
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method:'PATCH',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(client)
    })
    if (res.status < 200 || res.status > 201 ){
        const err = new Error('Не получилось создать клиента')
        err.type = 'serverError'
        err.status = res.status
    }
    return res
}

export async function serchClient(str){
    const res = await fetch(`http://localhost:3000/api/clients?search=${str}`)
    .then(data=>{
        if (data.status < 200 || data.status > 201){
            const err = new Error('C сервера пришла ошибка')
            err.number = data.status
            err.type = 'server-contect'
            throw err
        }
        return  data.json()
    }).then(data=>{
        return data
    })
    return res
}



