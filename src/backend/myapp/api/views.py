from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from .models import User, Course, Application, Assignment, Notification, Review
from .serializers import UserSerializer, CourseSerializer, ApplicationSerializer, AssignmentSerializer, NotificationSerializer, ReviewSerializer
from supabase import create_client, Client

# TODO: Supabase Client
#-------------------------------------------------------------------------------
url = "https://qguyqnambotnqensjyku.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndXlxbmFtYm90bnFlbnNqeWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4OTMwOTcsImV4cCI6MjA0NTQ2OTA5N30.aJ-FqjjHHJUozIZ-aayF4wguIHUIqjnU1cHt4U2Ci5I"
supabase: Client = create_client(url, key)

# TODO: Login
#-------------------------------------------------------------------------------
@api_view(['POST'])
def login_user(request):  # User login
    email = request.data.get('email')
    password = request.data.get('password')
    print(f"Email received: {email}")
    # Pull User info from Supabase DB
    result = supabase.table('users').select('*').eq('email', email).execute()

    if result.data:
        user = result.data[0]
        password_hash = user['password_hash']

        # If password matches hashed password in DB, return User object
        if check_password(password, password_hash):
            print("Login successful")
            return Response(user, status=status.HTTP_200_OK)
        # Else, return error to React
        else:
            print("Wrong password")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        print("User not found.")
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

# TODO: Modular Functions
#-------------------------------------------------------------------------------
def create_object(request, table_name):  # Create a new Object from data provided
    # Create a data object of data besides the table_name to be inserted into DB
    data = {key: value for key, value in request.data.items() if key != 'table_name'}

    # Handle exception if table_name or data isn't provided
    if not table_name or not data:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    # For creating Users, Hash passwords using Django's built-in PBKDF2 hashing algorithm
    if table_name == "users":
        password_hash = make_password(request.data.get('password_hash'))
        data["password_hash"] = password_hash

    # Insert data into Supabase DB
    result = supabase.table(table_name).insert(data).execute()

    # If the insert was successful, return Object to React
    if result.data:
        object = result.data[0]
        return Response(object, status=status.HTTP_201_CREATED)
    # Else, return error to React
    else:
        return Response({"error": "Insert failed"}, status=status.HTTP_400_BAD_REQUEST)


# Database Primary Key dictionary
primary_key_dict = {
    "users": "user_id",
    "courses": "course_id",
    "applications": "application_id",
    "assignments": "assignment_id",
    "notifications": "notification_id",
    "reviews": "review_id"
}

def get_objects(request, table_name):  # Get a list of all Objects from DB
    # Set primary key to the correct table in Supabase DB
    primary_key = primary_key_dict.get(table_name, 'id')

    # Pull Objects from Supabase DB and sort in ascending order by primary key
    result = supabase.table(table_name).select("*").order(primary_key, desc=False).execute()

    # If valid Objects, return Object to React
    if result.data:
        objects = result.data
        return Response(objects, status=status.HTTP_200_OK)
    # Else, return error to React
    else:
        print("Objects not found")
        return Response({"error": "Objects not found"}, status=status.HTTP_404_NOT_FOUND)


def object_info(request, table_name, object_id):  # Get/Edit/Delete a single Object
    # Set primary key to the correct table in Supabase DB
    primary_key = primary_key_dict.get(table_name, 'id')

    # Pull Object from Supabase DB
    result = supabase.table(table_name).select('*').eq(primary_key, object_id).execute()

    # If valid Object, return Object to React
    if result.data:
        object = result.data[0]
    # Else, return error to React
    else:
        print("Object not found")
        return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

    # Get Object
    if request.method == 'GET':
        return Response(object, status=status.HTTP_200_OK)

    # Update Object
    elif request.method == 'PUT':
        updated_data = request.data

        try:
            # Update Object in Supabase DB with newly provided data
            update_response = supabase.table(table_name).update(updated_data).eq(primary_key, object_id).execute()

            # If update was successful, return newly updated Object to React
            if update_response.data:
                return Response(update_response.data[0], status=status.HTTP_200_OK)
            # Else, return error to React
            else:
                return Response({"error": "Failed to update object"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"An error occured during update: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    # Delete Object
    elif request.method == 'DELETE':
        try:
            # Delete Object in Supabase DB
            delete_response = supabase.table(table_name).delete().eq(primary_key, object_id).execute()

            # If delete was successful, return OK message to React
            if delete_response.data:
                return Response({"error": "Object successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
            # Else, return error to React
            else:
                return Response({"error": "Failed to delete object"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"An error occurred during deletion: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

# TODO: Select TA
#-------------------------------------------------------------------------------
@api_view(['PUT'])
def select_ta(request, application_id):
    try:
        # Update the application's status to "accepted"
        result = supabase.table('applications').update({
            "status": "accepted"
        }).eq("application_id", application_id).execute()

        if result.data:
            # Notify the applicant
            applicant_id = result.data[0]['applicant_id']  # Get the applicant's ID
            notification_result = supabase.table('notifications').insert({
                "user_id": applicant_id,
                "message": "Congratulations! You have been selected as a TA for the course.",
                "status": "unread"
            }).execute()

            if notification_result.data:
                return Response({"message": "TA selected and applicant notified successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to send notification to the applicant."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Failed to update application status."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Other functions remain unchanged...
