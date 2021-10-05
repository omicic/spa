<?php 
require 'bootstrap.php';
//$json = file_get_contents('php://input');
//$data = json_decode($json);

echo json_encode($query->selectDataById('accounts', $_GET['id']));
    