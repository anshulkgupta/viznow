from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from mhacks.equities import Field


EQUITY_MAP = {
	'AAPL': 'AAPL US EQUITY'
}

def home_page(request):
  return render(request, 'home.html')

def enter_page(request):
  return render(request, 'enter.html')

def upload_page(request):
  return render(request, 'upload1.html')

def upload_unique_page(request, id):
  return render(request, 'upload_unique.html', {'page' : id})

def visualization_page(request, page, id):
  return render(request, 'visualization.html', {'page': page, 'id': id})

def handle_upload(request):
  equities = request.post['equities']
  #str_param = EQUITY_MAP.get(equities)

  #field = Field(str_param)
  #return HttpResponse(field.getData(), content_type="application/json")
  return HttpResponse(equities, content_type="application/json")