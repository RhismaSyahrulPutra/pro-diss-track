# Pengenalan Bahasa Isyarat Bisindo
![foto](https://mediabangsa.co.id/wp-content/uploads/2022/05/Bisindo.webp)
## 1. Project Overview
Tujuan dari prioject ini untuk membangun model Machine Learning untuk mengenali gerakan Bahasa Isyarat Indonesia (BISINDO). Model ini dilatih pada dataset gambar yang mewakili berbagai tanda BISINDO dan menggunakan teknik pembelajaran mendalam untuk mengklasifikasikan gerakan pada tiap huruf. Proyek ini menggunakan Convolutional Neural Networks (CNN) yang dibangun dengan TensorFlow untuk mencapai akurasi tinggi dalam pengenalan gerakan.
### Latar Belakang
Bahasa Isyarat Indonesia (BISINDO) merupakan alat komunikasi penting bagi komunitas tunarungu di Indonesia. Namun, meskipun penggunaannya sangat jarang bagi beberapa orang, masih banyak tantangan dalam memperkenalkan dan mengedukasi masyarakat luas tentang bahasa isyarat ini. Salah satu kendala utama adalah kurangnya media pembelajaran yang efisien dan interaktif untuk memperkenalkan BISINDO kepada orang-orang yang tidak fasih dalam bahasa isyarat.

Dengan perkembangan teknologi CNN, khususnya melalui model pembelajaran mesin (machine learning), hal ini membuka peluang baru untuk mempermudah dan mempercepat pemahaman bahasa isyarat. Oleh karena itu, proyek ini dikembangkan untuk memberikan solusi berupa model yang dapat mengenali gerakan BISINDO. yang dapat digunakan dalam berbagai aplikasi, mulai dari pendidikan hingga aksesibilitas teknologi bagi komunitas tunarungu.
### Urgensi Proyek
Proyek ini sangat relevan dan penting dalam rangka meningkatkan aksesibilitas bagi masyarakat tunarungu di Indonesia. Dengan model pengenalan bahasa isyarat berbasis **Machine Learning**, proses pembelajaran bahasa isyarat menjadi lebih mudah dan cepat. Model ini dapat digunakan untuk:
1. Pendidikan, dengan mempermudah siswa tunarungu dalam mempelajari bahasa isyarat melalui aplikasi interaktif.
2. Peningkatan Teknologi, Memperkenalkan penggunaan teknologi pengenalan pola dalam aplikasi sosial yang inklusif dan membantu menciptakan lingkungan yang lebih inklusif bagi penyandang disabilitas.

### Refrensi yang Relevan
- Limantara, M. A., & Tristianto, D. (2024). SIBI Alphabet Detection System Based on Convolutional Neural Network (CNN) Method as Learning Media. IOTA Journal, 4(1), 143-161.
- Fitriani, L., Kurniadi, D., & Rajab, I. S. (2025). Implementation of Machine Learning Model to Detect Sign Language Movement in SIBI Learning Media. Teknika, 14(1), 57-65.
- Thiracitta, N., & Gunawan, H. (2021). SIBI sign language recognition using convolutional neural network combined with transfer learning and non-trainable parameters. Procedia Computer Science, 179, 72-80.

## 2. Data Preparation 
## Dataset
Dataset yang digunakan dalam proyek ini berasal dari beberapa dataset di Kaggle terkait dengan Bahasa Isyarat Indonesia (BISINDO):
| No  |  Nama Dataset | Sumber  | Total foto (huruf A - Z)  |   
|---|---|---|---|
| 1  | Indonesian Sign Language BISINDO (Agung)  | https://www.kaggle.com/datasets/agungmrf/indonesian-sign-language-bisindo  | 11598   |   
| 2  | Indonesian Sign Language BISINDO (IdhamOzi)  | https://www.kaggle.com/datasets/idhamozi/indonesian-sign-language-bisindo  | 2079  |   
| 3  | Abjad Bahasa Isyarat Indonesia BISINDO  |https://www.kaggle.com/datasets/meisyavira/abjad-bahasa-isyarat-indonesia-bisindo   | 650  |   
## Split Dataset
setelah menyatukan dataset, dilakukan split data sebanyak 80% untuk train dan 20% untuk test dengan total:
- Train = 9176 gambar
- Test = 2294 gambar

## Data Augmentasi
Data augmentasi adalah teknik yang digunakan untuk memperluas ukuran dataset dengan memodifikasi gambar asli secara acak, yang dapat meningkatkan performa model dan mengurangi overfitting. Pada proyek ini, data augmentasi dilakukan dengan menggunakan ImageDataGenerator dari Keras. Berikut merupakan teknik augmentasi yang digunakan:
1. Rescale: Menormalisasi gambar dengan membagi nilai piksel dengan 255, sehingga piksel gambar berada dalam rentang [0,1].
2. Rotasi gambar: Mengubah gambar dengan rotasi acak hingga 5 derajat untuk memberi variasi sudut pandang.
3. Shear (Pergeseran): Menerapkan pergeseran gambar secara acak dalam kisaran 5%.
4. Pembalikan horizontal: Membalik gambar secara horizontal untuk memperkenalkan variasi dalam orientasi gambar.
5. Zoom: Melakukan zoom acak pada gambar dengan kisaran 10%.


Untuk dataset train, augmentasi dilakukan pada gambar. Sementara untuk dataset validasi, hanya dilakukan penyesuaian skala (rescale) tanpa augmentasi. Dengan begitu ini memungkinkan model untuk mempelajari berbagai variasi gerakan dalam kondisi yang berbeda, meningkatkan kemampuan model untuk mengenali gerakan BISINDO dengan lebih baik.


## 3. Modelling
### Train Model 
pada tahap ini dilakukan konfigurasi terlebih dahulu sebelum memulai train model dengan:
- IMG_SIZE = 224 (Ukuran gambar yang akan digunakan dalam model)
- EPOCH = 50 (Jumlah iterasi untuk melatih model)
- BATCH_SIZE = 32 (Jumlah sampel yang diproses sebelum model diperbarui)

#### Arsitektur Model CNN
Arsitektur model ini dibangun menggunakan Convolutional Neural Networks (CNN), yang sangat efektif untuk tugas klasifikasi gambar. Model ini terdiri dari tiga lapisan konvolusional dengan jumlah filter yang berbeda, yaitu 32, 64, dan 128, yang berfungsi untuk mengekstraksi fitur dari gambar. Setelah lapisan konvolusional, terdapat lapisan fully connected dengan 128 unit Dense yang menggunakan fungsi aktivasi ReLU. Untuk mengurangi overfitting, diterapkan juga Dropout dengan nilai 0.5 pada lapisan ini.

Optimizer yang digunakan adalah Adam dengan learning rate 0.0001. Penggunaan Adam sebagai optimizer dipilih karena algoritma ini terbukti efisien dalam mengoptimalkan model dengan cepat dan stabil, serta dapat menangani data yang memiliki banyak parameter dengan baik.

## 4.Hasil Training
Setelah menjalankan training selama 50 epoch, model menunjukkan hasil yang cukup baik. Pada epoch terakhir, model mencapai akurasi pelatihan (training accuracy) sebesar 77.62%, dengan loss sebesar 0.6554. Sementara itu, akurasi validasi (validation accuracy) mencapai 88.10%, menunjukkan kemampuan model yang baik dalam menggeneralisasi data yang tidak terlihat sebelumnya. Loss validasi (validation loss) tercatat sebesar 0.4198, dengan begitu dapat disimpulkan bahwa model tidak mengalami overfitting meskipun jumlah epoch yang digunakan relatif banyak.
Hasil ini menunjukkan bahwa model berhasil belajar dengan baik dan memiliki potensi untuk mengenali gerakan Bahasa Isyarat Indonesia (BISINDO) dengan akurasi yang tinggi.

### Confusion matrix
Berdasarkan Confusion matrix menunjukkan kinerja model dalam mengklasifikasikan gambar berdasarkan label yang benar dan prediksi model. Setiap baris mewakili kelas yang sebenarnya (True Label), sementara setiap kolom menunjukkan kelas yang diprediksi oleh model (Predicted Label). Nilai diagonal utama (dari kiri atas ke kanan bawah) menunjukkan jumlah prediksi yang benar untuk setiap kelas.

Dari confusion matrix yang dihasilkan, kita dapat melihat bahwa model menunjukkan performa yang sangat baik dalam mengklasifikasikan huruf-huruf BISINDO, dengan sebagian besar nilai berada di sepanjang diagonal, yang menandakan prediksi yang benar. Beberapa kesalahan kecil terjadi pada kelas-kelas tertentu, namun secara keseluruhan, model telah mengenali sebagian besar gerakan dengan tepat.
![image](https://github.com/RhismaSyahrulPutra/pro-diss-track/blob/Rasyid/machine-learning/static/confusion-matrix.png?raw=true)
### Classification Report
Classification report memberikan metrik yang lebih mendalam terkait kinerja model. Berikut adalah penjelasan beberapa metrik yang terkandung dalam classification report:
- Precision: Mengukur proporsi prediksi yang benar di antara semua prediksi positif untuk masing-masing kelas.
- Recall: Mengukur proporsi dari total sampel positif yang berhasil dikenali oleh model.
- F1-Score: Rata-rata harmonis antara precision dan recall, memberikan gambaran seimbang tentang kinerja model.
- Support: Jumlah data yang ada di setiap kelas yang diuji.
- Berdasarkan classification report yang dihasilkan, kita dapat melihat bahwa model memiliki precision, recall, dan f1-score yang sangat tinggi, dengan sebagian besar metrik berada di atas 0.85 untuk setiap kelas, dan rata-rata accuracy keseluruhan mencapai 88%.
- Secara keseluruhan, baik confusion matrix maupun classification report menunjukkan bahwa model telah berhasil mengenali dan mengklasifikasikan gerakan Bahasa Isyarat Indonesia (BISINDO) dengan baik, dengan tingkat akurasi yang cukup tinggi. 

Berikut meruapkan tabelnya:
| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| A     | 0.91      | 0.93   | 0.92     | 88    |
| B     | 0.92      | 0.91   | 0.91     | 88      |
| C     | 0.76      | 0.85   | 0.80     | 86      |
| D     | 0.92      | 0.77   | 0.84     | 88      |
| E     | 0.91      | 0.92   | 0.92     | 88      |
| F     | 0.93      | 0.94   | 0.94     | 89      |
| G     | 0.93      | 0.97   | 0.95     | 90      |
| H     | 0.89      | 0.86   | 0.88     | 87      |
| I     | 0.65      | 0.86   | 0.74     | 90      |
| J     | 0.88      | 0.82   | 0.85     | 90      |
| K     | 0.92      | 0.87   | 0.89     | 89      |
| L     | 0.95      | 0.88   | 0.91     | 89      |
| M     | 0.81      | 0.89   | 0.85     | 89      |
| N     | 0.86      | 0.81   | 0.83     | 88      |
| O     | 0.87      | 0.98   | 0.92     | 89      |
| P     | 0.75      | 0.94   | 0.84     | 89      |
| Q     | 0.98      | 0.69   | 0.81     | 88      |
| R     | 0.98      | 0.87   | 0.93     | 87      |
| S     | 0.86      | 0.84   | 0.85     | 87      |
| T     | 0.94      | 0.91   | 0.93     | 90      |
| U     | 0.98      | 0.92   | 0.95     | 89      |
| V     | 0.80      | 0.92   | 0.86     | 89      |
| W     | 0.98      | 0.97   | 0.97     | 90      |
| X     | 0.98      | 0.83   | 0.87     | 89      |
| Y     | 0.92      | 0.89   | 0.91     | 82      |
| Z     | 0.92      | 0.96   | 0.94     | 80      |
| **Accuracy** | **0.88** | **-** | **-** | **2294** |
| **Macro avg** | **0.89** | **0.88** | **0.88** | **2294** |
| **Weighted avg** | **0.89** | **0.88** | **0.88** | **2294** |

## Requirements
Beberapa framework yang diperlukan untuk menjalankan kode:
- TensorFlow (Keras)
- NumPy
- Pandas
- Matplotlib
- Scikit-learn
- Pillow
- Seaborn

Instal semua dependensi dengan menjalankan perintah berikut:

```bash
pip install -r requirements.txt
```
