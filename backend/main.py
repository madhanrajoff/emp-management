from app import app

# Load Config
from config import Config as conf
conf.initialize()

if __name__ == "__main__":
    app.run(debug=True)
