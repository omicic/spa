<?php 

class Connection {

    public static function connect($database){
        try{
            return $db= new PDO('mysql:host='.$database['host'].';dbname='.$database['dbname'].';user='. $database['user'].';password='. $database['password']);
        }catch(PDOException $e){
            diew("Error ".$e->getMessage());
        }


    }
    
}