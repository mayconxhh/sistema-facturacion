<?php

  session_start();
  
  // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    # code...
    if (checkSessionUser()) {

      if( isset( $_GET["id"] ) ){
        
        $producto_id = $_GET["id"];
        
        $sql = "SELECT producto_id, producto, precio_compra, precio_venta FROM productos where producto_id = $producto_id";

        $producto =  Database::get_arreglo( $sql );
        $producto = $producto[0];

        $respuesta = array('err' => false,
                  'producto'=> $producto
                   );
      }else{
        $respuesta = array('err' => true );
      }

      echo json_encode( $respuesta, JSON_NUMERIC_CHECK );

    } else {
      echo json_encode(array('success'=>false));
    }
  }



?>