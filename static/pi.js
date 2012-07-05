var doc=document,
    dropbox=doc.getElementById("dropbox"),
    previewbox=doc.getElementById("previewbox");
var bigbox = humane.create({baseCls: 'humane-bigbox', timeout: 1000});
bigbox.error = bigbox.spawn({addnCls: 'humane-bigbox-error'});

var jacked = humane.create({baseCls: 'humane-jackedup', addnCls: 'humane-jackedup-success'})

dropbox.addEventListener("dragenter", function(e){  

    dropbox.style.borderColor = 'gray';  
    dropbox.style.backgroundColor = '#cccccc';
    e.stopPropagation();  
    e.preventDefault();  

}, false);  

dropbox.addEventListener("dragleave", function(e){  
    dropbox.style.backgroundColor = '#f4f2e6';  
}, false);  

dropbox.addEventListener("dragover", function(e){  
    e.stopPropagation();  
    e.preventDefault();  
}, false);  

dropbox.addEventListener("drop", function(e){  

    e.stopPropagation();  
    e.preventDefault();

    dropbox.style.backgroundColor = '#f4f2e6';
    handler=handleFiles(e.dataTransfer.files);
   
}, false);

function handleFiles(files){

    var imgbox=[],
        filesList=[], 
        bool=true; 

    for(var i=0,length=files.length;i<length;i++){

        if (!files[i].type.match(/image*/) || files[i].size / 1024 / 1024 > 4) {
            var warning = '';

            if (!files[i].type.match(/image*/)) 
                warning = "请上传图片";
            else
                warning = "文件大小超过4M";

            bigbox.log('注意').error(warning);
            
            bool=false;
            return false;
        }
        filesList[i]=files[i];
    }

    var reader=[];
    var loadboxList=[];
    for(var k=0,length=filesList.length;k<length;k++){      
        reader.push(new FileReader());      
    }
    for(var i=0;i<reader.length;i++){
        reader[i].readAsDataURL(filesList[i]);
        reader[i].onload = function(e){
            var loadbox = doc.createElement("div");
            loadbox.className = "loadbox";
            var imgObj=doc.createElement("img");
            imgObj.src=this.result;
            loadbox.appendChild(imgObj);
            previewbox.appendChild(loadbox);
            loadboxList.push(loadbox);
            if(bool && filesList.length == loadboxList.length){
                ajax(0,filesList,loadboxList);
            }
        }
    }
}

function ajax(index,filesList,loadboxList){
        var xhr = new XMLHttpRequest(),
            per=doc.createElement("p"),
            _html=doc.createElement("div"),
            loadbox = loadboxList[index],
            tal=doc.createTextNode("上传进度：100%"),
            txt=doc.createTextNode("上传进度：");
        _html.className = "notice";

        xhr.open('post', '/', true);
        //var reader = new FileReader();
        //reader.readAsDataURL(filesList[index]);

        //reader.onload = function(e){
        //    var imgObj=doc.createElement("img");
        //    imgObj.src=this.result;
        //    loadbox.appendChild(imgObj);
        //}

        xhr.upload.addEventListener('progress',function(e){
            per.innerHTML="完成："+Math.round((e.loaded * 100) / e.total)+"%";
            _html.appendChild(per);
            loadbox.appendChild(_html);
        },false);

        xhr.upload.addEventListener('load',function(e){

            index++;

            if(index>=filesList.length){
                jacked.log("上传完成");
                return false;
            }
            return ajax(index,filesList,loadboxList);   
        },false);

        xhr.onreadystatechange = function(){          
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    key = xhr.responseText;
                    if (key == 'error' ) {
                        bigbox.log('注意').error('所上传的文件有误');
                    }
                    else {
                        var aObj = doc.createElement("embed");
                        aObj.setAttribute('height', 20);
                        aObj.setAttribute('width', 64);
                        aObj.setAttribute('flashvars', 'clipboard=http://' + doc.domain + '/' + xhr.responseText);
                        aObj.setAttribute('quality', 'high');
                        aObj.setAttribute('bgcolor', '#eeeeee');
                        aObj.setAttribute('ame', 'copy');
                        aObj.setAttribute('id', 'copy');
                        aObj.setAttribute('mediawrapchecked', 'true');
                        aObj.setAttribute('pluginspage', 'http://www.macromedia.com/go/getflashplayer');
                        aObj.setAttribute('src', '/static/copy.swf');
                        aObj.setAttribute('type','application/x-shockwave-flash');
                        aObj.setAttribute('splayername','SWF');
                        aObj.setAttribute('tplayername','SWF');

                        //aObj.href = xhr.responseText;
                        //aObj.innerHTML = '';
                        _html.appendChild(aObj);
                        loadbox.appendChild(_html);
                    }
                }
            }
        };

        var fd=new FormData();
        fd.append("file"+index,filesList[index]);
        xhr.send(fd);
    } 
 

