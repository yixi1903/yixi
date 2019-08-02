module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'https://www.yixi.tv'
            }
           
        }
    }
}