module.exports = app =>{
    const {existOrError,validId} = app.api.validation

    const save = (req,res)=>{
        const article = {...req.body}
        if(req.params.id) article.id = req.params.id

        try {
            existOrError(article.name,"Nome não informado")
            existOrError(article.description,"Descrição não informado")
            existOrError(article.categoryId,"Categoria não informado")
            existOrError(article.userId,"Autor não informado")
            existOrError(article.content,"Sem conteúdo")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(article.id){
            app.db('articles')
            .update(article)
            .where({id:article.id})
            .then(_=>res.status(204))
            .catch(err=>res.status(500).send(err))
        }else{
            app.db('articles')
            .insert(article)
            .then(_=>res.status(201))
            .catch(err=>res.status(500).send(err))
        }
    }

    const remove = async (req,res)=>{
        try{
            validId(req.params.id,"ID invalido")
            const rowsDeleted = await app.db('articles')
                                        .where({id:req.params.id})
                                        .del()
            
            try {
                existOrError(rowsDeleted,'Artigo não encontrado')
            } catch (msg) {
                return res.status(400).send(msg) 
            }

            res.status(204).send()
        }catch(msg){
            return res.status(500).send(msg)
        }
    }

    const limit = 10

    const get = async (req,res)=>{
        const page = req.query.page || 1

        const result = await app.db('articles')
                                .count('id')
                                .first()

        const count = parseInt(result.count)
        
        app.db('articles')
            .select('id','name','description')
            .limit(limit).offset(page*limit-limit)
            .then(articles=>res.json({data:articles,count,limit}))
            .catch(err=>res.status(500).send(err))
    }

    const getById = async (req,res)=>{
        try {
            validId(req.params.id,"ID invalido")

            const existId = await app.db('articles')
                                    .where({id:req.params.id})
                                    .first()

            existOrError(existId,"Usuário inexistente inexistente")
        } catch (msg) {
            return res.status(400).send(msg)
        }
        await app.db('articles')
            .where({id:req.params.id})
            .first()
            .then(article=>{
                article.content = article.content.toString()

                return res.json(article)
            })
            .catch(err=>res.status(500).send(err))
    }

    return {save,remove,get,getById}
}