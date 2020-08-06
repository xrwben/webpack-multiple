import "./reset.less";

export let getNetType = function () {
    var type
    if (navigator.userAgent.indexOf('NetType') > 0) {
        type = navigator.userAgent.split('NetType/')[1].split(' ')[0]
    } else {
        type = '-1'
    }
    return type
}

export function isOffline () {
    if (!navigator.onLine) {
        layer.open({
            content: '网络不给力',
            skin: 'msg',
            time: 3
        })
        return true
    } else {
        return false
    }
}

export default {
	getNetType,
	isOffline
}