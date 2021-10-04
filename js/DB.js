class DB {
    static getAll(){
        return new Promise((resolve,reject)=>{
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = () =>{
                if(xml.readyState == 4 &&  xml.status == 200){
                    console.log(JSON.parse(xml.responseText));
                }
            }
            xml.open('GET', 'get_data.php');
            xml.send();
        });
    }
}