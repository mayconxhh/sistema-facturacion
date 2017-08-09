<?php
  session_start();
  // Incluir archivo de base de datos
  include_once('../class/class.Permission.php');

  function checkSessionUser(){
    $arr = apache_request_headers();
    $tok = $arr['x-access-token'];

    $user = array(
        'id'=> $_SESSION['id'],
        'codigo'=> $_SESSION['codigo']
      );

    $response = VariableData::checkSession($tok, $user);
    
    if ($response['success']) {
      return true;
    } else {
      $_SESSION = array();
      session_destroy();
      return false;
    }
  }

 ?>