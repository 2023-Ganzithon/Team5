from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Donation, Donate
from .serializers import DonatePostSerializer
from myPage.serializers import DonationSerializer


class DonationReadView(APIView):
    def get(self, request):
        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DonateDetailView(APIView):
    def get(self, request, pk):
        try:
            donation = Donation.objects.get(id=pk)
            serializer = DonationSerializer(donation)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Donation.DoesNotExist:
            return Response(
                {"message": "해당 기부처를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request, pk):
        try:
            donation = Donation.objects.get(id=pk)
        except Donation.DoesNotExist:
            return Response(
                {"message": "해당 기부처를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DonatePostSerializer(data=request.data)
        if serializer.is_valid():
            user_points = self.request.user.profile.points
            donation_amount = serializer.validated_data["price"]

            if user_points >= donation_amount:
                donation_instance = Donate.objects.create(
                    user=self.request.user, donation=donation, price=donation_amount
                )
                serializer = DonatePostSerializer(donation_instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "포인트가 부족합니다."}, status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
