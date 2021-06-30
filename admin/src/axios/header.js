import $md5 from 'js-md5'

//设置请求头签名
export function getHeader(url, code) {
    let timestamp = new Date() * 1
    let token = sessionStorage.getItem('user_token') === null ? '' : sessionStorage.getItem('user_token')
    let soure = 'web'
    let sign = $md5(soure + timestamp + token + code + url)
    return {
        'timestamp': timestamp,
        'token': token,
        'soure': soure,
        'sign': sign,
        'code': code
    }
}