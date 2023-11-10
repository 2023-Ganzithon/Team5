from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Donation, ParkVisitPoint, ShoppingMallReviewPoint, DonationPoint

class DonationSerializer(ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

# 포인트 획득 내역 조회 
class ParkEarnedPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkVisitPoint
        fields = ('id', 'park', 'pointActivityDate', 'earnedPoint')

class ShoppingMallEarnedPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingMallReviewPoint
        fields = ('id', 'mall', 'pointActivityDate', 'earnedPoint')

class DonationUsedPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationPoint
        fields = ('id', 'donation', 'pointActivityDate', 'usedPoint')









