from django.urls import path
from .views import EarnParkPointsView, ParkListView

urlpatterns = [
    path('', ParkListView.as_view(), name="park_list"),
    path('points/', EarnParkPointsView.as_view(), name='park_points'),
]