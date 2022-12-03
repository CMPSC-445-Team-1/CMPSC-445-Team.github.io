var uploadButton = document.createElement('button');
uploadButton.innerHTML = 'Upload Image';
uploadButton.style.backgroundColor = '#003366';
uploadButton.style.color = 'white';
uploadButton.style.borderRadius = '5px';
uploadButton.style.padding = '10px';
uploadButton.style.fontSize = '20px';
uploadButton.style.fontFamily = 'sans-serif';
uploadButton.style.fontWeight = 'bold';
uploadButton.style.margin = '10px';
document.body.appendChild(uploadButton);
/* make the button centered on the top of the page */
uploadButton.style.position = 'absolute';
uploadButton.style.top = '20%';
uploadButton.style.left = '50%';
uploadButton.style.transform = 'translate(-50%, -50%)';
var uploadInput = document.createElement('input');
uploadInput.type = 'file';
uploadInput.style.display = 'none';
uploadButton.addEventListener('click', function() {
    uploadInput.click();
});
document.body.style.backgroundImage = 'url(https://cdn.pixabay.com/photo/2021/07/03/14/24/pets-6384006_960_720.jpg)';
document.body.style.backgroundSize = 'cover';
document.body.appendChild(uploadInput);
uploadInput.addEventListener('change', function() {
    var url = "http://localhost:8000";   // The URL and the port number must match server-side
    var endpoint = "/addnum";            // Endpoint must match server endpoint

    var http = new XMLHttpRequest();
    var file = uploadInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var image = document.createElement('img');
        image.src = e.target.result;
        image.style.position = 'absolute';
        image.style.top = '50%';
        image.style.left = '50%';
        image.style.transform = 'translate(-50%, -50%)';
        image.style.width = '50%*(image.naturalWidth/image.naturalHeight)';
        image.style.height = '50%';
        image.style.border = '1000px solid rgba(255,255,255,0.5)';//'20px solid #003366';
        document.body.appendChild(image);
        var w = image.naturalWidth;
        alert("Allow us to use this image for future training?");
        var whiteBox = document.createElement('div');
        whiteBox.style.width = '50%';
        whiteBox.style.height = '5px';
        whiteBox.style.background = '#fff';
        whiteBox.style.position = 'absolute';
        whiteBox.style.top = '25%';
        whiteBox.style.left = '25%';
        document.body.appendChild(whiteBox);
        var top = 25;
        var direction = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (top == 75) {
                direction = -1;
            } else if (top == 25) {
                direction = 1;
            }
            top = top + direction;
            whiteBox.style.top = top + '%';
        }
        setTimeout(function() {
            clearInterval(id);
            document.body.removeChild(whiteBox);
        }, 3500);
        image.crossOrigin = 'Anonymous';
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        context.drawImage(image, 0, 0);
        var dataURL = canvas.toDataURL('image/jpeg');
        //alert(dataURL);
        //var en = imgToBase64(dogImage);
        var payloadObj = { "pic" : dataURL };
        var payloadJSON = JSON.stringify(payloadObj);


        // prepare POST request
        http.open("POST", url+endpoint, true);
        http.setRequestHeader("Content-Type", "application/json");

        http.onreadystatechange = function() {
            var DONE = 4;       // 4 means the request is done.
            var OK = 200;       // 200 means a successful return.
            if (http.readyState == DONE && http.status == OK && http.responseText) {

                // JSON string
                var replyString = http.responseText;

                // convert JSON string into JavaScript object
                var obj = JSON.parse(replyString);

                document.getElementById("result").innerHTML = obj["pic"];
                var dogLabel = document.createElement('div');
                dogLabel.innerHTML = obj["pic"];
                dogLabel.style.position = 'absolute';
                dogLabel.style.top = '5%';
                dogLabel.style.left = '50%';
                dogLabel.style.transform = 'translate(-50%, -50%)';
                dogLabel.style.fontSize = '50px';
                dogLabel.style.fontFamily = 'sans-serif';
                dogLabel.style.fontWeight = 'bold';
                dogLabel.style.color = '#003366';
                dogLabel.style.opacity = '0';
                dogLabel.style.transition = 'opacity 2s';
                document.body.appendChild(dogLabel);
                setTimeout(function() {
                    dogLabel.style.opacity = '1';
                }, 1000);
            }
        };

        // Send request
        http.send(payloadJSON);
    };
    reader.readAsDataURL(file);

});
function getResult() {

    var url = "http://localhost:8000";   // The URL and the port number must match server-side
    var endpoint = "/result";            // Endpoint must match server endpoint

    var http = new XMLHttpRequest();

    // prepare GET request
    http.open("GET", url+endpoint, true);

    http.onreadystatechange = function() {
        var DONE = 4;       // 4 means the request is done.
        var OK = 200;       // 200 means a successful return.
        if (http.readyState == DONE && http.status == OK && http.responseText) {

            // JSON string
            var replyString = http.responseText;

            //document.getElementById("result").innerHTML = "JSON received: " + replyString;
            //document.getElementById("result").innerHTML += "<br>";

            // convert JSON string into JavaScript object and get the scores
            var obj = JSON.parse(replyString);
            document.getElementById("result").innerHTML = "Accuracy: " + obj["result accuracy"];
            document.getElementById("result").innerHTML += "<br>";
            document.getElementById("result").innerHTML += "Precision: " + obj["result precision"];
            document.getElementById("result").innerHTML += "<br>";
            document.getElementById("result").innerHTML += "Recall: " + obj["result recall"];
        }
    };
    // Send request
    http.send();
}
function toDataURL(src, callback){
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function(){
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        context.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL('image/jpeg');
        callback(dataURL);
    };
    image.src = src;
}

