from rest_framework.views import APIView
from .models import Documents
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_201_CREATED,
)

class UpLoad(APIView):
  
  def post(self, request):
    data = request.data.copy()
    document = Documents.objects.create(data)
    return Response({"document": document}, status=HTTP_201_CREATED)

class ViewPDF(APIView):
  
  pass

# from django.http import JsonResponse, HttpResponse
# from django.conf import settings
# import os

# # View to serve PDF directly from the media folder
# def display_pdf(request, pdf_filename):
#     # Build the full path to the file
#     file_path = os.path.join(settings.MEDIA_ROOT, pdf_filename)
#     print(f"Trying to load file from: {file_path}")
    
#     # Check if the file exists
#     if os.path.exists(file_path):
#         with open(file_path, 'rb') as pdf_file:
#             response = HttpResponse(pdf_file.read(), content_type='application/pdf')
#             response['Content-Disposition'] = f'inline; filename="{pdf_filename}"'
#             return response
#     else:
#         return JsonResponse({"error": "File not found"}, status=404)