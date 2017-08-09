<?php 

  session_start();
  
  // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../class/class.Permission.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (checkSessionUser()) {
      $user = array(
          'id'=> $_SESSION['id'],
          'codigo'=> $_SESSION['codigo']
        );

      $respuesta = Database::get_User( $user );
      
      VariableData::deleteTok($user);

      $_SESSION = array();
      session_destroy();

      echo json_encode(array('success'=>true));
    } else {
      echo json_encode(array('success'=>false));
    }
  }

 ?>