/*function addNumber() {

    var url = "http://localhost:8000";   // The URL and the port number must match server-side
    var endpoint = "/addnum";            // Endpoint must match server endpoint

    var http = new XMLHttpRequest();
    var dogImage = document.createElement('img');
    dogImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mars_23_aug_2003_hubble.jpg/220px-Mars_23_aug_2003_hubble.jpg';
    //var dog = imgToBase64(dogImage);
    var reader = new FileReader();
    var file = new File([''], 'blank.txt', {type: 'text/plain', lastModified: Date.now()});
    //reader.readAsDataURL(file);
    //toDataURL('https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mars_23_aug_2003_hubble.jpg/220px-Mars_23_aug_2003_hubble.jpg', function(dataURL){
        //alert(dataURL);});

    var image = new Image();
    image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mars_23_aug_2003_hubble.jpg/220px-Mars_23_aug_2003_hubble.jpg';
    image.crossOrigin = 'Anonymous';
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    context.drawImage(image, 0, 0);
    var dataURL = canvas.toDataURL('image/jpeg');
    alert(dataURL);
    //var en = imgToBase64(dogImage);
    var payloadObj = { "pic" : dataURL };
    var payloadJSON = JSON.stringify(payloadObj);


    // prepare POST request
    http.open("POST", url+endpoint, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function() {
        var DONE = 4;       // 4 means the request is done.
        var OK = 200;       // 200 means a successful return.
        if (http.readyState == DONE && http.status == OK && http.responseText) {

            // JSON string
            var replyString = http.responseText;

            // convert JSON string into JavaScript object
            var obj = JSON.parse(replyString);

            document.getElementById("result").innerHTML = obj["pic"];

        }
    };

    // Send request
    http.send(payloadJSON);
}
/*uploadInput.addEventListener('change', function() {
    var url = "http://localhost:8000";   // The URL and the port number must match server-side
    var endpoint = "/addnum";            // Endpoint must match server endpoint
    var http = new XMLHttpRequest();
    var file = uploadInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var image = document.createElement('img');
        image.src = e.target.result;
        image.style.position = 'absolute';
        image.style.top = '80%';
        image.style.left = '52%';
        image.style.transform = 'translate(-50%, -50%)';
        image.style.width = '100px';
        image.style.height = '100px';
        document.body.appendChild(image);
        document.body.style.backgroundImage.opacity = '0.5';
    };
    //reader.readAsDataURL(file);
    var payloadObj = { "pic" :  (reader.readAsDataURL(file)) };
    var payloadJSON = JSON.stringify(payloadObj);


    // prepare POST request
    http.open("POST", url+endpoint, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function() {
        var DONE = 4;       // 4 means the request is done.
        var OK = 200;       // 200 means a successful return.
        if (http.readyState == DONE && http.status == OK && http.responseText) {

            // JSON string
            var replyString = http.responseText;

            // convert JSON string into JavaScript object
            var obj = JSON.parse(replyString);

            document.getElementById("result").innerHTML = obj["pic"];

        }
    };

    // Send request
    http.send(payloadJSON);
});*/
/*function addNumber() {

    var dogImage = document.createElement('img');
    dogImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mars_23_aug_2003_hubble.jpg/220px-Mars_23_aug_2003_hubble.jpg';
    var en = imgToBase64(dogImage);
    var payloadObj = { "pic" :  en };
    var payloadJSON = JSON.stringify(payloadObj);


    // prepare POST request
    http.open("POST", url+endpoint, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function() {
        var DONE = 4;       // 4 means the request is done.
        var OK = 200;       // 200 means a successful return.
        if (http.readyState == DONE && http.status == OK && http.responseText) {

            // JSON string
            var replyString = http.responseText;

            // convert JSON string into JavaScript object
            var obj = JSON.parse(replyString);

            document.getElementById("result").innerHTML = obj["pic"];

        }
    };

    // Send request
    http.send(payloadJSON);
}*/

/*var fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
document.body.appendChild(fileInput);
var image = document.createElement('img');
document.body.appendChild(image);
fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});
/*var canvas = document.createElement('canvas');
canvas.width = image.width;
canvas.height = image.height;
var ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0);
var dataURL = canvas.toDataURL();
var a = document.createElement('a');
a.href = dataURL;
a.save = 'image.jpg';
a.click();*/

/*var imageUpload = document.createElement('input');
imageUpload.type = 'file';
imageUpload.id = 'imageUpload';
document.body.appendChild(imageUpload);
var imageUploadButton = document.createElement('button');
imageUploadButton.innerHTML = 'Upload Image';
imageUploadButton.onclick = function() {
    var file = document.getElementById('imageUpload').files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            var imageData = context.getImageData(0, 0, image.width, image.height);
            var data = imageData.data;
            var imageArray = [];
            for (var i = 0; i < data.length; i += 4) {
                imageArray.push(data[i]);
                imageArray.push(data[i + 1]);
                imageArray.push(data[i + 2]);
            }
            var imageString = imageArray.join(',');
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8000/upload', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                image: imageString
            }));
        };
    };
    reader.readAsDataURL(file);
};
document.body.appendChild(imageUploadButton);*/

/*
var uploadImage = document.createElement('input');
uploadImage.type = 'file';
uploadImage.accept = 'image/*';
uploadImage.onchange = function() {
    var file = uploadImage.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var image = document.createElement('img');
        image.src = e.target.result;
        document.body.appendChild(image);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            image: e.target.result
        }));
    };
    reader.readAsDataURL(file);
};
document.body.appendChild(uploadImage);*/
