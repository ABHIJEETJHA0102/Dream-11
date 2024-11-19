from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the allowed origins (your frontend origin)
origins = [
    "http://localhost:5173",  # Add your frontend URL here
]

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

#get match list router for home page
@app.get("/getMatches")
def get_matches():
    matches = [
        {"match_id": 1, "date": "2023-10-01", "teams": "Team A vs Team B", "time": "10:00 AM", "venue": "Stadium 1"},
        {"match_id": 2, "date": "2023-10-02", "teams": "Team C vs Team D", "time": "11:00 AM", "venue": "Stadium 2"},
        {"match_id": 3, "date": "2023-10-03", "teams": "Team E vs Team F", "time": "12:00 PM", "venue": "Stadium 3"},
        {"match_id": 4, "date": "2023-10-04", "teams": "Team G vs Team H", "time": "01:00 PM", "venue": "Stadium 4"},
        {"match_id": 5, "date": "2023-10-05", "teams": "Team I vs Team J", "time": "02:00 PM", "venue": "Stadium 5"},
        {"match_id": 6, "date": "2023-10-06", "teams": "Team K vs Team L", "time": "03:00 PM", "venue": "Stadium 6"},
        {"match_id": 7, "date": "2023-10-07", "teams": "Team M vs Team N", "time": "04:00 PM", "venue": "Stadium 7"},
        {"match_id": 8, "date": "2023-10-08", "teams": "Team O vs Team P", "time": "05:00 PM", "venue": "Stadium 8"},
        {"match_id": 9, "date": "2023-10-09", "teams": "Team Q vs Team R", "time": "06:00 PM", "venue": "Stadium 9"},
        {"match_id": 10, "date": "2023-10-10", "teams": "Team S vs Team T", "time": "07:00 PM", "venue": "Stadium 10"},
    ]
    return {"matches": matches}
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}