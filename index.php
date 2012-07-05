<?php
require 'tu.php';
$key = 'configuration';

$ret = $kv->get($key);

$res = json_decode($ret,true);
$auth = isset($res['auth']) ? $res['auth'] : '';
$domain = isset($res['domain']) ? $res['domain'] : '';
 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($auth == '1') {
        auth(); 
    }
    foreach ($_FILES as $info) {
        $tmp_file = $info['tmp_name'];

        if (in_array($info['type'], array('image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'))
            && $info['size'] / 1024 / 1024 <= 4) {
            $fh = fopen($tmp_file, "rb");
            $data = fread($fh, filesize($tmp_file));
            fclose($fh);
            
            $key = saveImage($info,$data);
            
            echo $key; 
        }
        else {
            echo 'error'; 
        }
    }
}
else {
    $url = parse_url(GetCurUrl());
    $key = str_replace('/','',$url['path']);
    if ($key) {
        if (isset($_SERVER['HTTP_REFERER'])) {
            $info = parse_url($_SERVER['HTTP_REFERER']);
            if ($domain != '' && $info['host'] != $domain) {
                notFound();
            }
        }
        getImage($key);
    }
    else {
        if ($auth == '1') {
            auth(); 
        }
        require 'index.tpl';
    }
}
