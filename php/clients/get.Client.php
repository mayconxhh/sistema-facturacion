<?php 
  
  session_start();
  
  // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    # code...
    if (checkSessionUser()) {

      $parameter = $_GET['p'];

      if (is_numeric($parameter)) {
        $sql = "SELECT id, nombre, correo, zip, telefono1, telefono2, pais, direccion FROM clientes WHERE id=$parameter";
        $response = array(
          'err'=> false,
          'clientes'=> Database::get_arreglo($sql)
        );
      } else {
        $response = Database::get_por_nombre('clientes', 'nombre', $parameter);
      }

      echo json_encode( $response );
    } else {
      echo json_encode(array('success'=>false));
    }
  }


 ?>