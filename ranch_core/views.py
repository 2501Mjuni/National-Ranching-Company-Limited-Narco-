# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
import traceback

class CattleByRanchAndCategory(APIView):
    def get(self, request, ranch_id, category_name):
        # Construct the SQL query to call the PostgreSQL function
        sql_query = """
            SELECT tag_number, cattle_status 
            FROM fetch_cattle_by_ranch_and_category(%s, %s);
        """
        
        try:
            with connection.cursor() as cursor:
                # Execute the SQL query
                cursor.execute(sql_query, [ranch_id, category_name])
                result = cursor.fetchall()
                
                # Get column names
                columns = [desc[0] for desc in cursor.description]
                
                # Prepare the data
                data = [dict(zip(columns, row)) for row in result]

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle exceptions and provide traceback
            return Response({'error': str(e), 'traceback': traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)