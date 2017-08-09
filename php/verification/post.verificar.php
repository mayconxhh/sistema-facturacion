<?php
session_start();
require_once("../class/class.Database.php");
require_once("../class/class.Permission.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$postdata = file_get_contents("php://input");

	$request = json_decode($postdata);
	$request =  (array) $request;


	$respuesta = array(
					'err' => true,
					'mensaje' => 'Usuario/Contraseña incorrectos',
				);


	// ================================================
	//   Encriptar la contraseña maestra (UNICA VEZ)
	// ================================================
	// encriptar_usuario();

	if(  isset( $request['username'] ) && isset( $request['password'] ) ){ // ACTUALIZAR

		$user = addslashes( $request['username'] );
		$pass = addslashes( $request['password'] );

		$user = strtoupper($user);


		// Verificar que el usuario exista
		$sql = "SELECT count(*) as existe FROM usuarios where codigo = '$user'";
		$existe = Database::get_valor_query( $sql, 'existe' );


		if( $existe == 1 ){

			$sql = "SELECT contrasena FROM usuarios where codigo = '$user'";
			$data_pass = Database::get_valor_query( $sql, 'contrasena' );


			// Encriptar usando el mismo metodo
			$pass = Database::uncrypt( $pass, $data_pass );

			// Verificar que sean iguales las contraseñas
			if( $data_pass == $pass ){

				$sql = "SELECT id, codigo FROM usuarios where codigo ='$user'";
				$statement = VariableData::get_valor_query( $sql );

				$SetData = array(
					'id' => $statement['id'],
					'codigo' => $statement['codigo']
				);

				$_SESSION['id'] = $statement['id'];
				$_SESSION['codigo'] = $statement['codigo'];

				// actualizar ultimo acceso
				$sql2 = "UPDATE usuarios set ultimoacceso = NOW() where codigo ='".$statement['codigo']."'";
				Database::ejecutar_idu($sql2);
				$tok = VariableData::createTok($SetData);

				$respuesta = array(
					'err' => false,
					'mensaje' => 'Login válido',
					'tok' => $tok
				);

			}


		}

	}


	// sleep(1.5);
	echo json_encode( $respuesta );

	// Esto se puede borrar despues
	// ================================================
	//   Funcion para Encriptar
	// ================================================
	// function encriptar_usuario(){

	// 	$usuario_id = '1';
	// 	$contrasena = '123456';
	// 	$contrasena_crypt = Database::crypt( $contrasena );

	// 	$sql = "UPDATE usuarios set contrasena = '$contrasena_crypt' where id = '$usuario_id'";
	// 	Database::ejecutar_idu($sql);
	// }
}




?>