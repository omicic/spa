<?php 
require 'bootstrap.php';

//var_dump('1');
if(isset($_GET['id'])){
    //var_dump($_GET['id']);
    $query->delete('accounts', $_GET['id']);
     if("success"){
        header('Location: index.html');
    }else{
        var_dump("Error");
    } 
}