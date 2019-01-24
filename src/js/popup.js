import "../css/popup.css";

let login, isLogin, getUser, sendToTL, getCurrentTabUrl, logout
const loginForm = document.querySelector('#loginForm')
const loginBtn = document.querySelector('#loginButton')
const sendUrl = document.querySelector('#sendUrl')
const sendBtn = document.querySelector('#sendToTimeline')
const logoutBtn = document.querySelector('#logoutButton')
const username = document.querySelector('#username')
const sendedMessage = document.querySelector('#sendedMessage')
window.onload = init
async function init() {
    const bg = await new Promise(
            resolve => chrome.runtime.getBackgroundPage(resolve)
        )
    login = bg.login
    isLogin = bg.isLogin
    getUser = bg.getUser
    sendToTL = bg.sendToTL
    getCurrentTabUrl = bg.getCurrentTabUrl
    logout = bg.logout
    await updateView()
}
async function updateView() {
    const loggedIn = await isLogin()
    loginForm.style.display = loggedIn ? 'none' : 'flex'
    sendBtn.style.display = loggedIn ? 'block' : 'none'
    sendUrl.style.display = loggedIn ? 'block' : 'none'
    logoutBtn.style.display = loggedIn ? 'block' : 'none'
    username.textContent = loggedIn ? (await getUser()).name : ''
    sendUrl.value = await getCurrentTabUrl()
}

loginForm.onsubmit = function() {
    return false
}
loginBtn.onclick = async function () {
    const spaceName = document.querySelector('input[name="spaceName"]').value
    const email = document.querySelector('input[name="email"]').value
    const password = document.querySelector('input[name="password"]').value
    const success = await login(email, password, spaceName)
    await updateView()
    if (!success) {
        username.textContent = 'login failed'
    }
}
sendBtn.onclick = async function () {
    sendBtn.disabled = true
    await sendToTL(sendUrl.value)
    sendedMessage.textContent = await sendToTL(sendUrl.value) ? 'Success!!' : 'Failed...'
    sendBtn.disabled = false
}
logoutBtn.onclick = async function () {
    await logout()
    await updateView()
}