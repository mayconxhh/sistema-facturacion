<?php 
  
  session_start();
  
  // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../class/class.Permission.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    # code...
    if (checkSessionUser()) {

      if (isset($_GET['page'])) {
        $pag = $_GET['page'];
      } else {
        $pag = 1;
      }

      $respuesta = Database::get_todo_paginado('clientes', $pag );

      echo json_encode( $respuesta );
    } else {
      echo json_encode(array('success'=>false));
    }
  }


 ?>