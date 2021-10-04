<?php 
require 'bootstrap.php';

echo json_encode($query->selectAll('accounts'));