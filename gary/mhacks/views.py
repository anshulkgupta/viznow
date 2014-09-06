from django.shortcuts import render
from django.http import Http404,HttpResponseBadRequest,\
                    HttpResponseRedirect,HttpResponse
from django.contrib.auth.decorators import login_required

def home_page(request):
  return render(request, 'home.html')

def enter_page(request):
  return render(request, 'enter.html')

def upload_page(request):
  return render(request, 'upload.html')