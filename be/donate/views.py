from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Donation, Donate
from .serializers import DonatePostSerializer, ProfileSerializer
from myPage.serializers import DonationSerializer
from users.models import Profile


class DonationReadView(APIView):
    def get(self, request):
        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DonateDetailView(APIView):
    def get(self, request, pk):
        try:
            donation = Donation.objects.get(id=pk)
            donation_serializer = DonationSerializer(donation)

            if self.request.user.is_authenticated:
                user = self.request.user
                profile = Profile.objects.get(user=user)

                # 프로필 정보에서 포인트 정보만 가져와서 직렬화합니다.
                profile_data = {"points": profile.points}

                # 기부 정보와 프로필에서 가져온 포인트 정보를 합쳐 직렬화 데이터를 생성합니다.
                serialized_data = {
                    "donation": donation_serializer.data,
                    "profile": profile_data,
                }

                return Response(serialized_data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "사용자가 인증되지 않았습니다."}, status=status.HTTP_401_UNAUTHORIZED
                )
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
