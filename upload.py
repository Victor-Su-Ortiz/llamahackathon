from pymongo import MongoClient
import json

# mongoimport --uri mongodb+srv://vsuortiz:MONGO_PW@serverlessinstance0.vbq8qth.mongodb.net/explanation-of-benefits --collection anthem-benefits --type JSON --file /Users/zacharygittelman/Documents/2023-12_254_39B0_in-network-rates_1_of_9.json

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read environment variables
MONGO_PW = os.getenv('MONGO_PW')

# Print the values
print(f"MONGO_PW: {MONGO_PW}")


# Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
client = MongoClient(
    host="mongodb://serverlessinstance0.vbq8qth.mongodb.net:27017",
    username="vsuortiz",
    password=MONGO_PW,
)
db = client["explanation-of-benefits"]
collection = db["anthem-benefits"]

# Path to your file
file_path = 'files/example.json'

# Read the file (this example assumes a JSON file)
with open(file_path, 'r') as file:
    file_data = json.load(file)

# If the file is a JSON file containing multiple records
if isinstance(file_data, list):
    collection.insert_many(file_data)  
else:
    collection.insert_one(file_data)

print("File uploaded successfully to MongoDB")
