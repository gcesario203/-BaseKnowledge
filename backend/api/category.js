module.exports = app =>{
    const {existOrError, notExistsOrError, negative} = app.api.validation

    const save = (req,res)=>{
        const category = {...req.body}
        if(req.params.id) category.id = req.params.id

        try {
            existOrError(category.name,"Nome não informado")
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(category.id){
            app.db('categories')
            .update(category)
            .where({id:category.id})
            .then(_=>res.status(202))
            .catch(err=>res.status(500).send(err))
        }else{
            app.db('categories')
            .insert(category)
            .then(_=>res.status(201))
            .catch(err=>res.status(500).send(err))
        }
    }

    const remove = async (req,res)=>{
        try {
            negative(req.params.id,"Não usar número negativos")
            existOrError(req.params.id,"Código da categoria não informado")

            const subcategory = await app.db('categories')
                .where({parentId:req.params.id})

            notExistsOrError(subcategory, "Categoria possui subcategorias")

            const articles = await app.db('articles')
                .where({categoryId:req.params.id})

            notExistsOrError(articles,"A categoria possui artigos")

            const rowsDelete = await app.db('categories')
                .where({id:req.params.id}).del()

            existOrError(rowsDelete,"Categoria não foi encontrada")

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = categories =>{
        const getParent = (categories, parentId)=>{
            const parent = categories.filter(item =>item.id === parentId)

            return parent.length? parent[0] : null
        }

        const categoriesWithPath = categories.map(cat=>{
            let path = cat.name
            let parent = getParent(categories,cat.parentId)

            while(parent){
                path = `${parent.name} > ${path}`
                parent = getParent(categories,parent.parentId)
            }

            return {...cat,path}
        })

        categoriesWithPath.sort((a,b)=>a.path>b.path?1:a.path<b.path?-1:0)

        return categoriesWithPath
    }

    const get = (req,res)=>{
        app.db('categories')
        .then(categories =>res.json(withPath(categories)))
        .catch(err=>res.status(500).send(err))
    }

    const getById = (req,res)=>{
        app.db('categories')
        .where({id:req.params.id})
        .first()
        .then(category=>res.json(category))
        .catch(err=>res.status(500).send(err))
    }

    return {save,remove,get,getById}
}