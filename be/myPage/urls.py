from django.urls import path, include
from .views import DonationRegisterView, EarnedPointListView

urlpatterns =[
   path('donationRegister/', DonationRegisterView.as_view(), name="donationRegister"), 
   path('mypoint/', EarnedPointListView.as_view(), name="myPoint"),
   # path('mydonation/', DonatedPointListView.as_view(), name="myDonation"),
   # path('earnPoint/', EarnPointsView.as_view(), name='earnpoint' ), # test용으로 해봄
]