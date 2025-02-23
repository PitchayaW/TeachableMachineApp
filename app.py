import os
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-secret-key")

@app.route('/')
def index():
    # Sample images data
    sample_images = {
        'cats': [
            {
                'url': 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e',
                'credit': 'Mikhail Vasilyev'
            },
            {
                'url': 'https://images.unsplash.com/photo-1511044568932-338cba0ad803',
                'credit': 'Ludemeula Fernandes'
            },
            {
                'url': 'https://images.unsplash.com/photo-1489084917528-a57e68a79a1e',
                'credit': 'Marko Blažević'
            }
        ],
        'dogs': [
            {
                'url': 'https://images.unsplash.com/photo-1534361960057-19889db9621e',
                'credit': 'Joe Caione'
            },
            {
                'url': 'https://images.unsplash.com/photo-1422565096762-bdb997a56a84',
                'credit': 'Caleb Fisher'
            },
            {
                'url': 'https://images.unsplash.com/photo-1450778869180-41d0601e046e',
                'credit': 'Krista Mangulsone'
            }
        ]
    }
    return render_template('index.html', sample_images=sample_images)
