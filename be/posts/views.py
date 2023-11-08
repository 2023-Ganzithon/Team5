from datetime import datetime
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer
from .permissions import CustomReadOnly
from users.models import Profile
from myPage.models import ShoppingMallReviewPoint

from django_filters.rest_framework import DjangoFilterBackend


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [CustomReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["shoppingmall", "star"]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return PostSerializer
        return PostCreateSerializer

    def perform_create(self, serializer):
        # Get the current user's profile
        profile = Profile.objects.get(user=self.request.user)

        # Set the author and profile for the post
        post = serializer.save(author=self.request.user, profile=profile)

        try:
            mall_name = post.shoppingmall  # 쇼핑몰 이름 가져오기
            user_points, created = ShoppingMallReviewPoint.objects.get_or_create(user=self.request.user, mall=mall_name)
            user_points.earnedPoint += 15  # 예시로 15포인트 추가
            user_points.pointActivityDate = datetime.now()
            user_points.save()
        except ShoppingMallReviewPoint.DoesNotExist:
            return Response({'message': '해당 쇼핑몰 리뷰가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)