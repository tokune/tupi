var doc = document;
window.onload =function() {
    var submit = doc.getElementById("submit");
    var bigbox = humane.create({baseCls: 'humane-bigbox', timeout: 1000});
    bigbox.error = bigbox.spawn({addnCls: 'humane-bigbox-error'});
    var jacked = humane.create({baseCls: 'humane-jackedup', addnCls: 'humane-jackedup-success'});

    submit.addEventListener("click", function(e){  
        submit_config();
    }, false);
    
    function submit_config() {
        var xhr = new XMLHttpRequest();
        var auth = doc.getElementById("auth").checked ? 1 : 0;
        var params = "usr="+doc.getElementById("usr").value+"&pwd="+
                    doc.getElementById("pwd").value+"&domain="+doc.getElementById("domain").value
                    +"&auth="+auth;
        xhr.open('post', '/settings.php', true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                if(xhr.responseText == 'error'){
                    bigbox.log('注意').error('系统异常');
                }
                else if(xhr.responseText == 'key_error'){
                    bigbox.log('注意').error('不要来乱..参数都错了..');
                }
                else{
                    jacked.log("设置成功");
                }
            }
        }
        xhr.send(params);
    }
}
