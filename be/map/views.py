from django.shortcuts import render
import json

# Create your views here.
def kakaoMap(request):
    return render(request, 'map.html')



