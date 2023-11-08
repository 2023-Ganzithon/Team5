from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Park  # Park 모델을 import하십시오
from myPage.models import ParkVisitPoint
from datetime import datetime
import json

# Create your views here.
# def kakaoMap(request):
#     return render(request, 'map.html')

class EarnParkPointsView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            # 사용자가 "park_name"을 요청 데이터로 전달
            park_name = request.data.get('park_name', '안산공원')  # 기본값을 '영등포공원'으로 설정

            try:
                park = Park.objects.get(name=park_name)  # 사용자가 위치한 공원 정보를 가져옴
                # 해당 공원에 포인트를 추가
                user_points, created = ParkVisitPoint.objects.get_or_create(user=request.user, park=park)
                user_points.earnedPoint += 10  # 10포인트 추가함(db에 안넣고서 모든 장소 동일하게)
                user_points.pointActivityDate = datetime.now()  
                user_points.save()
                return Response({'message': f'포인트가 10 추가되었습니다 ({park_name})'}, status=status.HTTP_200_OK)
            except Park.DoesNotExist:
                return Response({'message': '해당 공원이 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': '로그인 하세요.'}, status=status.HTTP_401_UNAUTHORIZED)




