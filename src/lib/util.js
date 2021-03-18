export const replaceSpaces = (str) => {
    str = str.replace(/(\.|,|\/|-|\||\|)/g, "")
    str = str.replace(/(\s\s)/g, "-")
    return str.replace(/\s/g, "-") 
}

export const tryFn = (fn, fallback='') => {
    try {
        return fn()
    }catch(e){
        return fallback
    }
}

export const nameToPermalink = (name) => {
    return replaceSpaces(name.toLowerCase()) 
}
