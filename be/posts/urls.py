from django.urls import path
from rest_framework import routers
from .views import PostViewSet

# 라우터 사용
router = routers.SimpleRouter()  # SimpleRouter 객체를 생성
router.register("", PostViewSet)  # register 메서드를 사용해서 viewset을 등록

urlpatterns = router.urls
