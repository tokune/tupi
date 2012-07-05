<?php
require 'tu.php';
$key = 'configuration';

$ret = $kv->get($key);

$res = json_decode($ret,true);
$usr = isset($res['usr']) ? $res['usr'] : '';
$pwd = isset($res['pwd']) ? $res['pwd'] : '';
$domain = isset($res['domain']) ? $res['domain'] : '';
$auth = isset($res['auth']) ? $res['auth'] : '';
     
             
if ($usr) {
    auth(); 
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usr']) && isset($_POST['pwd']) && isset($_POST['domain']) && isset($_POST['auth'])) {
        try {
            $ret = $kv->set($key, json_encode($_POST));
            echo 'success'; 
        }
        catch (Exception $e) {
            echo 'error'; 
        }
    }
    else {
        echo 'key_error'; 
    }
}
else {
    require 'settings.tpl';
}
