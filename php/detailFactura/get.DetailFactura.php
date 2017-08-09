<?php

  // session_start();

  // // Incluir archivo de base de datos
  include_once('../class/class.Database.php');
  include_once('../permission/per.Access.php');

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (checkSessionUser()) {

      $parameter = $_GET['id'];

      $sql = "SELECT numero_factura, fecha_solicitado, monto, impuesto, monto_neto, estado, comentario, cliente_id FROM facturas WHERE numero_factura=$parameter";

      $factura = Database::get_arreglo($sql);
      $id = $factura[0]['cliente_id'];

      $sql = "SELECT id, nombre, correo, zip, telefono1, telefono2, pais, direccion FROM clientes WHERE id='$id'";
      $client = Database::get_arreglo($sql);

      $sqlDetail = "SELECT numero_factura, producto_id, cantidad, precio_unitario FROM facturas_detalle WHERE numero_factura=$parameter";

      $detailFactura = Database::get_arreglo($sqlDetail);

      for ($i=0; $i < sizeof($detailFactura); $i++) {
        $idProducto = $detailFactura[$i]['producto_id'];
        $sqlProduct = "SELECT producto_id, producto, precio_compra, precio_venta FROM productos WHERE producto_id=$idProducto";
        $detailProduct = Database::get_arreglo($sqlProduct);

        // print_r($detailProduct);

        $detailFactura[$i]['producto'] = $detailProduct[0];
      }

      $respuesta = array(
        'err'=> false,
        'factura'=> $factura[0],
        'cliente'=> $client[0],
        'detalle'=> $detailFactura
      );

      echo json_encode( $respuesta );

    } else {
      echo json_encode(array('success'=>false));
    }
  }


?>