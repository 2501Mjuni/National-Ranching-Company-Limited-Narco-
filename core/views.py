import traceback
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.db import connection
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Cattle, Ranch, Category, Subcategory
from .serializers import CattleSerializer, RanchSerializer, CategorySerializer, SubcategorySerializer

    
    # For API View using the stored procedure to register new cattle
@api_view(['POST'])
def register_cattle_api(request):
    tag_number = request.data.get('tag_number')
    birth_date = request.data.get('birth_date')
    ranch_id = request.data.get('ranch_id')
    category_id = request.data.get('category_id')
    subcategory_id = request.data.get('subcategory_id', None)

    subcategory_id = None if subcategory_id == '' else subcategory_id

    if not tag_number or not birth_date or not ranch_id or not category_id :
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_new_cattle(%s, %s, %s, %s, %s)',
                [tag_number, birth_date, ranch_id, category_id, subcategory_id]
            )
        return Response({'status': 'Cattle registered successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# For handling form submission (similar to how you register slaughtered cattle)
@csrf_exempt
@require_POST
def register_new_cattle(request):
    tag_number = request.POST.get('tag_number')
    birth_date = request.POST.get('birth_date')
    ranch_id = request.POST.get('ranch_id')
    category_id = request.POST.get('category_id')
    subcategory_id = request.POST.get('subcategory_id', None)


    subcategory_id = None if subcategory_id == '' else subcategory_id

    if not tag_number or not birth_date or not ranch_id or not category_id :
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_new_cattle(%s, %s, %s, %s, %s)',
                [tag_number, birth_date, ranch_id, category_id, subcategory_id]
            )
        return JsonResponse({'status': 'Cattle registered successfully'}, status=200)

    except Exception as e:
        import traceback
        return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)
    
     
# for fetching cattle list
@api_view(['GET'])
def api_cattle_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_cattle_list()")
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
     
class RanchList(generics.ListAPIView):
    queryset = Ranch.objects.all()
    serializer_class = RanchSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SubcategoryList(generics.ListAPIView):
    serializer_class = SubcategorySerializer

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id')
        if category_id:
            return Subcategory.objects.filter(category_id=category_id)
        return Subcategory.objects.all()

class CattleList(generics.ListAPIView):
    queryset = Cattle.objects.all()
    serializer_class = CattleSerializer

@api_view(['GET'])
def cattle_count(request):
    count = Cattle.objects.count()
    return Response({'count': count})



# Registered the death of cattle 

