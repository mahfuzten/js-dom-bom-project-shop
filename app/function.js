
const setAlert = ( msg, type = 'danger') => {
    return `<p class = "alert alert-${type} d-flex justify-content-between">${ msg }
    <button type="button"  class="btn-close" data-bs-dismiss="alert"></button></p>`;
}


const readLSData = (key) =>{

    if(localStorage.getItem(key)){
       return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}

const createLSData = (key, value) =>{


    let Data = [];

    if(localStorage.getItem(key)){
        Data= JSON.parse(localStorage.getItem(key));
    }
    Data.push(value);
    localStorage.setItem(key, JSON.stringify(Data));

}
