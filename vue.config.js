module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'https://www.yixi.tv'
            },

            '/blogs':{
                target:'http://119.3.182.222:5000/api/v1.0'
            }

        }
    }
}