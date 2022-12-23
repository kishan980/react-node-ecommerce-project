const formidable = require("formidable");
const {v4 : uuidv4} =require("uuid")
const fs = require("fs")
const path = require("path")
const ProductSchema = require("../../models/Product")
const { validationResult} = require("express-validator")

class product  {
  async create(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parseData = JSON.parse(fields.data);
        const errors = [];

        if (parseData.title.trim().length === 0) {
          errors.push({ msg: "Title is required!" });
        }
        if (parseInt(parseData.price) < 1) {
          errors.push({ msg: "Price is required!" });
        }
        if (parseInt(parseData.discount) < 0) {
          errors.push({ msg: "Discount should be not be negative" });
        }
        if (parseInt(parseData.stock) < 20) {
          errors.push({ msg: "stock should be above 20" });
        }
        if (parseData.category.trim().length === 0) {
          errors.push({ msg: "Category is required!" });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ msg: "Description is required!" });
        }
        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ msg: "Image1 is required" });
          }
          if (!files["image2"]) {
            errors.push({ msg: "Image2 is required" });
          }
          if (!files["image3"]) {
            errors.push({ msg: "Image3 is required" });
          }
          if (errors.length === 0) {
            const images={}
            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimeType = files[`image${i + 1}`].mimetype;
              const extension = mimeType.split("/")[1].toLowerCase();
              if (
                extension === "jpeg" ||
                extension === "jpg" ||
                extension === "png"
              ) {
                
                const imageName = uuidv4()+`.${extension}`;
                const __dirname =path.resolve()
                const newPath = __dirname+ `/../client/public/images/${imageName}`;
                images[`image${i+1}`]= imageName;
                fs.copyFile(files[`image${i+1}`].filepath, newPath, (err)=>{
                    if(!err){
                        console.log("image uploaded")
                    }
                })
              } else {
               
                const error = {};
                error['msg'] = `image${
                  i + 1
                }has invalid ${extension} type!`;
                errors.push(error);
              }
            }
            if (errors.length === 0) {
              try{
                  const response = await ProductSchema.create({
                    title: parseData.title,
                    price: parseInt(parseData.price),
                    stock:parseInt(parseData.stock),
                    discount:parseInt(parseData.discount),
                    category:parseData.category,
                    colors: parseData.colors,
                    sizes:JSON.parse(fields.sizes),
                    image1:images['image1'],
                    image2:images['image2'],
                    image3:images['image3'],
                    description:fields.description
                  })
                
                  return res.status(201).send({msg:'Product has created',  response})
                }catch(error){
                  return res.status(500).send({msg:`internal server error ${error}`})
                }
            } else{
                return res.status(400).send({ errors });

            }
          } else {
            return res.status(400).send({ errors });
          }
        } else {
          return res.status(400).send({ errors });
        }
      }
    });
  }

  async get(req, res) {         
    const {page} = req.params;            //1                2                3              4
    const parPage =5;                     //5                5                5              5 
    const skip = (page-1)* parPage;       // 1-1 =0 *5 =5    2-1=1*5 =5       3-1=2*5=10       4-1=3*5=15
    try{
      const count = await ProductSchema.find({}).countDocuments();
      const response = await ProductSchema.find({}).skip(skip).limit(parPage).sort({updatedAt:-1})
      return res.status(200).send({products:response,parPage,count})
    }catch(error){
        return res.status(500).send(`internal server error${error.message}`)
    }
  }
 

  async getProduct(req, res){
    const {id} = req.params;
    try{
      const product = await ProductSchema.findOne({_id:id}).select(['-image1','-image2','-image3'])
      return res.status(200).send(product)
    }catch(error){
      return res.status(500).send(`internal server error${error.message}`)
    }
  }

  async updateProduct(req, res){
      const error = validationResult(req)
      if(error.isEmpty()){
        try{
          const {title,price,stock,discount, description,sizes,colors,category,_id} = req.body
          const response = await ProductSchema.updateOne({_id},{$set:{title,price,stock,discount, description,sizes,colors,category}})
        return res.status(200).send({msg:"product has updated",response})
          
        }catch(error){
          console.log(error)
        return res.status(500).send({errors: error})

        }
      }else {
        return res.status(400).send({errors: error.array()})
      }
  }
  async deleteProduct(req,res){
    const {id} =req.params
  try{
    const findDetail = await ProductSchema.findOne({_id:id});
      [1,2,3].forEach((number) =>{
        let key = `image${number}`;
        let image = findDetail[key];
        let __dirname = path.resolve();
        let imagePath = __dirname+ `/../client/public/images/${image}`;
        fs.unlink(imagePath, (err)=>{
          if(err){
            throw new Error(err)
          }
        })
      })
      await ProductSchema.findByIdAndDelete(id)
      return res.status(200).send({msg: "product has been deleted..."})
  }catch(error){
    throw new Error(error.message)
  }
  }
  

}

module.exports = new product();
