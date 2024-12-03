# import http.client
# import json
# import csv

# # Connect to the API
# conn = http.client.HTTPSConnection("cricbuzz-cricket.p.rapidapi.com")
# headers = {
#     'x-rapidapi-key': "a94bcdc145msh730675a1916106bp1a5f70jsn7672c65f463a",
#     'x-rapidapi-host': "cricbuzz-cricket.p.rapidapi.com"
# }

# conn.request("GET", "/schedule/v1/international", headers=headers)
# res = conn.getresponse()
# data = res.read()

# # Decode and parse the JSON response
# data_str = data.decode("utf-8")
# json_data = json.loads(data_str)

# # Extract key details from the JSON response
# matches = []
# for series in json_data.get("seriesMap", []):
#     for match in series.get("scheduleAdWrapperList", []):
#         match_info = match.get("matchScheduleMap", {}).get("matchSchedule", {})
#         if match_info:
#             match_details = {
#                 "seriesName": series.get("seriesName"),
#                 "matchName": match_info.get("matchName"),
#                 "date": match_info.get("matchDate"),
#                 "venue": match_info.get("venueName"),
#                 "team1": match_info.get("team1", {}).get("teamSName"),
#                 "team2": match_info.get("team2", {}).get("teamSName")
#             }
#             matches.append(match_details)

# # Save the extracted data to a structured file (CSV)
# csv_file = "cricket_schedule.csv"
# with open(csv_file, "w", newline="", encoding="utf-8") as file:
#     writer = csv.DictWriter(file, fieldnames=["seriesName", "matchName", "date", "venue", "team1", "team2"])
#     writer.writeheader()
#     writer.writerows(matches)

# print(f"Data has been written to {csv_file}")

# # Optional: Save the raw JSON response for reference
# json_file = "cricket_schedule_raw.json"
# with open(json_file, "w", encoding="utf-8") as file:
#     json.dump(json_data, file, indent=4)

# print(f"Raw JSON response has been saved to {json_file}")

# # Optional: Submit the extracted data to a Google Form
# def submit_to_google_form(data_list):
#     import requests

#     form_url = "YOUR_GOOGLE_FORM_URL"
#     for match in data_list:
#         form_data = {
#             "entry.XXXXXXX": match["seriesName"],  # Replace XXXXXXX with the actual form field ID
#             "entry.YYYYYYY": match["matchName"],
#             "entry.ZZZZZZZ": match["date"],
#             "entry.AAAAAAA": match["venue"],
#             "entry.BBBBBBB": match["team1"],
#             "entry.CCCCCCC": match["team2"],
#         }
#         response = requests.post(form_url, data=form_data)
#         if response.status_code == 200:
#             print(f"Successfully submitted: {match['matchName']}")
#         else:
#             print(f"Failed to submit: {match['matchName']}")

# # Uncomment the next line if you want to enable form submission
# # submit_to_google_form(matches)

# -----------------------------------------------------------------------------------------------
import http.client
import json
import time

# API setup
conn = http.client.HTTPSConnection("cricbuzz-cricket.p.rapidapi.com")
headers = {
    'x-rapidapi-key': "a94bcdc145msh730675a1916106bp1a5f70jsn7672c65f463a",
    'x-rapidapi-host': "cricbuzz-cricket.p.rapidapi.com"
}

# List of team IDs
match_list = [11,12,13,529]

# Dictionary to store responses
team_data = {}

# Make API calls and collect data
for team_id in match_list:
    endpoint = f"/mcenter/v1/35878/team/{team_id}"
    try:
        conn.request("GET", endpoint, headers=headers)
        res = conn.getresponse()
        data = res.read()
        
        # Decode and parse JSON response
        team_data[team_id] = json.loads(data.decode("utf-8"))
    except json.JSONDecodeError:
        # Handle cases where the response isn't valid JSON
        team_data[team_id] = {"error": "Invalid response or parsing error"}
    except Exception as e:
        # Handle other exceptions
        team_data[team_id] = {"error": str(e)}
    time.sleep(5)

# Save the collected data to a JSON file
output_path = "team_data_new.json"
with open(output_path, "w") as file:
    json.dump(team_data, file, indent=4)

print(f"Data saved to {output_path}")

# match list:
# [2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 529, 536, 25, 540, 544, 546, 549, 44, 560, 569, 2285, 1018, 1020]