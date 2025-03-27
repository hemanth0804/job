import { data } from "react-router-dom";
export const BASEURL="http://localhost:8081/";

export function callApi(reqmethod, URL, data, responseHandler)
{
    var option;
    if (reqmethod === "GET" || reqmethod === "DELETE")
        option = { method: reqmethod, headers: { 'Content-type': 'application/json' } };
    else
        option = { method: reqmethod, headers: { 'Content-type': 'application/json' }, body: data };
    fetch(URL, option)
        .then(response => {
            if (!response.ok)
                throw new Error(response.status + " " + response.statusText);
            return response.text();
        })
        .then(data => responseHandler(data))
        .catch(error => alert(error));
}
export function setSession(sesname, sesvalue, expday){
    let D = new Date();
    D.setTime(D.getTime() + expday * 86400000);
    document.cookie = `${sesname}=${sesvalue};expires=${D.toUTCString()};path=/;secure`;
}
export function getSession(sesname){
    let decodedCookie=decodeURIComponent(document.cookie);
    let cookieData=decodedCookie.split(";");
    for(let x in cookieData)
        if(cookieData[x].includes(sesname))
            return cookieData[x].substring(cookieData[x].indexOf(sesname)+ sesname.length + 1);
        return"";
}