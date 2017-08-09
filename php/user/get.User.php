<?php 

  session_start();
  
  // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../class/class.Permission.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (checkSessionUser()) {
      $user = array(
          'id'=> $_SESSION['id'],
          'codigo'=> $_SESSION['codigo']
        );

      $respuesta = Database::get_User( $user );
      $response = array(
          'success'=> true,
          'user'=>$respuesta
        );

      echo json_encode( $response );
    } else {
      echo json_encode(array('success'=>false));
    }
  }


 ?>