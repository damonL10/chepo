import tensorflow as tf
import matplotlib.pyplot as plt
import os

CLASSES = ["minor_damage", "moderate_damage", "severe_damage"]
IMG_SIZE = 150

def preprocess(feature_batch, label_batch):
  new_feature_batch = tf.cast(feature_batch, tf.float32)
  new_feature_batch = new_feature_batch / 255
  new_label_batch = tf.one_hot(label_batch, len(CLASSES))
  return new_feature_batch, new_label_batch


def create_cnn_model_damage_level() -> tf.keras.Model:
  base_model =tf.keras.applications.Xception(
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
        include_top=False,
        weights='imagenet'
  )
  base_model.trainable = False

  x = base_model.output
  x = tf.keras.layers.GlobalAvgPool2D()(x)
  output_layer = tf.keras.layers.Dense(len(CLASSES), activation="softmax")(x)
  model = tf.keras.Model(inputs=base_model.input, outputs=output_layer, name="chepo_cnn_model_damage_level")
  model.summary()
  return model


def train() -> None:
  # Import dataset
  dataset = tf.keras.utils.get_file(
    os.path.abspath('./data/car_damage_labelled_data.zip'),
    cache_subdir=os.path.abspath('.'),
    origin='',
    extract=True)

  dataset_path = os.path.abspath('.')+'/car_damage_labelled_data/'
  # print("dataset path ------>", dataset_path)

  train_dataset = tf.keras.utils.image_dataset_from_directory(dataset_path, color_mode="rgb", batch_size=32, image_size=(IMG_SIZE, IMG_SIZE), shuffle=True, seed=10, subset="training", validation_split=0.2)
  valid_dataset = tf.keras.utils.image_dataset_from_directory(dataset_path, color_mode="rgb", batch_size=32, image_size=(IMG_SIZE, IMG_SIZE), shuffle=True, seed=10, subset="validation", validation_split=0.2)
  # print("train dataset ------>", train_dataset)
  # print("valid dataset ------>", valid_dataset)

  # for feature_batch, label_batch in train_dataset.take(1):
  #   first_image = feature_batch[0]
  #   first_label = label_batch[0]
  #   image = tf.cast(first_image, tf.float32)
  #   image = image / 255
  #   print("label ------>", CLASSES[first_label.numpy()])
  #   print()
  #   plt.imshow(image)
  #   plt.show()

  # Pre-process dataset (i.e. batch dataset)
  train_dataset = train_dataset.map(preprocess).prefetch(tf.data.AUTOTUNE)
  valid_dataset = valid_dataset.map(preprocess).prefetch(tf.data.AUTOTUNE)

  # Create CNN model
  model = create_cnn_model_damage_level()
  opt = tf.keras.optimizers.SGD()
  loss = tf.keras.losses.CategoricalCrossentropy()
  model.compile(optimizer=opt, loss=loss, metrics=["accuracy"])
  model.fit(train_dataset, epochs=30, validation_data=valid_dataset)
  model.save("chepo_damage_level_cnn_model", overwrite=True)

if __name__ == "__main__":
  train()