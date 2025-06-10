
from flask import Flask, render_template, request, jsonify
from keras.models import load_model
from keras.preprocessing import image
import os
import numpy as np
from PIL import Image
from datetime import datetime

app = Flask(__name__)


# Load model
model = load_model("model_bisindo.h5")

UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=['GET'])
def main():
    return render_template("index.html")

@app.route("/predict", methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'message': 'file tidak ditemukan'}), 400
    
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = datetime.now().strftime("%Y%m%d%H%M%S") + ".png"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        img = Image.open(filepath).convert('RGB')
        img = img.resize((128, 128))  
        img_array = np.array(img) / 127.5 - 1 
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        pred = model.predict(img_array)
        # class labal
        class_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        prediction = class_labels[np.argmax(pred)]

        return jsonify({
            'prediction': prediction,
            'img_url': filepath
        })
    return jsonify({'message': 'format tidak valid'}), 400

if __name__ == '__main__':
    app.run(debug=True)