@api_view(['POST'])
def register_death_api(request):
    tag_number = request.data.get('tag_number')
    death_date = request.data.get('death_date')
    reason = request.data.get('reason')
    ranch_id = request.data.get('ranch_id')  # New addition

    if not tag_number or not death_date or not reason or not ranch_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_death(%s, %s, %s, %s)', [tag_number, death_date, reason, ranch_id])  # Updated call
        return Response({'status': 'Death registered successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Form Submission Views   
@csrf_exempt
@require_POST
def register_death(request):
    tag_number = request.POST.get('tag_number')
    death_date = request.POST.get('death_date')
    reason = request.POST.get('reason')
    ranch_id = request.POST.get('ranch_id')  # New addition

    if not tag_number or not death_date or not reason or not ranch_id:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_death(%s, %s, %s, %s)', [tag_number, death_date, reason, ranch_id])  # Updated call
        return JsonResponse({'status': 'Death registered successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    
      
# death cattle database function
@api_view(['GET'])
def api_death_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_death_cattle()")
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# register sold cattle

@api_view(['POST'])
def register_sale_api(request):
    tag_number = request.data.get('tag_number')
    sale_date = request.data.get('sale_date')
    price = request.data.get('price')
    market_name = request.data.get('market_name')
    ranch_id = request.data.get('ranch_id')  # New addition

    if not tag_number or not sale_date or not price or not market_name or not ranch_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_sale(%s, %s, %s, %s, %s)', [tag_number, sale_date, price, market_name, ranch_id])
        return Response({'status': 'Sale registered successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#for submiting sale of cattle 
@csrf_exempt
@require_POST
def register_sale(request):
    tag_number = request.POST.get('tag_number')
    sale_date = request.POST.get('sale_date')
    price = request.POST.get('price')
    market_name = request.POST.get('market_name')
    ranch_id = request.POST.get('ranch_id')

    if not tag_number or not sale_date or not price or not market_name:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_sale(%s, %s, %s, %s, %s)', [tag_number, sale_date, price, market_name, ranch_id])
        return JsonResponse({'status': 'Sale registered successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
# for sold cattle list
@api_view(['GET'])
def api_sale_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_sold_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
# register the cattle recovery 
@api_view(['POST'])
def register_recovery_api(request):
    tag_number = request.data.get('tag_number')
    recovery_date = request.data.get('recovery_date')
    notes = request.data.get('notes')
    ranch_id = request.data.get('ranch_id')  # New addition

    if not tag_number or not recovery_date or not ranch_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_recovery(%s, %s, %s, %s)', [tag_number, recovery_date, notes, ranch_id])
        return Response({'status': 'Recovery registered successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
# submiting the recovery data 
@csrf_exempt
@require_POST
def register_recovery(request):
    tag_number = request.POST.get('tag_number')
    recovery_date = request.POST.get('recovery_date')
    notes = request.POST.get('notes')
    ranch_id = request.POST.get('ranch_id')


# Log all incoming data to debug
    print(f"Received data - tag_number: {tag_number}, recovery_date: {recovery_date}, notes: {notes}, ranch_id: {ranch_id}")


    if not tag_number or not recovery_date or not ranch_id:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_recovery(%s, %s, %s, %s)', [tag_number, recovery_date, notes, ranch_id])
        return JsonResponse({'status': 'Recovery registered successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    

# list the recoveries cattle 
@api_view(['GET'])
def api_recovery_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_recovered_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# for registered slaughted cattle

@api_view(['POST'])
def register_slaughter_api(request):
    tag_number = request.data.get('tag_number')
    slaughter_date = request.data.get('slaughter_date')
    ranch_id = request.data.get('ranch_id')  # New addition

    if not tag_number or not slaughter_date or not ranch_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_slaughter(%s, %s, %s)', [tag_number, slaughter_date, ranch_id])
        return Response({'status': 'Slaughter registered successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# for handling submiting slaughter cattle

@csrf_exempt
@require_POST
def register_slaughter(request):
    tag_number = request.POST.get('tag_number')
    slaughter_date = request.POST.get('slaughter_date')
    ranch_id = request.POST.get('ranch_id')

    if not tag_number or not slaughter_date or not ranch_id:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute('CALL register_slaughter(%s, %s, %s)', [tag_number, slaughter_date, ranch_id])
        return JsonResponse({'status': 'Slaughter registered successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# for the list of slaughtered cattle

@api_view(['GET'])
def api_slaughter_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_slaughtered_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# register the transfer

@api_view(['POST'])
def register_transfer_api(request):
    tag_number = request.data.get('tag_number')
    transfer_date = request.data.get('transfer_date')
    reason = request.data.get('reason')
    current_ranch_id = request.data.get('current_ranch_id')
    new_ranch_id = request.data.get('new_ranch_id', None)
    project_location = request.data.get('project_location', None)

    # Convert empty strings to None
    if new_ranch_id == '':
        new_ranch_id = None
    if project_location == '':
        project_location = None

    # Validate required fields
    if not tag_number or not transfer_date or not current_ranch_id:
        return Response({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_transfer(%s, %s, %s, %s, %s, %s)',
                [tag_number, transfer_date, reason, current_ranch_id, new_ranch_id, project_location]
            )
        return Response({'status': 'Transfer registered successfully'}, status=200)
    except Exception as e:
        return Response({'error': f'An error occurred: {str(e)}'}, status=500)




    #this is for submision of transfer  
@csrf_exempt
@require_POST
def register_transfer_form_submission(request):
    tag_number = request.POST.get('tag_number')
    transfer_date = request.POST.get('transfer_date')
    reason = request.POST.get('reason')
    current_ranch_id = request.POST.get('current_ranch_id')
    new_ranch_id = request.POST.get('new_ranch_id', None)
    project_location = request.POST.get('project_location', None)

    # Convert empty strings to None
    if new_ranch_id == '':
        new_ranch_id = None
    if project_location == '':
        project_location = None

    # Validate required fields
    if not tag_number or not transfer_date or not current_ranch_id:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_transfer(%s, %s, %s, %s, %s, %s)',
                [tag_number, transfer_date, reason, current_ranch_id, new_ranch_id, project_location]
            )
        return JsonResponse({'status': 'Transfer registered successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    
    
# for the list of transferred cattle
@api_view(['GET'])
def api_transferred_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_transferred_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


     
    
    
#register complementary 
@api_view(['POST'])
def register_complementary_api(request):
    # Get data from request
    tag_number = request.data.get('tag_number')
    ranch_id = request.data.get('ranch_id')
    date = request.data.get('date')
    reason = request.data.get('reason')

    # Validate required fields
    if not tag_number or not ranch_id or not date or not reason:
        return Response({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            # Call the stored procedure
            cursor.execute(
                'CALL register_complementary_cattle(%s, %s, %s, %s)',
                [tag_number, ranch_id, date, reason]
            )
        return Response({'status': 'Complementary cattle registered successfully'}, status=200)
    except Exception as e:
        return Response({'error': f'An error occurred: {str(e)}'}, status=500)
    

# for the submision of complementary 
@csrf_exempt
@require_POST
def register_complementary_cattle_form_submission(request):
    # Get data from request
    tag_number = request.POST.get('tag_number')
    ranch_id = request.POST.get('ranch_id')
    date = request.POST.get('date')
    reason = request.POST.get('reason')

    # Validate required fields
    if not tag_number or not ranch_id or not date or not reason:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            # Call the stored procedure
            cursor.execute(
                'CALL register_complementary_cattle(%s, %s, %s, %s)',
                [tag_number, ranch_id, date, reason]
            )
        return JsonResponse({'status': 'Complementary cattle registered successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
    
    
# for the list of complementary cattle

@api_view(['GET'])
def api_complementary_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_complementary_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


     
    
# For API View using the stored procedure to register bought cattle
@api_view(['POST'])
def register_bought_api(request):
    tag_number = request.data.get('tag_number')
    category_id = request.data.get('category_id')
    subcategory_id = request.data.get('subcategory_id')
    ranch_id = request.data.get('ranch_id')
    location = request.data.get('location')
    condition = request.data.get('condition')
    bought_date = request.data.get('bought_date')

    # Check if all required fields are provided
    if not all([tag_number, category_id, subcategory_id, ranch_id, location, condition, bought_date]):
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Call the stored procedure to register bought cattle
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_bought_cattle(%s, %s, %s, %s, %s, %s, %s)',
                [tag_number, category_id, subcategory_id, ranch_id, location, condition, bought_date]
            )
        return Response({'status': 'Cattle registered successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Catch and return any exceptions
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# For handling form submission (similar to how you register other cattle events)
@csrf_exempt
@require_POST
def register_bought_cattle(request):
    tag_number = request.POST.get('tag_number')
    category_id = request.POST.get('category_id')
    subcategory_id = request.POST.get('subcategory_id')
    ranch_id = request.POST.get('ranch_id')
    location = request.POST.get('location')
    condition = request.POST.get('condition')
    bought_date = request.POST.get('bought_date')
    # Check if all required fields are provided
    if not all([tag_number, category_id, subcategory_id, ranch_id, location, condition, bought_date]):
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        # Call the stored procedure to register bought cattle
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_bought_cattle(%s, %s, %s, %s, %s, %s)',
                [tag_number, category_id, subcategory_id, ranch_id, location, condition, bought_date]
            )
        return JsonResponse({'status': 'Cattle registered successfully'}, status=200)

    except Exception as e:
        # Catch and return any exceptions
        import traceback
        return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)
    
    

# this is for the list of bought cattle

@api_view(['GET'])
def api_bought_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_bought_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





    
     
    
# For API View using the stored procedure to register new birth cattle
@api_view(['POST'])
def register_new_birth_api(request):
    tag_number = request.data.get('tag_number')
    ranch_id = request.data.get('ranch_id')
    birth_date = request.data.get('birth_date')
    category_id = request.data.get('category_id')
    subcategory_id = request.data.get('subcategory_id', None)


  # Convert empty strings to None
    subcategory_id = None if subcategory_id == '' else subcategory_id

  # Check if all required fields are provided
    if not tag_number or not ranch_id or not birth_date or not category_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)


    try:
        # Call the stored procedure to register new birth cattle
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_new_birth_cattle(%s, %s, %s, %s, %s)',
                [tag_number, ranch_id, birth_date, category_id, subcategory_id]
            )
        return Response({'status': 'Cattle registered successfully'}, status=status.HTTP_200_OK)

    except Exception as e:
        # Catch and return any exceptions
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
   # For handling form submission (similar to how you register other cattle events) for the new birth 
@csrf_exempt 
@require_POST
def register_new_birth(request):
    tag_number = request.POST.get('tag_number')
    ranch_id = request.POST.get('ranch_id')
    birth_date = request.POST.get('birth_date')
    category_id = request.POST.get('category_id')
    subcategory_id = request.POST.get('subcategory_id', None)

  # Convert empty strings to None
    subcategory_id = None if subcategory_id == '' else subcategory_id

  # Check if all required fields are provided
    if not tag_number or not ranch_id or not birth_date or not category_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Call the stored procedure to register new birth cattle
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_new_birth_cattle(%s, %s, %s, %s, %s)',
                [tag_number, ranch_id, birth_date, category_id, subcategory_id]
            )
        return JsonResponse({'status': 'Cattle registered successfully'}, status=200)

    except Exception as e:
        # Catch and return any exceptions
        return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)



# this is for the list of birth cattle

@api_view(['GET'])
def api_birth_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_birth_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# APi for adding the new cattle
@api_view(['POST'])
def add_ranch_api(request):
    ranch_name = request.data.get('name')

    if not ranch_name:
        return Response({'error': 'Missing ranch name'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL add_ranch(%s)',
                [ranch_name]
            )
        return Response({'status': 'Ranch added successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # for submiting the ranch that are added  
@csrf_exempt
@require_POST
def add_ranch(request):
    ranch_name = request.POST.get('name')

    if not ranch_name:
        return JsonResponse({'error': 'Missing ranch name'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL add_ranch(%s)',
                [ranch_name]
            )
        return JsonResponse({'status': 'Ranch added successfully'}, status=200)

    except Exception as e:
        import traceback
        return JsonResponse({'error': str(e), 'traceback': traceback.format_exc()}, status=500)
    
    
 
# API view to register lost cattle
@api_view(['POST'])
def register_lost_api(request):
    tag_number = request.data.get('tag_number')
    lost_date = request.data.get('lost_date')
    ranch_id = request.data.get('ranch_id')

    if not tag_number or not lost_date or not ranch_id:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_lost_cattle(%s, %s, %s)',
                [tag_number, lost_date, ranch_id]
            )
        return Response({'status': 'Cattle registered as lost successfully'}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        # Log the error in production instead of returning stack trace
        return Response({'error': 'An error occurred while processing your request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Form submission view to register lost cattle
@csrf_exempt
@require_POST
def register_lost(request):
    tag_number = request.POST.get('tag_number')
    lost_date = request.POST.get('lost_date')
    ranch_id = request.POST.get('ranch_id')

    if not tag_number or not lost_date or not ranch_id:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'CALL register_lost_cattle(%s, %s, %s)',
                [tag_number, lost_date, ranch_id]
            )
        return JsonResponse({'status': 'Cattle registered as lost successfully'}, status=201)
    
    except Exception as e:
        # Log the error in production instead of returning stack trace
        import traceback
        return JsonResponse({'error': 'An error occurred while processing your request.'}, status=500)

# for the lost cattle
@api_view(['GET'])
def api_lost_list(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM fetch_lost_cattle()")  # Call the PostgreSQL function
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#  this fetch each cattle details 
@api_view(['GET'])
def api_cattle_details_list(request, tag_number):
    try:
        with connection.cursor() as cursor:
            # Correct way to call the PostgreSQL function
            cursor.execute("SELECT * FROM fetch_cattle_details(%s);", [tag_number])
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            data = [dict(zip(columns, row)) for row in result]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
