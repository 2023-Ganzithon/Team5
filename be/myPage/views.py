from django.shortcuts import render
from datetime import datetime
from .models import Donation, ParkVisitPoint, ShoppingMallReviewPoint
from .serializers import (
    DonationSerializer,
    ParkEarnedPointSerializer,
    ShoppingMallEarnedPointSerializer,
)
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
            park_points = ParkVisitPoint.objects.filter(user=user)
            mall_points = ShoppingMallReviewPoint.objects.filter(user=user)
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

        # 공원 포인트와 쇼핑몰 리뷰 포인트 시리얼라이저 결과를 병합
        result = {
            "park_points": park_serializer.data,
            "mall_points": mall_serializer.data,
        }

        return Response(result)
