const {validationResult} =require("express-validator")
const CategoryModel = require("../../models/Category")
class Category {

    async create(req,res){
        const {name} = req.body;
            const errors = validationResult(req);
            if(errors.isEmpty()){
                try{
            
                const exist = await CategoryModel.findOne({name});
                if(!exist){
                    const addCategory= await CategoryModel.create({name})
                    return res.status(201).send({message:'Your category has created successfully', data:addCategory})
                }else {
                    return res.status(400).send({errors:[{msg:`${name} is already exits`}]})
                }
                }catch(error){
                    console.log(error)
                    return res.status(500).send(`Internal server error${error}`)
                }
            } else {
                return res.status(400).send({errors:errors.array()})
            }
    }

    async categories(req,res){
            const page = req.params.page;
            const parPage =3;
            const skip = (page -1) * parPage
            try{
                const count = await CategoryModel.find({}).countDocuments()
                const categoryData =await CategoryModel.find({}).skip(skip).limit(parPage).sort({updatedAt:-1})
                 return res.status(200).send({categories:categoryData,parPage,count})
            }catch(error){
                return res.status(500).send(`internal server error${error.message}`)
            }
    }
    async FetchCategory(req,res){
        const {id}= req.params;
        try{
            const response =await CategoryModel.findOne({_id:id})
            return res.status(200).send({category:response})
        }catch(error){
            return res.status(500).send({errors:`error internal server error ${error.message}`})
        }

    }
    async UpdateCategory(req, res){
        const {id}= req.params;
        const {name}= req.body;
        const errors = validationResult(req);
        if(errors.isEmpty()){
            try{
                const existCategoryName = await CategoryModel.findOne({name})
                if(!existCategoryName){
                        const updateCategory = await CategoryModel.updateOne({_id:id}, {$set:{name}},{new:true})
                        return res.status(201).send({message:'Your category has update successfully', data:updateCategory})
                    }else{
                    return res.status(400).send({errors: [{msg:`${name} is already exists`}]})
                }
            }catch(error){

            }
        }else {
            return res.status(400).send({errors:errors.array()})
        }
    }
    async DeleteCategory(req, res){
        const {id} = req.params;
        if(id){
            try{
                await CategoryModel.deleteOne({_id:id})
                return res.status(200).send({deleteCategory:"Delete category successfully done"})
            }catch(error){
                return res.status(500).send(`internal server error ${error.message}`)
            }  
        }else {
            return res.status(500).send(`internal server error ${id} is not found`)
        }
         
    }
    async allCategories(req, res){
        try{
            const categories = await CategoryModel.find({})
            return res.status(200).send({categories})
        }catch(error){
            return res.status(500).send(`internal server error ${error.message} `)
        }
    }

    async randomCategory(req, res){
        try{
            const categories = await CategoryModel.aggregate([
                {$sample:{size:3}}
            ])
            return res.status(200).send({categories})
        }catch(error){
            return res.status(500).send("Internal server error")
        }
    }
}

module.exports = new Category