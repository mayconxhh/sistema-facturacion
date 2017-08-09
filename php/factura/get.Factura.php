<?php

  // session_start();

  // // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    # code...
    if (checkSessionUser()) {

      $parameter = $_GET['search'];

      if(is_numeric($_GET['search'])){

        $sql = "SELECT numero_factura, fecha_solicitado, monto, impuesto, monto_neto, estado, comentario, cliente_id FROM facturas WHERE numero_factura=$parameter";

        $factura = Database::get_arreglo($sql);
        $id = $factura[0]['cliente_id'];

        $sql = "SELECT id, nombre FROM clientes WHERE id='$id'";
        $client = Database::get_arreglo($sql);

        $factura[0]['nombre_cliente'] = $client[0]['nombre'];

        $respuesta = array(
          'err'=> false,
          'facturas'=> $factura
        );

      } else {

        $respuesta = array(
            'err' => false,
            'facturas'=>[]
          );

        $clients = Database::get_por_nombre('clientes', 'nombre', $parameter);
        $clients = $clients['clientes'];
        for ($i=0; $i < sizeof($clients); $i++) {
          $facturas = Database::get_por_nombre('facturas', 'cliente_id', $clients[$i]['id']);
          $facturas = $facturas['facturas'];
          if (!empty ($facturas)) {
            // print_r($facturas);
            for ($o=0; $o < sizeof($facturas); $o++) {
              // print_r($facturas[$o]);
              $facturas[$o]['nombre_cliente'] = $clients[$i]['nombre'];
              array_push ( $respuesta['facturas'] , $facturas[$o] );
            }
          }
        }
      }

      echo json_encode( $respuesta );


    } else {
      echo json_encode(array('success'=>false));
    }
  }


?>