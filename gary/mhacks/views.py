import os
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
#from mhacks.equities import Field


EQUITY_MAP = {
	'AAPL': 'AAPL US EQUITY'
}

def home_page(request):
  return render(request, 'home.html')

def enter_page(request):
  return render(request, 'enter.html')

def final_custom_page(request, page, id):
  return render(request, 'custom_final.html', {'page' : page, 'id': id})

def fileupload_page(request, page, id):
  return render(request, 'fileupload.html', {'page' : page, 'id': id})

def upload_page(request):
  return render(request, 'upload1.html')

def upload_unique_page(request, id):
  return render(request, 'upload_unique.html', {'page' : id})

def visualization_page(request, page, id):
  return render(request, 'visualization.html', {'page': page, 'id': id})

@csrf_exempt
def handle_upload(request):
  #equities = request.post['equities']
  #str_param = EQUITY_MAP.get(equities)
  root = os.path.dirname(__file__)
  json_file = '%s/equities/fixtures/newstock.json' % root 
  json_data = open(json_file).read()
  equities = json.loads(json_data.replace('\n', ''))

  #field = Field(str_param)
  #return HttpResponse(field.getData(), content_type="application/json")
  return JsonResponse(equities)