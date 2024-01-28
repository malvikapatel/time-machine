import os
import requests
import cohere  
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/image_to_vid": {"origins": "http://localhost:3000"}})  # Enable CORS

# Load variables from the .env file
load_dotenv()

# Access the variables
gooey_key = os.getenv("GOOEY_API_KEY")
cohere_key = os.getenv("COHERE_API_KEY")

@app.route('/image_to_vid', methods=['POST'])
def image_to_vid() :
    
    try: 

        data = request.json
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        age = data.get('age', '')
        gender = data.get('gender', '')
        situationalInformation = data.get('situationalInformation', '')
        majorEventsDescription = data.get('majorEventsDescription', '')
        command = data.get('command', '')
        image = data.get('image', '')

        name = first_name + last_name

        # ---------------------------------------------------------
        # COHERE
        # ---------------------------------------------------------
        co = cohere.Client('9w9zq7v9fwcEHg1ARoRUYr9zqJMPDzeBcI0lbkfT')

        # Function to generate speaking motion based on text using Cohere's generative LLM
        response = co.generate(
        model='command',
        prompt='Back then when I,' + name + ' was a ' + age + ' year old ' + gender + ' , I had the following situation: ' +  situationalInformation + majorEventsDescription + command + '\n\n',
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
            "input_face": image,
            "text_prompt": generated_text,
        }

        response = requests.post(
            "https://api.gooey.ai/v2/LipsyncTTS/?example_id=ygblwbc1",
            headers={
                "Authorization": "Bearer " + os.environ["GOOEY_API_KEY"],
            },
            json=payload,
        )
        assert response.ok, response.content

        result = response.json()
        print(response.status_code, result)
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app():
    return app.send_file('/frontend/src/pages/Login.tsx')

if __name__ == "__main__":
    app.run(debug=True)