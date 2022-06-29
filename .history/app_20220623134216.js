
const express =require('express')
const app =express()



const port =process.env.port || 5000;


const start = async()=>{

    try{
       app.listen(port,()=>{
        
        console.log(`server started at port ${port}`);

       }
    
       
       
       
       )

    }catch(error){
        
    }

}
