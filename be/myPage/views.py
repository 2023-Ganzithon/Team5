from django.shortcuts import render
from datetime import datetime
from .models import Donation, ParkVisitPoint, ShoppingMallReviewPoint, Donate
from .serializers import (
    DonationSerializer,
    ParkEarnedPointSerializer,
    ShoppingMallEarnedPointSerializer,
    DonationUsedPointSerializer,
)
from users.serializers import ProfileSerializer, RegisterSerializer
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
    serializer_class = None  # serializer_class를 사용하지 않습니다

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            # 사용자가 얻은 공원 포인트와 쇼핑몰 리뷰 포인트를 가져옵니다.
            park_points = ParkVisitPoint.objects.filter(user=user).order_by('-pointActivityDate')
            mall_points = ShoppingMallReviewPoint.objects.filter(user=user).order_by('-pointActivityDate')
            return {
                "user": user,
                "park_points": park_points,
                "mall_points": mall_points,
            }
        else:
            return None

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset is None:
            return Response([])

        user = queryset["user"]
        park_points = queryset["park_points"]
        mall_points = queryset["mall_points"]

        park_serializer = ParkEarnedPointSerializer(park_points, many=True)
        mall_serializer = ShoppingMallEarnedPointSerializer(mall_points, many=True)
        user_profile_serializer = ProfileSerializer(user.profile)

        # 공원 포인트와 쇼핑몰 리뷰 포인트 시리얼라이저 결과를 병합
        result = {
            "profile": user_profile_serializer.data,
            "park_points": park_serializer.data,
            "mall_points": mall_serializer.data,
        }

        return Response(result)

class DonatedListView(ListAPIView):
    serializer_class = DonationUsedPointSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            donation_points = Donate.objects.filter(user=user).order_by('-date')
            return donation_points
        else:
            return Donate.objects.none()
        
# 마이페이지홈        
class MypageView(ListAPIView):
    serializer_class = RegisterSerializer  # serializer_class를 사용하지 않습니다

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user

            # 사용자가 얻은 공원 포인트와 쇼핑몰 리뷰 포인트를 가져옵니다.
            park_points = ParkVisitPoint.objects.filter(user=user).order_by('-pointActivityDate')
            mall_points = ShoppingMallReviewPoint.objects.filter(user=user).order_by('-pointActivityDate')
            donation_points = Donate.objects.filter(user=user).order_by('-date')
            
            return {
                "user": user,
                "park_points": park_points,
                "mall_points": mall_points,
                "donation_points": donation_points,
            }
        else:
            return None

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset is None:
            return Response([])

        user = queryset["user"]
        park_points = queryset["park_points"]
        mall_points = queryset["mall_points"]
        donation_points = queryset["donation_points"]

        park_serializer = ParkEarnedPointSerializer(park_points, many=True)
        mall_serializer = ShoppingMallEarnedPointSerializer(mall_points, many=True)
        donation_serializer = DonationUsedPointSerializer(donation_points, many=True)
        user_profile_serializer = ProfileSerializer(user.profile)
        user_info = RegisterSerializer(user)

        # 공원 포인트, 쇼핑몰 리뷰 포인트, 기부 포인트 시리얼라이저 결과를 병합
        result = {
            "user": user_info.data,
            "profile": user_profile_serializer.data,
            "park_points": park_serializer.data,
            "mall_points": mall_serializer.data,
            "donation_points": donation_serializer.data,
        }

        return Response(result)
