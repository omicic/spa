class DB {

    static getAll(){
        return new Promise((resolve,reject)=>{
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = () =>{
                if(xml.readyState == 4 &&  xml.status == 200){
                   resolve(JSON.parse(xml.responseText));
                }
            }
            xml.open('GET', 'get_data.php');
            xml.send();
        });
    }

    static save(newAccount){
        return new Promise((resolve,reject)=>{
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = () =>{
                if(xml.readyState == 4 &&  xml.status == 200){
                   resolve(xml.responseText);
                }
            }

            xml.open('POST', 'save_data.php');
            xml.setRequestHeader("Content-type","application/json");   
            xml.send(JSON.stringify(newAccount));
        });
    }
 
/*     static delete(id){
        return new Promise((resolve,reject)=>{
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = () => {
                if(xml.readyState ==4 && xml.status == 200){
                    console.log(resolve);
                }
            }

            xml.open('GET', 'delete_account.php');
            xml.send();
        })
    }  */
}