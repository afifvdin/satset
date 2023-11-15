import os
import io
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from google.cloud import storage

folder = "/tmp/"
BUCKET_NAME = "unvolds-bucket"
PROJECT_ID = "tim-riset-bu-rima"


def download_google_net_file():
    GCS_MODEL_FILE = "GoogleNet.h5"

    client = storage.Client(PROJECT_ID)
    bucket = client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(GCS_MODEL_FILE)

    if not os.path.exists(folder):
        os.makedirs(folder)
    blob.download_to_filename(folder + "local_google_net.h5")


def download_mobile_net_file():
    GCS_MODEL_FILE = "MobileNet.h5"

    client = storage.Client(PROJECT_ID)
    bucket = client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(GCS_MODEL_FILE)

    if not os.path.exists(folder):
        os.makedirs(folder)
    blob.download_to_filename(folder + "local_mobile_net.h5")


def download_qx_net_file():
    GCS_MODEL_FILE = "QXNet.h5"

    client = storage.Client(PROJECT_ID)
    bucket = client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(GCS_MODEL_FILE)

    if not os.path.exists(folder):
        os.makedirs(folder)
    blob.download_to_filename(folder + "local_qx_net.h5")


def download_xception_net_file():
    GCS_MODEL_FILE = "Xception.h5"

    client = storage.Client(PROJECT_ID)
    bucket = client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(GCS_MODEL_FILE)

    if not os.path.exists(folder):
        os.makedirs(folder)
    blob.download_to_filename(folder + "local_xception_net.h5")


def download_yedroudj_net_file():
    GCS_MODEL_FILE = "YedroudjNet.h5"

    client = storage.Client(PROJECT_ID)
    bucket = client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(GCS_MODEL_FILE)

    if not os.path.exists(folder):
        os.makedirs(folder)
    blob.download_to_filename(folder + "local_yedroudj_net.h5")


def predict(request):
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)
    headers = {"Access-Control-Allow-Origin": "*"}

    chosen_model = None

    images = request.files.getlist("images")
    mode = request.form["mode"]

    if len(images) < 1:
        return {"success": False, "mode": mode}

    TARGET_CLASS = ["Normal", "Steganography"]

    if mode == "google_net":
        download_google_net_file()
        chosen_model = load_model("/tmp/local_google_net.h5")
    elif mode == "mobile_net":
        download_mobile_net_file()
        chosen_model = load_model("/tmp/local_mobile_net.h5")
    elif mode == "qx_net":
        download_qx_net_file()
        chosen_model = load_model("/tmp/local_qx_net.h5")
    elif mode == "xception_net":
        download_xception_net_file()
        chosen_model = load_model("/tmp/local_xception_net.h5")
    elif mode == "yedroudj_net":
        download_yedroudj_net_file()
        chosen_model = load_model("/tmp/local_yedroudj_net.h5")

    labels = []

    for file in images:
        file_contents = file.read()
        cls_arr = np.expand_dims(
            img_to_array(load_img(io.BytesIO(file_contents), target_size=(256, 256)))
            / 255.0,
            0,
        )
        result = chosen_model.predict(cls_arr)
        labels.append(TARGET_CLASS[np.argmax(result, axis=1)[0]])

    return (
        {
            "success": True,
            "labels": labels,
        },
        200,
        headers,
    )
