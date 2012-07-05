<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" href="/static/main.css">
        <link rel='stylesheet' href='/static/bigbox.css'/>
        <link rel='stylesheet' href='/static/jackedup.css'/>
        <script src='/static/humane.min.js'></script>      
        <title>图派</title>
    </head>
    <body>
        <div id="page" >
            <div id="header" >
                <a href="/"><p>图派</p></a> 
                <span>快速,简便</span>
            </div>
            <div id="dropbox" >
                <div id="settings" >
                  <p>用户: <input type="text" id="usr" value="<?php echo $usr;?>"/></p>
                  <p>密码: <input type="text" id="pwd" value="<?php echo $pwd;?>"/></p>
                  <p>域名: <input type="text" id="domain" value="<?php echo $domain;?>"/></p>
                  <p>是否启用上传页面认证: <input type="checkbox" id="auth" <?php if($auth == '1') echo 'checked'; ?> /></p>
                  <input id="submit" type="button" value="提交" />
                </div>      
            </div>      
            <div id="footer" >
                <p>
                    <span>
                        ©2012
                        - <a href="http://blog.os.io/2012/05/%e5%9f%ba%e4%ba%8esae%e7%9a%84%e5%9b%be%e5%ba%8a%e5%8f%91%e5%b8%83%e6%b5%8b%e8%af%95/">隐私权政策</a> 
                        - <a href="mailto:tokune@gmail.com">意见反映</a> 
                        - <img src="http://static.sae.sina.com.cn/image/poweredby/poweredby.png" alt="Powered by Sina App Engine">
                    </span>
                </p>
            </div> 
        </div>  
    </body>
    <script type="text/javascript" src="/static/settings.js"></script>
</html>
