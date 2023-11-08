from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Donation, MyPoint

class DonationSerializer(ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

# 포인트 획득 내역 조회 
class EarnedPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyPoint
        fields = ('park', 'pointActivityDate', 'earnedPoint')

# 기부 내역 조회 
class DonatedPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyPoint
        fields = ('donatedName', 'pointActivityDate', 'donatedPoint')


