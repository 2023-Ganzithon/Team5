from django.urls import path, include
from .views import DonatePostView, DonationReadView

urlpatterns = [
    path("", DonationReadView.as_view(), name="donation"),
    path("donate/", DonatePostView.as_view(), name="donate"),
]
