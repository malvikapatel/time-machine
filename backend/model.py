import os
import requests
import cohere  
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

# Access the variables
gooey_key = os.getenv("GOOEY_API_KEY")
cohere_key = os.getenv("COHERE_API_KEY")


def image_to_vid(image_path, text_from_past_messages) :

    first_name = add
    last_name = add
    age = add
    gender = add
    command = add

    name = first_name + last_name

    # ---------------------------------------------------------
    # COHERE
    # ---------------------------------------------------------
    co = cohere.Client('9w9zq7v9fwcEHg1ARoRUYr9zqJMPDzeBcI0lbkfT')

    # Function to generate speaking motion based on text using Cohere's generative LLM
    response = co.generate(
    model='command',
    prompt='Back then when I,' + name + ' was a ' + age + ' year old ' + gender + ' , I sent the following text message: ' +  text_from_past_messages + command + '\n\n',
    max_tokens=300,
    temperature=0.9,
    k=0,
    stop_sequences=[],
    return_likelihoods='NONE')
    print('Prediction: {}'.format(response.generations[0].text))

    generated_text = response.generations[0].text



    # ---------------------------------------------------------
    # GOOEY API 
    # ---------------------------------------------------------
    payload = {
        "input_face": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/a904b3d8-b5ca-11ee-8095-02420a000162/1705559090491267.mp4",
        "text_prompt": generated_text,
    }

    response = requests.post(
        "https://api.gooey.ai/v2/LipsyncTTS/",
        headers={
            "Authorization": "Bearer " + os.environ["GOOEY_API_KEY"],
        },
        json=payload,
    )
    assert response.ok, response.content

    result = response.json()
    print(response.status_code, result)



if __name__ == "__main__":
    # Example text from past messages
    text_from_past_messages = "Hello from the past! This is a test message for the speaking motion AI."

    # Example image path
    image_path = "path/to/your/image.jpg"

    # Add speaking motion to the image
    image_to_vid(image_path, text_from_past_messages)