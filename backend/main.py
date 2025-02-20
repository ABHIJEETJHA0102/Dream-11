# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # Define the allowed origins (your frontend origin)
# origins = [
#     "http://localhost:5173",  # Add your frontend URL here
# ]

# # Add the CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods
#     allow_headers=["*"],  # Allow all headers
# )

# @app.get("/")
# def read_root():
#     return {"message": "Hello, World!"}

# #get match list router for home page
# @app.get("/getMatches")
# def get_matches():
#     matches = [
#         {"match_id": 1, "date": "2023-10-01", "teams": "Team A vs Team B", "time": "10:00 AM", "venue": "Stadium 1"},
#         {"match_id": 2, "date": "2023-10-02", "teams": "Team C vs Team D", "time": "11:00 AM", "venue": "Stadium 2"},
#         {"match_id": 3, "date": "2023-10-03", "teams": "Team E vs Team F", "time": "12:00 PM", "venue": "Stadium 3"},
#         {"match_id": 4, "date": "2023-10-04", "teams": "Team G vs Team H", "time": "01:00 PM", "venue": "Stadium 4"},
#         {"match_id": 5, "date": "2023-10-05", "teams": "Team I vs Team J", "time": "02:00 PM", "venue": "Stadium 5"},
#         {"match_id": 6, "date": "2023-10-06", "teams": "Team K vs Team L", "time": "03:00 PM", "venue": "Stadium 6"},
#         {"match_id": 7, "date": "2023-10-07", "teams": "Team M vs Team N", "time": "04:00 PM", "venue": "Stadium 7"},
#         {"match_id": 8, "date": "2023-10-08", "teams": "Team O vs Team P", "time": "05:00 PM", "venue": "Stadium 8"},
#         {"match_id": 9, "date": "2023-10-09", "teams": "Team Q vs Team R", "time": "06:00 PM", "venue": "Stadium 9"},
#         {"match_id": 10, "date": "2023-10-10", "teams": "Team S vs Team T", "time": "07:00 PM", "venue": "Stadium 10"},
#     ]
#     return {"matches": matches}
# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str = None):
#     return {"item_id": item_id, "q": q}
import json
import os
from fastapi import FastAPI,File, UploadFile
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the allowed origins (your frontend origin)
origins = ["*"]

# Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Function to convert date into words
def format_date_to_words(timestamp):
    # Convert timestamp to datetime
    date_obj = datetime.utcfromtimestamp(timestamp / 1000)
    # Format date into a more readable format
    return date_obj.strftime("%B %d, %Y, %I:%M %p")  # Example: December 3, 2024, 11:30 AM


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/getone")
def get_one():
    file_path = "player_analysis.json"
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
        
        # Sort players by fantasy_points in descending order
        sorted_data = sorted(data, key=lambda x: x.get("predicted_fantasy_points", 0), reverse=True)
        
        return {"predictions": sorted_data[:1]}  # Return top 11 players based on fantasy_points
    
    return {"error": "Data file not found."}

@app.get("/geteleven")
def get_eleven():
    file_path = "player_analysis.json"
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
        
        # Sort players by fantasy_points in descending order
        sorted_data = sorted(data, key=lambda x: x.get("predicted_fantasy_points", 0), reverse=True)
        
        return {"predictions": sorted_data[:11]}  # Return top 11 players based on fantasy_points
    
    return {"error": "Data file not found."}

@app.get("/getfive")
def get_five():
    file_path = "player_analysis.json"
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
        
        # Sort players by fantasy_points in descending order
        sorted_data = sorted(data, key=lambda x: x.get("predicted_fantasy_points", 0), reverse=True)
        
        return {"predictions": sorted_data[:5]}  # Return top 11 players based on fantasy_points
    
    return {"error": "Data file not found."}


@app.get("/getMatches")
def get_matches():
    print("Fetching matches...")
    json_file = "cricket_schedule_raw.json"  # Path to the JSON file

    if os.path.exists(json_file):
        with open(json_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        matches = []
        match_id = 1  # Incremental match_id

        # Iterate through the schedule data in 'matchScheduleMap'
        for schedule in data.get("matchScheduleMap", []):
            schedule_ad_wrapper = schedule.get("scheduleAdWrapper", {})
            match_schedule_list = schedule_ad_wrapper.get("matchScheduleList", [])

            for match_schedule in match_schedule_list:
                series_name = match_schedule.get("seriesName", "Unknown Series")
                match_info_list = match_schedule.get("matchInfo", [])

                for match_info in match_info_list:
                    match_id_ = match_info.get("matchId", 0)
                    match_desc = match_info.get("matchDesc", "No description")
                    match_format = match_info.get("matchFormat", "Unknown Format")
                    start_timestamp = int(match_info.get("startDate", 0))
                    end_timestamp = int(match_info.get("endDate", 0))

                    # Convert timestamps to human-readable date/time format
                    start_date = datetime.utcfromtimestamp(start_timestamp / 1000).strftime("%Y-%m-%d %H:%M:%S") if start_timestamp else "Unknown"
                    end_date = datetime.utcfromtimestamp(end_timestamp / 1000).strftime("%Y-%m-%d %H:%M:%S") if end_timestamp else "Unknown"

                    # Teams
                    team1_name = match_info.get("team1", {}).get("teamSName", "Unknown Team 1")
                    team2_name = match_info.get("team2", {}).get("teamSName", "Unknown Team 2")

                    # Venue
                    venue_info = match_info.get("venueInfo", {})
                    ground = venue_info.get("ground", "Unknown Ground")
                    city = venue_info.get("city", "Unknown City")
                    country = venue_info.get("country", "Unknown Country")

                    # Prepare match data
                    matches.append({
                        "match_id": match_id,
                        "series_name": series_name,
                        "match_desc": match_desc,
                        "match_format": match_format,
                        "date": format_date_to_words(start_timestamp),  # Apply the function here
                        "end_date": format_date_to_words(end_timestamp),  # Apply the function here
                        "team1": team1_name,
                        "team2": team2_name,
                        "venue": f"{ground}, {city}, {country}"
                    })

                    match_id += 1

        print(f"Returning {len(matches)} matches")
        return {"matches": matches}
    else:
        return {"error": "No schedule data found. Please generate the JSON file first."}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        with open(f"uploaded_files/{file.filename}", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"message": "File uploaded successfully!"}
    except Exception as e:
        return {"error": str(e)}
