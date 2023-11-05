from django.urls import path
from .views import kakaoMap

urlpatterns = [
    path('', kakaoMap),
]