
let mainBody = document.querySelector('#main-body');
let accBtn = document.querySelector('#accBtn');
let addBtn = document.querySelector('#addBtn');
let editBtn = document.querySelector('#editBtn');
let saveBtn = document.querySelector('#saveBtn');


let inputName = document.querySelector('[name="name"]');
let inputDeposit = document.querySelector('[name="deposit"]');
let inputCreditCard = document.querySelector('[name="credit_card"]');

let accView = document.querySelector('#accView');
let addView = document.querySelector('#addView');
let editView = document.querySelector('#editView');

addBtn.addEventListener('click', displayAddView);
accBtn.addEventListener('click', displayAccView);
saveBtn.addEventListener('click', saveNewAccount);
editBtn.addEventListener('click', editAccount);


DB.getAll().then((data)=>{
    //console.log(data);
    createTable(data);
},(err)=>{
    console.log(err);
});

function editAccount(){
    DB.getAll().then((data)=>{
        createTable(data);
        displayAccView();

        let theadTr = document.querySelector('thead tr');
        theadTr.innerHTML += `<th>Edit/Delete</th>`;

        let tbodyTrs = document.querySelectorAll('tbody tr');
        tbodyTrs.forEach((tr,index) => {
            tr.innerHTML += `<td><a href='index.php?id=${data[index].id}' class="btn btn-sm btn-warning">Edit</a>&nbsp;
            <a href='delete_account.php?id=${data[index].id}' class="btn btn-sm btn-danger">Delete</a></td>`;
        });

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
}


function displayAddView(){
addView.style.display = 'block';
accView.style.display = 'none';
//editView.style.display = 'none';

}

function displayAccView(){
    accView.style.display = 'block';
    addView.style.display = 'none';
    //editView.style.display = 'none';
}
    

function createTable(data){
    let text = ``;
    console.log(data.length);
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