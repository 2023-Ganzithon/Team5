from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.serializers import ProfileSerializer
from .models import Park  
from myPage.models import Profile
from myPage.models import ParkVisitPoint
from datetime import datetime

from django.http import JsonResponse
from django.views import View

from math import radians, sin, cos, sqrt, atan2
import json


# 거리계산 함수(Haversine 공식)
def calculate_distance(lat1, lon1, lat2, lon2):
    # 라디안으로 변환
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine 공식 계산
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = 6371 * c  # 지구의 반지름을 이용하여 거리 계산 (단위: km)

    return distance

class EarnParkPointsView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            user_latitude = float(request.data.get('latitude', 37.5152382)) # 테스트용 위도값
            user_longitude = float(request.data.get('longitude', 126.9108539)) # 테스트용 경도값
            max_distance = 0.5 # 단위(km)

            parks = []
            for park in Park.objects.all():
                park_latitude = park.latitude
                park_longitude = park.longitude

                distance = calculate_distance(user_latitude, user_longitude, park_latitude, park_longitude)

                if distance <= max_distance:
                    park_info = {
                        "name": park.name,
                        "address": park.add,
                        "latitude": park.latitude,
                        "longitude": park.longitude,
                    }
                    parks.append(park_info)

                    user_points = ParkVisitPoint.objects.create(user=request.user, park=park, earnedPoint=10, pointActivityDate=datetime.now())

            # Profile 객체 생성 및 직렬화
            user_profile, created = Profile.objects.get_or_create(user=request.user)
            serializer = ProfileSerializer(user_profile)

            return JsonResponse({"user_profile": serializer.data, "parks": parks})

        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_403_FORBIDDEN)
