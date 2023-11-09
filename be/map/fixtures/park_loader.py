import json

import os

# 현재 스크립트 파일의 디렉토리 경로를 얻습니다.
script_dir = os.path.dirname(os.path.abspath(__file__))

# 'park.json' 파일의 경로를 현재 스크립트 파일의 디렉토리와 결합하여 절대 경로를 얻습니다.
file_path = os.path.join(script_dir, 'park.json')

with open(file_path, 'r', encoding="utf-8") as f:
        locations = json.load(f)

locationdict = []
for location in locations:
    new_data = {'model': 'map.park'}
    content = {
            "name": location["name"], # 장소이름
            "add" : location["add"], # 주소
            "latitude": location["Latitude"], # 위도
            "longitude": location["Longitude"]
            }
    new_data['fields'] = content
    locationdict.append(new_data)

with open('park_data.json', 'w', encoding='utf-8') as f:
    json.dump(locationdict, f, ensure_ascii=False, indent=2)