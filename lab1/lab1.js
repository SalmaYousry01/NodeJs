const http = require('http');
http
.createServer((req, res) => {
    const requestedUrl = req.url;
	// console.log(req.url);
	// console.log(req.method);
	if(requestedUrl != '/favicon.ico'){
    const urlArr = requestedUrl.split("/");  
    var operation = urlArr[1];
    let result = parseFloat(urlArr[2]);

    for (let i = 3 ;i<urlArr.length;i++){
        switch(operation){
            case 'add':
                result += parseFloat(urlArr[i]);
                break;
            case 'sub':
                result -= parseFloat(urlArr[i]);
                break; 
            case 'multi':
                result *= parseFloat(urlArr[i]);
                break;    
            case 'div':
                result /= parseFloat(urlArr[i]);
                break; 
            default:
                return "Invalid";           
        }
    }
    console.log(operation);  
	res.write(result.toString());

    const fs = require('fs');
    fs.writeFile('result.txt',result.toString(),()=>{});
	}
	res.end();
	})
.listen(7000)