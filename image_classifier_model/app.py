import tensorflow as tf
import numpy as np
from sanic import Sanic
from sanic.response import json
from PIL import Image
import base64
import io

app = Sanic("PYTHON_API")
model_car_part = tf.keras.models.load_model("./chepo_car_part_cnn_model")
model_damage_level = tf.keras.models.load_model("./chepo_damage_level_cnn_model")
CAR_PART_CLASSES = ["Front Bumper", "Font Hood", "Rear Bumper", "Side Door"]
DAMAGE_LEVEL_CLASSES = ["Minor Damage", "Moderate Damage", "Severe Damage"]
IMG_SIZE = 150

@app.post("/image-classifier")
def classify_car_part(request):
    content = request.json
    # get base64 string from request
    image_base64 = content["image"]
    # print(image_base64)
    #convert base64 string to image
    image = Image.open(io.BytesIO(base64.decodebytes(bytes(image_base64, "utf-8"))))
    image.save('./image_to_model/test-image.jpg', 'JPEG')
    # resize image
    image = image.resize((IMG_SIZE, IMG_SIZE))
    # convert to np.ndarray & normalization
    image_arr = np.array(image)
    image_arr = image_arr / 255.
    image_arr = np.expand_dims(image_arr, axis=0)  # (150, 150) -> (1, 150, 150)

    classifier_car_part_result = model_car_part.predict(image_arr)
    print("car park classifier result ------>", classifier_car_part_result)
    car_part_class_index = tf.argmax(classifier_car_part_result, axis=-1).numpy()
    print("car part result ------>", car_part_class_index)
    car_part_result = CAR_PART_CLASSES[car_part_class_index[0]]

    classifier_damage_level_result = model_damage_level.predict(image_arr)
    print("damage level classifier result ------>", classifier_damage_level_result)
    damage_level_class_index = tf.argmax(classifier_damage_level_result, axis=-1).numpy()
    print("damage level result ------>", damage_level_class_index)
    damage_level_result = DAMAGE_LEVEL_CLASSES[damage_level_class_index[0]]

    return json({ "car_part_result": car_part_result, "damage_level_result": damage_level_result })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)