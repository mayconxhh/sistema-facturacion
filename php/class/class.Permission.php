<?php 
  /**
  * Encripting date user
  */
  class VariableData {

    private $_connection;
    private $_host = "sql301.unaux.com";
    private $_user = "unaux_20513946";
    private $_pass = "huayapa123";
    private $_db   = "unaux_20513946_facturacion_db";

    // Almacenar una unica instancia
    private static $_instancia;

    // ================================================
    // Metodo para obtener instancia de base de datos
    // ================================================
    public static function getInstancia(){

      if(!isset(self::$_instancia)){
        self::$_instancia = new self;
      }


      return self::$_instancia;
    }

    // Metodo que revisa el String SQL
    private function es_string($sql){
      if (!is_string($sql)) {
        trigger_error('class.Database.inc: $SQL enviado no es un string: ' .$sql);
        return false;
      }
      return true;
    }

    // Metodo para obtener la conexion a la base de datos
    public function getConnection(){
      // print_r($this);
      $this->_connection->set_charset("utf8");
      return $this->_connection;
    }

    public function __construct(){
      $this->_connection = new mysqli($this->_host,$this->_user,$this->_pass,$this->_db);

      // Manejar error en base de datos
      if (mysqli_connect_error()) {
        trigger_error('Falla en la conexion de base de datos'. mysqli_connect_error(), E_USER_ERROR );
      }
    }

    public static function get_valor_query($sql){

      $db = VariableData::getInstancia();
      $mysqli = $db->getConnection();

      $resultado = $mysqli->query($sql);

      // Si hay un error en el SQL, este es el error de MySQL
      if (!$resultado ) {
          return "class.Database.class: error ". $mysqli->error;
      }

      return $resultado->fetch_assoc();
    }

    public static function checkSession($tok, $user){

      // Core de la funcion
      $db = VariableData::getInstancia();
      $mysqli = $db->getConnection();

      $sql = "SELECT id, codigo, tok FROM usuarios where id='".$user['id']."' AND codigo ='".$user['codigo']."' AND tok = '$tok'";
      $statement = VariableData::get_valor_query( $sql );

      $result = array();

      if ($statement) {

        if ($statement['tok'] === $tok) {
          
          $Ouser = self::decrypt($tok);
          $Ouser = explode(',', $Ouser);

          $Ouser = array(
            'id' => $Ouser[0],
            'codigo'=>$Ouser[1],
            'date'=>$Ouser[2]
          );

          if ($Ouser['date'] > time() AND $statement['codigo'] === $Ouser['codigo'] AND $statement['id'] === $Ouser['id']) {
            $result['success'] = true;
            $result['message'] = 'Usuario autenticado';
            return $result; 
          } else {
            self::deleteTok($user);
            self::deleteTok($Ouser);
            $result['success'] = false;
            $result['message'] = 'Usuario no autenticado 1';
            return $result;
          }

        } else {
          self::deleteTok($user);
          $result['success'] = false;
          $result['message'] = 'Usuario no autenticado 2';
          return $result;
        }
        
      } else {
        $sql = "SELECT id, codigo FROM usuarios where tok ='$tok'";
        $statement = VariableData::get_valor_query( $sql );
        self::deleteTok($statement);
        $result['success'] = false;
        $result['message'] = 'Usuario no autenticado 3';
        return $result;
      }

    }

    public static function createTok($user){

      $newUser = array(
          'id' => $user['id'],
          'codigo' => $user['codigo'],
          'date' => time() +(60*120)
        );

      $string = implode( ',', $newUser );
      $newTok = self::encrypt($string);

      $usuario = $user['codigo'];

      // Core de la funcion
      $db = VariableData::getInstancia();
      $mysqli = $db->getConnection();

      $sql = "SELECT id, codigo FROM usuarios WHERE codigo ='$usuario'";
      $existe = VariableData::get_valor_query( $sql);

      if( $existe ){

        $sql = "UPDATE usuarios SET tok='$newTok' WHERE id= '".$existe['id']."'";
        $result = $mysqli->query($sql);

        return $newTok;
      } else {
        return 'false';
      }

    }

    public static function deleteTok($user){

      // Core de la funcion
      $db = VariableData::getInstancia();
      $mysqli = $db->getConnection();

      $deleteTok = hash('sha512', 'jksjkahfjj654f4s+{+{ññfsd5fsd5e.,+,´.,+.´,.,´+´547z<z<z>Z>¨<54545'+time());


      $sql = "UPDATE usuarios SET tok='$deleteTok' WHERE id= '".$user['id']."'";
      $result = $mysqli->query($sql);

      return $resultado;

    }

    private static function encrypt($cadena){

      $key=hash('sha512', 'SDAFSDFSDFSDF64DS5F45DF45SDF4SD5F4SD5F4SD5FSD5F4DF6D5F4SD65F4SD65FSD45F');  // Una clave de codificacion, debe usarse la misma para encriptar y desencriptar
      $encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $cadena, MCRYPT_MODE_CBC, md5(md5($key))));

      return $encrypted; //Devuelve el string encriptado

    }

    private static function decrypt($cadena){

      $key=hash('sha512', 'SDAFSDFSDFSDF64DS5F45DF45SDF4SD5F4SD5F4SD5FSD5F4DF6D5F4SD65F4SD65FSD45F');  // Una clave de codificacion, debe usarse la misma para encriptar y desencriptar
      $decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($cadena), MCRYPT_MODE_CBC, md5(md5($key))), "\0");

      return $decrypted;  //Devuelve el string desencriptado

    }

  }

  // $user = array(
  //   'id' => 1,
  //   'codigo'=>'mayconxhh',
  //   'contrasena'=>'123456'
  // );
  // $result = VariableData::createTok($user);


  // $user = array(
  //   'id' => 1,
  //   'codigo'=>'mayconxhh'
  // );
  // $result = VariableData::checkSession('token', $user);

  // echo json_encode($result);

 ?>