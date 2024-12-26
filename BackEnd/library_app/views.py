import boto3
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.status import (
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
)
from .models import UploadedFile
from .serializers import UploadedFileSerializer
# from cro_music_proj.settings import env, AWS_S3_REGION_NAME, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_STORAGE_BUCKET_NAME

# AWS_ACCESS_KEY_ID = env.get("AWS_ACCESS_KEY_I")
# AWS_SECRET_ACCESS_KEY = env.get("AWS_SECRET_ACCESS_KEY")
# AWS_S3_REGION_NAME = settings

class FileUpload(APIView):
  parser_classes = [MultiPartParser, FormParser]

  def post(self, request, *args, **kwargs):
    file_serializer = UploadedFileSerializer(data=request.data)
    # print(file_serializer.is_valid())
    if file_serializer.is_valid():
      # print("here")
      file = request.FILES['file']

      # S3 Client Setup
      s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
      )
      # print(s3_client)
        # Upload the file to S3
      s3_client.upload_fileobj(
        file,
        settings.AWS_STORAGE_BUCKET_NAME,
        file.name
      )
        # Return the file data as a response
      return Response(file_serializer.data, status=HTTP_201_CREATED)
      
      # If the serializer is not valid, return an error response
    return Response(file_serializer.errors, status=HTTP_400_BAD_REQUEST)

class FileList(APIView):
  
  def get(self, request, *args, **kwargs):
    # print("Here")
    s3_client = boto3.client(
      's3',
      aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
      region_name=settings.AWS_S3_REGION_NAME
    )
    print(s3_client)
    response = s3_client.list_objects_v2(Bucket=settings.AWS_STORAGE_BUCKET_NAME)
    files = response.get('Contents', [])
    file_urls = [
      {
        'key': file['Key'],
        'url': f"https://{settings.AWS_S3_CUSTOM_DOMAIN}/{file['Key']}"
      }
      for file in files
    ]
    return Response(file_urls)

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