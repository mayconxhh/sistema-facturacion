<?php 

  session_start();
  
  // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../class/class.Permission.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    # code...
    if (checkSessionUser()) {
      # code...
      $postdata = file_get_contents("php://input");

      $request = json_decode($postdata);
      $request = (array) $request;

      if ( isset($request['id']) ) {

        $sql = "UPDATE clientes SET
                                  nombre    = '".$request['nombre']."',
                                                                                    correo    = '".$request['correo']."',
                                  zip       = '".$request['zip']."',
                                  telefono1 = '".$request['telefono1']."',
                                  telefono2 = '".$request['telefono2']."',
                                  pais      = '".$request['pais']."',
                                  direccion = '".$request['direccion']."' 
                                WHERE id =".$request['id'];

        $hecho = Database::ejecutar_idu( $sql );

        if (is_numeric($hecho) OR $hecho === true) {
          $respuesta = array(
            'err' => false,
            'message' => 'Registro actualizado'
          );
        } else {
          $respuesta = array(
            'err' => true,
            'message' => $echo
          );      
        }

      } else {

        $sql = "INSERT INTO clientes( nombre, correo, zip, telefono1, telefono2, pais, direccion) VALUES (
                            '".$request['nombre']."',
                            '".$request['correo']."',
                            '".$request['zip']."',
                            '".$request['telefono1']."',
                            '".$request['telefono2']."',
                            '".$request['pais']."',
                            '".$request['direccion']."')";


        $hecho = Database::ejecutar_idu( $sql );

        if (is_numeric($hecho) OR $hecho === true) {
          $respuesta = array(
            'err' => false,
            'message' => 'Registro insertado'
          );
        } else {
          $respuesta = array(
            'err' => true,
            'message' => $echo
          );      
        }

      }

      echo json_encode($respuesta);
    } else {
      echo json_encode(array('success'=>false));
    }
  }



 ?>