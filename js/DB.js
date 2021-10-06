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

    static getDataById(id){
        return new Promise((resolve,reject)=>{
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = () => {
                if(xml.readyState ==4 && xml.status == 200){
                    resolve(xml.responseText);
                }
            }

            xml.open('GET', `edit_account.php?id=${id}`);
            xml.send();
        })
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
 
      static update(editedAccount){
        return new Promise((resolve,reject)=>{
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = () => {
                if(xml.readyState ==4 && xml.status == 200){
                    resolve(xml.responseText);
                }
            }

            xml.open('POST', 'update_data.php');
            xml.setRequestHeader("Content-type","application/json");   
           // console.log(editedAccount);
            xml.send(JSON.stringify(editedAccount));
        })
    }  
}