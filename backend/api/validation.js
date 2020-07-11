module.exports = app =>{
    existOrError = (value,msg) =>{
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    notExistsOrError = (value,msg) =>{
        try{
            existOrError(value,msg)
        }catch(msg){
            return
        }
        throw msg
    }
    
    equalsOrError = (a,b,msg) =>{
        if(a!==b) throw msg
    }
    
    validEmail = (value,msg)=>{
        const defRegex = /^[a-z0-9\.\-\_]+\@[a-z]+(.com.br|.com)$/i
    
        let validValue = defRegex.exec(value)
        
        if(!validValue) throw msg
    }
    
    validPassword = (value,msg)=>{
        const defRegex = /^[a-z0-9]{8,15}$/i
    
        let validPass = defRegex.exec(value)
    
        if(!validPass) throw msg
    }

    return {
                existOrError,
                notExistsOrError,
                equalsOrError,
                validEmail,
                validPassword
        }
}