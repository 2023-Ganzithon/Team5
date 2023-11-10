from .serializers import DonatePostSerializer
from myPage.serializers import DonationSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from myPage.models import Donation, DonationPoint
from users.models import Profile

class DonatePostView(APIView):
    def post(self, request, pk):
        try:
            donation = Donation.objects.get(id=pk)  # 기부처의 id로 기부처정보를 가져옴
        except Donation.DoesNotExist:
            return Response({'message': '해당 기부처를 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = DonatePostSerializer(data=request.data)
        if serializer.is_valid():
            profile = Profile.objects.get(user=self.request.user)
            donation_point = serializer.validated_data.get('donation_point')

            # 사용자의 기부 포인트를 DonationPoint 모델에 기록
            donation_point_record = DonationPoint(user=self.request.user, donation=donation, usedPoint=donation_point)
            donation_point_record.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class DonatePostView(APIView):
#     def post(self, request):
#         serializer = DonatePostSerializer(data=request.data)
#         profile = Profile.objects.get(user=self.request.user)

#         if serializer.is_valid():
#             serializer.save(donator=self.request.user, profile=profile)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DonationReadView(APIView):
    def get(self, request):
        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
