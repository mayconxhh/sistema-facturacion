<?php

  // session_start();

  // // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    # code...
    if (checkSessionUser()) {
      $postdata = file_get_contents("php://input");
      if (isset($_GET['page'])) {
        $pag = $_GET['page'];
      } else {
        $pag = 1;
      }

      $respuesta = Database::get_todo_paginado('facturas', $pag );

      $facturas = $respuesta['facturas'];

      for ($i=0; $i < sizeof($facturas); $i++) {
        $id = $facturas[$i]['cliente_id'];
        $sql = "SELECT id, nombre FROM clientes WHERE id='$id'";
        $client = Database::get_arreglo($sql);
        // print_r($client);
        $facturas[$i]['nombre_cliente'] = $client[0]['nombre'];
      }

      $respuesta = array(
          'err'         => $respuesta['err'], 
          'conteo'    => $respuesta['conteo'],
          'facturas'      => $facturas,
          'pag_actual'    => $respuesta['pag_actual'],
          'pag_siguiente' => $respuesta['pag_siguiente'],
          'pag_anterior'  => $respuesta['pag_anterior'],
          'total_paginas' => $respuesta['total_paginas'],
          'paginas'     => $respuesta['paginas']
          );

      echo json_encode( $respuesta );

    } else {
      echo json_encode(array('success'=>false));
    }
  }


?>