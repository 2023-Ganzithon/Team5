from django.urls import path, include
from .views import DonationRegisterView, EarnedPointListView, DonatedListView, MypageView

urlpatterns =[
   path('', MypageView.as_view(), name="mypage"),
   path('donationRegister/', DonationRegisterView.as_view(), name="donationRegister"), 
   path('mypoint/', EarnedPointListView.as_view(), name="myPoint"),
   path('mydonation/', DonatedListView.as_view(), name="myDonation"),

   # path('earnPoint/', EarnPointsView.as_view(), name='earnpoint' ), # test용으로 해봄
]