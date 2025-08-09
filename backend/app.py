from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import fitz
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

def get_summary(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes content"},
            {"role": "user", "content": prompt}
        ],
        max_tokens=300
    )
    return response.choices[0].message.content

@app.route('/summarize/text', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data['text']
    prompt = f"Summarize the following text:\n{text}"
    summary = get_summary(prompt)
    return jsonify({'summary': summary})

@app.route('/summarize/pdf', methods=['POST'])
def summarize_pdf():
    file = request.files['file']
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    prompt = f"Summarize the following pdf content:\n{text}"
    summary = get_summary(prompt)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)