

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import CustomUser
from .serializers import AdminRegistrationSerializer, LoginSerializer
from rest_framework import status

class AdminRegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = AdminRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Return a custom response
        return Response({
            "email": serializer.data['email'],
            "username": serializer.data['username']
        }, status=status.HTTP_201_CREATED)

# this is for login
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data
        return Response({
            "refresh": tokens["refresh"],
            "access": tokens["access"],
        })
