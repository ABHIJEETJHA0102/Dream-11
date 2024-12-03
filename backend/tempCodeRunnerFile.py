import json

# Load the JSON data
with open('cricket_schedule_raw.json', 'r') as file:
    data = json.load(file)

# Extract team IDs
team_ids = []
for schedule in data.get("matchScheduleMap", []):
    if "scheduleAdWrapper" in schedule:
        for match_list in schedule["scheduleAdWrapper"].get("matchScheduleList", []):
            for match in match_list.get("matchInfo", []):
                team1 = match.get("team1", {})
                team2 = match.get("team2", {})
                if "teamId" in team1:
                    team_ids.append(team1["teamId"])
                if "teamId" in team2:
                    team_ids.append(team2["teamId"])

# Remove duplicates, if needed
team_ids = list(set(team_ids))

print(team_ids)
