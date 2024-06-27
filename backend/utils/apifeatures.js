class Apifeatuers{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr ;
    }
    search(){
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword, //regis means regular expression mongodb functioon
                $options: "i", //case insensitive
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    }
// filter method to filter out products
    filter(){
        const  queryCopy= {...this.queryStr}

        

        // removing some field for category
        const removeFields =  ["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);

        // filter for price and rating
        
        let queryStr = JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        
        
        this.query = this.query.find(JSON.parse(queryStr)); //product.find() method has been called
       
        return this;
        
    }

    pagination(resultPerPage){
        const currentPage =Number(this.queryStr.page) || 1;
        const skip =  resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this;
    }
};
module.exports=Apifeatuers