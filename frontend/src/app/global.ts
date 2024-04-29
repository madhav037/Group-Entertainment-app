var userInfo:object = {};

export function setUserInfo(data:any) {    
    userInfo = data;
}

export function getUserInfo(){
    return userInfo;
}