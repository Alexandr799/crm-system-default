import {renderSplachScreen, renderBodyTable, renderAddWindow, initInputDropdown, renderDeleteWindow, cleanData, renderHeaderTable} from './render.js' 
import {getServerClient, pushNewClientInServer,  validateValue, deleteClientInServer,  getClientById, patchClient,serchClient} from './serverAPIfunction.js' 

window.addEventListener('offline', ()=>{
    document.querySelector('.internet-disconnect').classList.add('internet-disconnect--open')
})

window.addEventListener('online', ()=>{
    document.querySelector('.internet-disconnect').classList.remove('internet-disconnect--open')
    const warningsInDom = document.querySelectorAll('.warning-internet')
    if (warningsInDom){
        for (let i of warningsInDom) {
            i.remove()
        }
    }
})

const workSectionContainer = document.querySelector('.work-section__container')
let table
let tbody
const spinnerHead = document.querySelector('.spinner-head')
const addBnt = document.querySelector('.work-section__btn')
const headerInput = document.querySelector(`.header__input`)
let currentClientsList


function fillInputs(elem, data){
    elem.querySelector(`.add-input-field[name="surname"]`).value = data.surname
    elem.querySelector(`.add-input-field[name="name"]`).value = data.name
    elem.querySelector(`.add-input-field[name="lastName"]`).value = data.lastName
    elem.querySelectorAll('.necessarily-label').forEach(el=>{
        el.classList.remove('necessarily-label--surname')
        el.classList.remove('necessarily-label--name')
    })
    const addBtn =  document.querySelector('.add-input-addbutton')
    if (data.contacts.length === 0) return
    for (let i of data.contacts){
        if (i.value === '') return 
        const contact = initInputDropdown(["Телефон", "Vk", "Facebook", "E-mail", "Twitter", "Telegram", "WhatsApp" ], i.type, addBtn)
        elem.append(contact)
        contact.querySelector('input').value = i.value
    }
    addBtn.setAttribute('data-count-contacts',`${data.contacts.length}`)
}

function redirectedHead(){
    const href = window.location.href.split('/?')[0]
    history.pushState(null, '', href)
}

async function updateData(){
    if (table){
        document.querySelector('.work-section__table').remove()
    }
    table = renderHeaderTable()
    workSectionContainer.insertAdjacentHTML('beforeend', table)
    tbody = document.querySelector('.table__body')
    if (document.querySelector('.work-section__splash')){
        document.querySelector('.work-section__splash').remove()
    }
    spinnerHead.style.display = 'block'
    const splash = renderSplachScreen()
    workSectionContainer.append(splash)

    let getServerFunc 
    if (headerInput.value === ''){
        getServerFunc = getServerClient
    } else {
        getServerFunc = serchClient
    }

    currentClientsList = await getServerFunc(headerInput.value)
    .then(res=>{
        if (res.length === 0) return
        const data = cleanData(res)
        tbody.innerHTML = ''
        renderBodyTable(data, tbody, (a,b)=>{return a.id - b.id})
        splash.remove()
        return data
    })
    .catch(err=>{
        if (err.type === 'server-contect'){
            console.log(`При работе с сервером возникла ошибка ${err.number}`)
            if(err.number === 500){
                splash.textContent = 'Упс, кажется что-то пошло не плану, обновите страницу'
            } else {
                splash.textContent = 'Не верный запрос на сервер, вы что-то не то спрашиваете'
            }
        } else {
            throw new Error(err)
        }
    })
    .finally(()=>{
        spinnerHead.style.display = 'none'
    })

    if(!document.querySelectorAll('.btn-del')) return

    for (let i of document.querySelectorAll('.btn-del')){
        i.addEventListener('click', ()=>{
            const delWindow = renderDeleteWindow()

            function closeModal(){
                delWindow.modalWrapper.remove()
                document.body.classList.remove('stop-scroll')
            }

            delWindow.cancelBtn.addEventListener('click', closeModal)
            delWindow.closeBtn.addEventListener('click', closeModal)

            delWindow.delBtn.addEventListener('click', async ()=>{
                if (document.querySelector(`.warning`)) document.querySelector(`.warning`).remove()
                delWindow.delBtn.querySelector(`.spinner-save-btn`).style.display = 'block'
                await (async ()=>{
                    delWindow.cancelBtn.removeEventListener('click', closeModal)
                    delWindow.closeBtn.removeEventListener('click', closeModal)
                    await deleteClientInServer(i.getAttribute('data-id'))
                    await updateData()
                    delWindow.modalWrapper.remove()
                    document.body.classList.remove('stop-scroll')
                })()
                .then(res=>{return res})
                .catch(err=>{
                    delWindow.cancelBtn.addEventListener('click', closeModal)
                    delWindow.closeBtn.addEventListener('click', closeModal)
                    if (err.message === 'Ошибка: Ошибка на сервере, попробуйте зайти позже или перезагрузить страницу :('){
                        const warning = document.createElement('span')
                        warning.textContent = err.message
                        warning.classList.add('warning')
                        delWindow.form.append(warning)
                    } else {
                        throw new Error(err)
                    }
                })
                .finally( async ()=>{
                    delWindow.delBtn.querySelector(`.spinner-save-btn`).style.display = 'none'
                })
            })
        })
    }

    for (let i of document.querySelectorAll(`.btn-edit`)){
        i.addEventListener('click', async (e)=>{
            e.preventDefault()
            const href = i.href
            history.pushState(null, '', href)
            const data = await getClientById(i.getAttribute(`data-id`))
            initCartClient(patchClient, data.id, `Изменить клиента`, false)
            fillInputs(document.querySelector('.add-client-form'), data)
        })
    }

    for (let i of document.querySelectorAll('.sort-btn')){
        i.addEventListener('click', ()=>{
            i.classList.toggle(`sort-btn--up`)
            
            if (typeof currentClientsList[0][i.getAttribute('data-type')] === 'string'){
                if (i.classList.contains('sort-btn--up')) {
                    i.querySelector('span').textContent = 'A-Я'
                } else {
                    i.querySelector('span').textContent = 'Я-A'
                }
            }
            
            if (i.classList.contains('sort-btn--up')) {
                tbody.innerHTML = ''
                renderBodyTable(currentClientsList, tbody, (a,b)=>{
                    if (a[i.getAttribute('data-type')] < b[i.getAttribute('data-type')] )
                    return -1
                })
            } else {
                tbody.innerHTML = ''
                renderBodyTable(currentClientsList, tbody, (a,b)=>{
                    if (b[i.getAttribute('data-type')] < a[i.getAttribute('data-type')] )
                    return -1
                })
            }
        })
    }

}

