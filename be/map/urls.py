from django.urls import path
from .views import EarnParkPointsView

urlpatterns = [
    path('', EarnParkPointsView.as_view(), name='park_points'),
]