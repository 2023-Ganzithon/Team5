from django.urls import path, include
from .views import DonationRegisterView

urlpatterns =[
   path('', DonationRegisterView.as_view(), name="donationRegister"), 
]