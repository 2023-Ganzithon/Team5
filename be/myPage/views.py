from django.shortcuts import render
from datetime import datetime
from .models import Donation, MyPoint, Park
from .serializers import DonationSerializer, EarnedPointSerializer, DonatedPointSerializer
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
# from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

class DonationRegisterView(APIView):
    def post(self, request):
        serializer = DonationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 포인트 획득 내역 조회  
class EarnedPointListView(ListAPIView):
    serializer_class = EarnedPointSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return MyPoint.objects.filter(user=self.request.user)
        else:
            return MyPoint.objects.none()

class EarnPointsView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            # 사용자가 "park_name"을 요청 데이터로 전달
            # park_name = request.data.get('park_name')
            park_name = '영등포공원'

            try:
                park = Park.objects.get(name=park_name)  # 사용자가 위치한 공원 정보를 가져옴
                # 해당 공원에 포인트를 추가
                user_points, created = MyPoint.objects.get_or_create(user=request.user, park=park)
                user_points.earnedPoint += 10  # 10포인트 추가함(db에 안넣고서 모든 장소 동일하게)
                user_points.pointActivityDate = datetime.now()  
                user_points.save()
                return Response({'message': f'포인트가 10 추가되었습니다 ({park_name})'}, status=status.HTTP_200_OK)
            except Park.DoesNotExist:
                return Response({'message': '해당 공원이 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'message': '로그인 하세요.'}, status=401)

# 기부 내역 조회
class DonatedPointListView(ListAPIView):
    serializer_class = DonatedPointSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return MyPoint.objects.filter(user=self.request.user)
        else:
            return MyPoint.objects.none()    
  
class DonatePointsView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            donated_point = int(request.data.get('donated_point', 0))  # 사용자가 입력한 포인트를 가져오기(프론트입력방식에따라 바꿀것)

            user_points, created = MyPoint.objects.get_or_create(user=request.user)

            if donated_point > 0 and user_points.earnedPoint >= donated_point:
                user_points.earnedPoint -= donated_point
                user_points.donatedPoint += donated_point
                user_points.pointActivityDate = datetime.now()
                user_points.save()
                return Response({'message': f'{donated_point}포인트가 기부되었습니다.'}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'message': '포인트가 부족합니다.'}, status=400)
        else:
            return JsonResponse({'message': '로그인하세요.'}, status=401)












