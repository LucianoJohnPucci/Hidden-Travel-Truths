from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def read_root():
    return {"message": "Welcome to Hidden Travel Truths API!"}
