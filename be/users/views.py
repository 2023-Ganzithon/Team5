from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User

from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        # serializer에서 이미 얻은 토큰 값 사용
        token = serializer.validated_data["token"]

        # 토큰 값과 사용자의 PK 반환
        return Response({"token": token, "user_pk": user.pk}, status=status.HTTP_200_OK)


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # 현재 로그인한 유저의 프로필을 반환
        return self.request.user.profile

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        # 현재 로그인한 유저와 프로필의 소유자가 일치하는지 확인
        profile = self.get_object()
        if profile.user.pk != self.request.user.pk:
            return self.permission_denied(request)

        # 소유자와 일치하면 프로필 업데이트 허용
        return self.update(request, *args, **kwargs)
