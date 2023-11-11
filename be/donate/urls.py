from django.urls import path, include
from .views import DonationReadView, DonateDetailView

urlpatterns = [
    path("", DonationReadView.as_view(), name="donation"),
    path("<int:pk>/", DonateDetailView.as_view(), name="donate"),
]
