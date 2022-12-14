# -*- coding: utf-8 -*-
"""
Created on Thu Dec  1 21:30:45 2022

@author: toddk
"""
import tensorflow as tf
from keras.models import load_model
import numpy as np
print("run")
loaded_model = load_model("model.tf")
print("loaded")
dog_cats = [
" Abyssinian " ,
" Afghan_hound " ,
" African_hunting_dog " ,
" Airedale " ,
" American_Staffordshire_terrier " ,
" Appenzeller " ,
" Australian_terrier " ,
" Bedlington_terrier " ,
" Bengal " ,
" Bernese_mountain_dog " ,
" Birman " ,
" Blenheim_spaniel " ,
" Bombay " ,
" Border_collie " ,
" Border_terrier " ,
" Boston_bull " ,
" Bouvier_des_Flandres " ,
" Brabancon_griffon " ,
" British Shorthair " ,
" Brittany_spaniel " ,
" Cardigan " ,
" Chesapeake_Bay_retriever " ,
" Chihuahua " ,
" Dandie_Dinmont " ,
" Doberman " ,
" Egyptian Mau " ,
" English_foxhound " ,
" English_setter " ,
" English_springer " ,
" EntleBucher " ,
" Eskimo_dog " ,
" French_bulldog " ,
" German_shepherd " ,
" German_shorthaired_pointer " ,
" Gordon_setter " ,
" Great_Dane " ,
" Great_Pyrenees " ,
" Greater_Swiss_Mountain_dog " ,
" Ibizan_hound " ,
" Irish_setter " ,
" Irish_terrier " ,
" Irish_water_spaniel " ,
" Irish_wolfhound " ,
" Italian_greyhound " ,
" Japanese_spaniel " ,
" Kerry_blue_terrier " ,
" Labrador_retriever " ,
" Lakeland_terrier " ,
" Leonberg " ,
" Lhasa " ,
" Maine Coon " ,
" Maltese_dog " ,
" Mexican_hairless " ,
" Newfoundland " ,
" Norfolk_terrier " ,
" Norwegian_elkhound " ,
" Norwich_terrier " ,
" Old_English_sheepdog " ,
" Pekinese " ,
" Pembroke " ,
" Persian " ,
" Pomeranian " ,
" Ragdoll " ,
" Rhodesian_ridgeback " ,
" Rottweiler " ,
" Russian Blue " ,
" Saint_Bernard " ,
" Saluki " ,
" Samoyed " ,
" Scotch_terrier " ,
" Scottish_deerhound " ,
" Sealyham_terrier " ,
" Shetland_sheepdog " ,
" ShihTzu " ,
" Siamese " ,
" Siberian_husky " ,
" Sphynx " ,
" Staffordshire_bullterrier " ,
" Sussex_spaniel " ,
" Tibetan_mastiff " ,
" Tibetan_terrier " ,
" Walker_hound " ,
" Weimaraner " ,
" Welsh_springer_spaniel " ,
" West_Highland_white_terrier " ,
" Yorkshire_terrier " ,
" affenpinscher " ,
" american bulldog " ,
" american pit bull terrier " ,
" basenji " ,
" basset " ,
" beagle " ,
" blackandtan_coonhound " ,
" bloodhound " ,
" bluetick " ,
" borzoi " ,
" boxer " ,
" briard " ,
" bull_mastiff " ,
" cairn " ,
" chow " ,
" clumber " ,
" cocker_spaniel " ,
" collie " ,
" curlycoated_retriever " ,
" dhole " ,
" dingo " ,
" english cocker spaniel " ,
" flatcoated_retriever " ,
" giant_schnauzer " ,
" golden_retriever " ,
" groenendael " ,
" havanese " ,
" keeshond " ,
" kelpie " ,
" komondor " ,
" kuvasz " ,
" malamute " ,
" malinois " ,
" miniature_pinscher " ,
" miniature_poodle " ,
" miniature_schnauzer " ,
" otterhound " ,
" papillon " ,
" pug " ,
" redbone " ,
" schipperke " ,
" scottish terrier " ,
" shiba inu " ,
" silky_terrier " ,
" softcoated_wheaten_terrier " ,
" standard_poodle " ,
" standard_schnauzer " ,
" toy_poodle " ,
" toy_terrier " ,
" vizsla " ,
" whippet " ,
" wirehaired_fox_terrier "
]
cats = ['Egyptian Mau', 'Abyssinian', 'British Shorthair', 'Birman', 'Maine Coon', 'Bombay', 'Russian Blue', 'Ragdoll', 'Siamese', 'Persian', 'Sphynx', 'Bengal']
def get_breed(img1):
    img1.save("temp.jpg")
    img = tf.keras.utils.load_img("temp.jpg", target_size=(224, 224))
    #img1 = tf.image.resize(img1, size=[224,224])
    img = tf.image.convert_image_dtype(img, tf.float32)
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch
    te = loaded_model.predict(img_array)
    num = np.argmax(te)
    name = dog_cats[num]
    print(num)
    new_name = name.replace(" ","")
    cat_dog = "dog"
    for i in range(len(cats)):
        if new_name == cats[i]:
            cat_dog = "cat"
    return new_name
