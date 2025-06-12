from flask import Flask, render_template, request, jsonify
from keras.models import load_model
from keras.preprocessing import image
from PIL import Image, ImageOps, ImageFilter
import os
import numpy as np
from datetime import datetime
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'static/uploads/'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

logging.basicConfig(filename='prediction.log', level=logging.INFO)

try:
    model = load_model("model_bisindo_70.h5")
    print("[INFO] Model berhasil dimuat.")
except Exception as e:
    print("[ERROR] Gagal memuat model:", e)
    model = None

class_labels = [chr(i) for i in range(65, 91)]  # ['A', ..., 'Z']

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=['GET'])
def main():
    return render_template("../frontend/dist/index.html")

@app.route("/predict", methods=['POST'])
def predict():
    if model is None:
        return jsonify({'message': 'Model tidak tersedia'}), 500

    if 'file' not in request.files:
        return jsonify({'message': 'File tidak ditemukan'}), 400

    file = request.files['file']
    if file and allowed_file(file.filename):
        try:
            # Simpan file
            img_check = Image.open(file)
            img_check.verify()
            ext = file.filename.rsplit('.', 1)[1].lower()
            filename = datetime.now().strftime("%Y%m%d%H%M%S") + "." + ext
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.seek(0)
            file.save(filepath)

            # Proses gambar
            img = image.load_img(filepath, target_size=(224, 224))
            img = img.convert("RGB")
            img = ImageOps.autocontrast(img)
            img = ImageOps.equalize(img)
            img = img.filter(ImageFilter.GaussianBlur(radius=1))
            img = img.filter(ImageFilter.SHARPEN)
            img = img.filter(ImageFilter.EDGE_ENHANCE_MORE)

            img_array = image.img_to_array(img)
            img_array = img_array / 255.0 
            img_array = np.expand_dims(img_array, axis=0)

            # Prediksi
            pred = model.predict(img_array)
            pred_index = int(np.argmax(pred))
            prediction = class_labels[pred_index]
            confidence = float(np.max(pred))

            logging.info(f"[{datetime.now()}] Predicted: {prediction} ({confidence:.4f})")

            return jsonify({
                'prediction': prediction,
                'confidence': confidence,
                'img_url': filepath
            })

        except Exception as e:
            print("[ERROR] Saat prediksi:", e)
            return jsonify({'message': 'Gagal memproses gambar'}), 500

    return jsonify({'message': 'Format file tidak valid'}), 400

if __name__ == '__main__':
    app.run(debug=True)
