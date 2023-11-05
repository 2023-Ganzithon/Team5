from django.shortcuts import render

# Create your views here.
def kakaoMap(request):
    return render(request, 'map.html')
