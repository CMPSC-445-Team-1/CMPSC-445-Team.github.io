# Server.py
# Author: Andrew Klawa
# 
import test_model_python
import ml
import base64
from io import BytesIO
from PIL import Image
# import Flask
import flask_cors
from flask import Flask, send_from_directory, request, json
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)


# Send index.html
@app.route('/', methods=["GET"])
@cross_origin()
@app.route('/index.html', methods=["GET"])
def get_index():
    #return contents of index.html
    return send_from_directory('', 'index.html', mimetype='text/html')

# Send main.js
@app.route('/main.js', methods=["GET"])
def get_main():
     #return contents of main.js
    return send_from_directory('', 'main.js', mimetype='text/javascript')
# Send the result from machine learning
# Endpoint is "result"
@app.route('/result', methods=["GET"])
def result():

    # call the prediction function in ml.py
    result = ml.prediction()
    
    # make a dictionary from the result
    resultDict = { "model": "kNN", "result accuracy": result[0], "result precision": result[1], "result recall": result[2] }
    
    # convert dictionary to JSON string
    resultString = json.dumps(resultDict)
    return resultString

# Endpoint addnum
@app.route('/addnum', methods=["POST"])
def add_num():
    
    # get the payload as dictionary from client
    receivedDict = request.get_json()
    
    # From the dictionary get the value
    numToAdd = receivedDict["pic"]
    numToAdd = numToAdd.replace("data:image/jpeg;base64,","");
    image_64_decode = base64.b64decode(numToAdd)
    im_file = BytesIO(image_64_decode)  
    img = Image.open(im_file)
    results = test_model_python.get_breed(img)
    # make a dictionary from the result 
    #image = open('Huskiesatrest.jpg', 'rb') #open binary file in read mode
    #image_read = image.read()
    #image_64_encode = base64.urlsafe_b64encode(image_read)
    stri = "yeah"

    #stri = image_64_encode
    # in this example, the server always replies whatever the client sent + 1
    resultDict = { "pic": results }
    
    # convert dictionary to JSON string
    resultString = json.dumps(resultDict)

    return resultString
# Run the server
if __name__ == '__main__':
    
    # train the model
    ml.train()
    
    # start the server
    app.run(port = 8000)