function initCartClient(serverFunc, argsfunc=null, h2Name=`Новый клиент`, del=true){
    const modal = renderAddWindow(h2Name)

    function closeModal(){
        document.body.classList.remove('stop-scroll')
        modal.modalWindow.remove()
        redirectedHead()
    }

    modal.add.setAttribute('data-count-contacts', `0`)
    modal.close.addEventListener('click',closeModal)
    modal.cancel.addEventListener('click',closeModal)

    modal.add.addEventListener('click', ()=>{
        const contact = initInputDropdown(["Телефон", "Vk", "Facebook", "E-mail", "Twitter", "Telegram", "WhatsApp" ], 'Телефон', modal.add)
        modal.form.append(contact)
        modal.add.setAttribute('data-count-contacts', `${Number(modal.add.getAttribute('data-count-contacts'))+1}`)
        if (Number(modal.add.getAttribute('data-count-contacts')) === 10){
            modal.add.style.display = 'none'
        }
    })
    
    modal.save.addEventListener('click', async ()=>{
        document.body.classList.remove('stop-scroll')
        const warningSpans = document.querySelectorAll('.warning')
        if (warningSpans) {
            for (let i of warningSpans){
                i.remove()
            }
        }
        await (async ()=>{
            modal.save.querySelector('.spinner-save-btn').style.display = 'block'
            const validatedCleanData = validateValue(document.querySelectorAll('.data-for-server'), del)
            modal.close.removeEventListener('click',closeModal)
            modal.cancel.removeEventListener('click',closeModal)
            modal.form.querySelectorAll(`input`).forEach(el=>{el.setAttribute(`disabled`, `disabled`)})
            const res = argsfunc? await serverFunc(validatedCleanData, argsfunc):await serverFunc(validatedCleanData)
            await updateData()
            document.body.classList.remove('stop-scroll')
            modal.modalWindow.remove()
            redirectedHead()
        })().catch(err=>{
            modal.close.addEventListener('click',closeModal)
            modal.cancel.addEventListener('click',closeModal)
            modal.form.querySelectorAll(`input`).forEach(el=>{el.removeAttribute(`disabled`)})
            if (err.type === 'validatedError'){
                for (let i of err.list){
                    i.elem.classList.add('input-error')
                    const warning = document.createElement('span')
                    warning.textContent = `Ошибка: ${i.message}`
                    warning.classList.add('warning')
                    modal.form.append(warning)
                }
            } else if(err.type === 'serverError'){
                if (err.status > 499 || err.status < 400){
                    const warning = document.createElement('span')
                    warning.textContent = 'Ошибка: На сервере ошибка, попробуйте выполнить операцию позже'
                    warning.classList.add('warning')
                    modal.form.append(warning)
                } else if (err.status < 500 || err.status > 399){
                    const warning = document.createElement('span')
                    warning.textContent = 'Ошибка: Что то пошло не так на стороне клиента... Может стоит обновить страницу и выполнить операцию заново'
                    warning.classList.add('warning')
                    modal.form.append(warning)
                }
            } else if(err.message === 'Failed to fetch' && err.name === 'TypeError') {
                const warning = document.createElement('span')
                warning.textContent = 'Ошибка: Кажется проблемы с интернет соединением, не удалось создать клиента'
                warning.classList.add('warning')
                warning.classList.add('warning-internet')
                modal.form.append(warning)
            } else {
                throw new Error(err)
            }
        })
        .finally(()=>{
            modal.save.querySelector('.spinner-save-btn').style.display = 'none'
        })
    })
}

window.addEventListener('DOMContentLoaded', async ()=>{
    await updateData()
    const url = window.location.search.replace('?id=','')
    if (!url) return 
    const links = document.querySelectorAll('.btn-edit')
    if (links){
        let have = false
        for (let i of links){
            if (i.getAttribute('data-id') === url ){
                i.click()
                have = true
                break
            }
        }
        if (!have){
            redirectedHead()
        }
    } else {
        redirectedHead()
    }
})

addBnt.addEventListener('click', ()=>{
    initCartClient(pushNewClientInServer)
})

let searchGet
headerInput.addEventListener('input', (e)=>{
    const input = e.currentTarget.value
    clearTimeout(searchGet)
    searchGet =  setTimeout( async ()=>{
        await updateData()
    },  300)
})


