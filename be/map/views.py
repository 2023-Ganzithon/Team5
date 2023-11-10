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


class EarnParkPointsView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            # 사용자가 "park_name"을 요청 데이터로 전달
            park_name = request.data.get('park_name', '안산공원')  # 기본값을 '영등포공원'으로 설정

            try:
                park = Park.objects.get(name=park_name)  # 사용자가 위치한 공원 정보를 가져옴
                # 해당 공원에 포인트를 추가
                user_points = ParkVisitPoint.objects.create(user=request.user, park=park, earnedPoint=10, pointActivityDate=datetime.now())
                user_points.earnedPoint = 10  # 10포인트 추가함(db에 안넣고서 모든 장소 동일하게)
                user_points.pointActivityDate = datetime.now()  
                user_points.save()

                # 사용자 프로필 정보 가져오기
                user_profile, created = Profile.objects.get_or_create(user=request.user)
                serializer = ProfileSerializer(user_profile)
                return Response({
                    'message': f'포인트가 10 추가되었습니다 ({park_name})',
                    'profile': serializer.data  # 사용자 프로필 정보를 JSON에 포함
                }, status=status.HTTP_200_OK)
                
            except Park.DoesNotExist:
                return Response({'message': '해당 공원이 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': '로그인 하세요.'}, status=status.HTTP_401_UNAUTHORIZED)


# 지도포인트 획득 로직 다시한번..생각해보기
# class FindNearbyParksView(View):
#     def post(self, request):
#         user_latitude = radians(float(request.POST.get('latitude')))
#         user_longitude = radians(float(request.POST.get('longitude')))
#         max_distance = 10  # 예시 거리 (단위: km)

#         nearby_parks = []

#         for park in Park.objects.all():
#             park_latitude = radians(park.latitude)
#             park_longitude = radians(park.longitude)

#             # Haversine 공식을 사용하여 두 지점 간의 거리 계산
#             dlon = park_longitude - user_longitude
#             dlat = park_latitude - user_latitude
#             a = sin(dlat/2)**2 + cos(user_latitude) * cos(park_latitude) * sin(dlon/2)**2
#             c = 2 * atan2(sqrt(a), sqrt(1-a))
#             distance = 6371 * c  # 지구의 반지름을 이용하여 거리 계산 (단위: km)

#             if distance <= max_distance:
#                 # 일정 거리 이하의 공원을 찾음
#                 park_info = {
#                     "name": park.name,
#                     "address": park.add,
#                     "latitude": park.latitude,
#                     "longitude": park.longitude,
#                 }
#                 nearby_parks.append(park_info)

#                 user_points, created = ParkVisitPoint.objects.create(user=request.user, park=park, earnedPoint=10, pointActivityDate=datetime.now())
#                 user_points.earnedPoint = 10  # 10포인트 추가
#                 user_points.pointActivityDate = datetime.now()
#                 user_points.save()

#                 user_profile, created = Profile.objects.get_or_create(user=request.user)
#                 serializer = UserProfileSerializer(user_profile)

#         return JsonResponse({"nearby_parks": nearby_parks})