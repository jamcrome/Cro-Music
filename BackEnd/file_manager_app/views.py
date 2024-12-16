from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import PDFFile
from .serializers import PDFFileSerializer

# Create your views here.
class UploadPDF(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request, *args, **kwargs):
    file = request.FILES.get('file')

    if not file:
      return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    pdf_file = PDFFile(user=request.user, file=file)
    pdf_file.save()

    serializer = PDFFileSerializer(pdf_file)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  
# class ViewPDF(APIView):
