<?php
$kv = new SaeKV();
$ret = $kv->init();
function getImage($key) {
    global $kv,$ret;
    if ($key) {
        $ret = $kv->get($key);
        if (!$ret) {
            notFound();
        }

        $type = substr($key, -3, 3);
        if ($type == 'jpg') {
            $type = 'jpeg';
        }
        header("Content-Type: image/$type");  
        echo $ret;
    }
    else {
        notFound();
    }
}

function GetCurUrl() {                                                                                                                                              
    if(!empty($_SERVER["SCRIPT_URI"]))                                                                                                        
    {                                                                                                                                          
        $scrtName = $_SERVER["SCRIPT_URI"];                                                                                                   
        $nowurl = $scrtName;                                                                                                                   
    }                                                                                                                                          
    else                                                                                                                                       
    {                                                                                                                                          
        $scrtName = $_SERVER["PHP_SELF"];                                                                                                      
        if(empty($_SERVER["QUERY_STRING"]))                                                                                                    
        {                                                                                                                                      
            $nowurl = $scrtName;                                                                                                               
        }                                                                                                                                      
        else                                                                                                                                   
        {                                                                                                                                      
            $nowurl = $scrtName."?".$_SERVER["QUERY_STRING"];                                                                                  
        }                                                                                                                                      
    }                                                                                                                                          
    return $nowurl;                                                                                                                            
}

function saveImage($info,$data) {
    global $kv,$ret;
    $key = md5(time().$info['name']);
    if ($info['type'] == 'image/gif') {
        $key = $key.'.gif';     
    }
    else if (in_array($info['type'], array('image/jpeg', 'image/pjpeg'))) {
        $key = $key.'.jpg';     
    }
    else{
        $key = $key.'.png';     
    }
    $ret = $kv->add($key, $data);

    return $key;
}

function redirect($url) {
    header("Location: $url");
}

function auth() {
    global $kv,$ret;
    if (!isset($_SERVER['PHP_AUTH_USER']) || $_SERVER['PHP_AUTH_USER'] == '') {
        header('WWW-Authenticate: Basic realm="Need password"');
        header('HTTP/1.0 401 Unauthorized');
        exit;
    } else {
        $ret = $kv->get('configuration');
        $res = json_decode($ret,true);
        if ($_SERVER['PHP_AUTH_USER'] != $res['usr'] || $_SERVER['PHP_AUTH_PW'] != $res['pwd']) {
            header('WWW-Authenticate: Basic realm="Need password"');
            header('HTTP/1.0 401 Unauthorized');
            exit;
        }
    }
}


function notFound() {   
    header('HTTP/1.1 404 Not Found'); 
    header("status: 404 Not Found");
    exit; 
}
