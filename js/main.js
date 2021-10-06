
let mainBody = document.querySelector('#main-body');
let maineditbody =document.querySelector('#main-edit-body');

let accBtn = document.querySelector('#accBtn');
let addBtn = document.querySelector('#addBtn');
let editBtn = document.querySelector('#editBtn');
let saveBtn = document.querySelector('#saveBtn');

let inputId = document.querySelector('[name="id"]');
let inputName = document.querySelector('[name="name"]');
let inputDeposit = document.querySelector('[name="deposit"]');
let inputCreditCard = document.querySelector('[name="credit_card"]');

let accView = document.querySelector('#accView');
let addView = document.querySelector('#addView');
let accEditView = document.querySelector('#accEditView');
let editView = document.querySelector('#editView');

addBtn.addEventListener('click', displayAddView);
accBtn.addEventListener('click', displayAccView);
saveBtn.addEventListener('click', saveNewAccount);
editBtn.addEventListener('click', editAccount);

let editedAccount = false;

DB.getAll().then((data)=>{
    //console.log(data);
    createTable(data);
    displayAccView();
},(err)=>{
    console.log(err);
});

function editAccount(){
    DB.getAll().then((data)=>{
        createEditedTable(data);
        displayAccEditView();

      /*   let theadTr = document.querySelector('thead tr');
        theadTr.innerHTML += `<th>Edit/Delete</th>`; */

       

        //forma za izmenu
        


    },(err)=>{
        console.log(err);
    });
}

function edit(){
    //console.log(this);
    editedAccount=true;
    let id = this.getAttribute('id').split('-')[1];
    //console.log(id);
    displayAddView();
    let naslov = document.querySelector('.naslov');
    naslov.innerHTML = 'Edit Account';

    DB.getDataById(id).then((data)=>{
        account = JSON.parse(data);
        inputId.value=account.id;
        inputName.value = account.name;
        inputDeposit.value = account.deposit;
        inputCreditCard.value = account.credit_card;

    },(err)=>{
            console.log(err);
            
    });
   
   
}

function saveNewAccount(){

    //validacija
    let newAccount = {
        name: inputName.value,
        deposit: inputDeposit.value,
        credit_card:inputCreditCard.value
    }

   
    if(!editedAccount){
        DB.save(newAccount).then((res)=>{
            DB.getAll().then((data)=>{
                
                createTable(data);
                displayAccView();
               
            },(err)=>{
                console.log(err);
            });
        },(err)=>{
            console.log(err);
        });
    }else{
        newAccount['id']=inputId.value;
    
        DB.update(newAccount).then((res)=>{
            DB.getAll().then((data)=>{
                
                createTable(data);
                displayAccView();
                editedAccount = false;
               
            },(err)=>{
                console.log(err);
            });
        },(err)=>{
            console.log(err);
        });
    }


}


function displayAddView(){
addView.style.display = 'block';
accView.style.display = 'none';
accEditView.style.display = 'none';

inputId.value = '';
inputName.value = '';
inputDeposit.value = '';
inputCreditCard.value = '';

}

function displayAccEditView(){

    accEditView.style.display = 'block';
    accView.style.display = 'none';
    addView.style.display = 'none';
}

function displayAccView(){
    accView.style.display = 'block';
    addView.style.display = 'none';
    accEditView.style.display = 'none';
}
    

function createTable(data){

    mainBody.innerHTML = '';
    let text = ``;  
    for (let i = 0; i < data.length; i++) {
        text+=`
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].deposit}</td>
            <td>${data[i].credit_card}</td>
        </tr>
        `;
        
    }

    mainBody.innerHTML = text;
}


function createEditedTable(data){

    maineditbody.innerHTML = '';
    let text = ``;  
    for (let i = 0; i < data.length; i++) {
        text+=`
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].deposit}</td>
            <td>${data[i].credit_card}</td>
            <td><button id='btn-${data[i].id}' class="btn btn-sm btn-warning">Edit</button>&nbsp;
            <a href='delete_account.php?id=${data[i].id}' class="btn btn-sm btn-danger">Delete</a></td>
        </tr>
        `;  
    }

    maineditbody.innerHTML = text;
    for (let i = 0; i < data.length; i++) {
     document.querySelector(`#btn-${data[i].id}`).addEventListener('click', edit);
    }

}