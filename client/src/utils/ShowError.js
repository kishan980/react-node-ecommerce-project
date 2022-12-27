export const showError = (errors, name) =>{
    const exist = errors.find(err => err.param === name);
    console.log("🚀 ~ file: ShowError.js:3 ~ showError ~ exist", exist)
    if(exist){
        return exist.msg
    }else {
        return false
    }
}