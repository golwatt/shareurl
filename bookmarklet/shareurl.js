var popup160875 = (function() {
  var popup = document.createElement('iframe');
  popup.setAttribute('style', 'background-color:#fff; opacity:1.0; z-index:2147483647; position: fixed; top:0px; left:50%; margin-left:-100px; width:200px; height:125px; border: 2px solid #aaa');
  popup.setAttribute('name', 'ipp160875');
  document.body.appendChild(popup);

  var popupDocument = window['ipp160875'].document;
  popupDocument.body.style = 'margin:0px;';
  popupDocument.write('<html><body style="margin:0px;"><div style="border-bottom:1px solid #aaa; width:100%; height:38px;"><span onclick="window.parent.popup160875.sendurl();" style="display:block; cursor:pointer; color:#166bec; text-align:center; text-decoration:none; width:50%; float:left; padding:10px 0px 10px 0px; border-right:1px solid #aaa;">send url</span><span onclick="window.parent.popup160875.geturl();" style="display:block; cursor:pointer; color:#166bec; text-align:center; text-decoration:none; width:49%; float:right; padding:10px 0px 10px 0px;">get url</span></div><div id="popup-content" style="width:100%; height:52px; text-align:center;"></div><div style="width:100%; height:30px; font-size:13px;"><span onclick="window.parent.popup160875.close();" style="display:block; cursor:pointer; color:red; text-align:center; text-decoration:none; width:100%; height:21px; padding-top:8px; border-top: 1px solid #aaa;">close</span></div></body></html>');

  var gotKeyword;

  function sendUrl(){
    var popupContent = popupDocument.getElementById('popup-content');
    var children = popupContent.children;
    var childrenLen = children.length;
    for (var i = 0; i < childrenLen; i++) {
      popupContent.removeChild(children[0]);
    }

    if (!gotKeyword) {
      var xhr = new XMLHttpRequest();
      if (xhr) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              var res = JSON.parse(xhr.responseText);
              gotKeyword = res.keyword;

              var keywordElement = popupDocument.createElement('span');
              keywordElement.setAttribute('style', 'display:inline-block; margin-top:15px;');
              keywordElement.innerHTML = gotKeyword;
              
              popupContent.appendChild(keywordElement);
            } else {
              alert("service temporary unavailable, retry later.");
            }
          }
        };
        xhr.open("GET", "https://shareurl-golwatt.rhcloud.com/sendurl?longUrl=" + encodeURIComponent(window.location), true);
        xhr.send(null);
      } else {
        alert('Your browser does not support XMLHttpRequest');
      }
    } else {
      var keywordElement = popupDocument.createElement('span');
      keywordElement.setAttribute('style', 'display:inline-block; margin-top:15px;');
      keywordElement.innerHTML = gotKeyword;
      
      popupContent.appendChild(keywordElement);
    }
  }
  function getUrl(){
    var popupContent = popupDocument.getElementById('popup-content');
    var children = popupContent.children;
    var childrenLen = children.length;
    for (var i = 0; i < childrenLen; i++) {
      popupContent.removeChild(children[0]);
    }
    var inputElement = popupDocument.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('style', 'width:100px; height:30px; margin:7px 7px 7px 0px;');
    popupContent.appendChild(inputElement);

    var submitElement = popupDocument.createElement('a');
    submitElement.setAttribute('href', '#');
    submitElement.setAttribute('onclick', 'window.parent.popup160875.submit();');
    submitElement.setAttribute('style', 'color:#3fc216; text-decoration:none; margin-left:4px;');
    submitElement.innerHTML = 'submit';
    popupContent.appendChild(submitElement);

    inputElement.focus();
  }
  function submitKeyword() {
    var popupContent = popupDocument.getElementById('popup-content');
    var inputElement = popupContent.children[0];
    
    var xhr = new XMLHttpRequest();
    if (xhr) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            newUrl = res.url;
            window.location = newUrl;
          } else if (xhr.status == 500) {
            alert(xhr.responseText);
          }
        }
      };
      xhr.open("GET", "https://shareurl-golwatt.rhcloud.com/geturl?key=" + inputElement.value.toLowerCase(), true);
      xhr.send(null);
    } else {
      alert('Your browser does not support XMLHttpRequest');
    }
  }
  function closePopup() {
    document.body.removeChild(popup);
  }

  var popupObj = {
    sendurl: sendUrl,
    geturl: getUrl,
    submit: submitKeyword,
    close: closePopup
  }
  return popupObj;
})();
