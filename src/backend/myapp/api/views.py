from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from .models import User, Course, Application, Assignment, Notification, Review
from .serializers import UserSerializer, CourseSerializer, ApplicationSerializer, AssignmentSerializer, NotificationSerializer, ReviewSerializer
from supabase import create_client, Client


#TODO: Supabase Client
#-------------------------------------------------------------------------------
url = "https://qguyqnambotnqensjyku.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndXlxbmFtYm90bnFlbnNqeWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4OTMwOTcsImV4cCI6MjA0NTQ2OTA5N30.aJ-FqjjHHJUozIZ-aayF4wguIHUIqjnU1cHt4U2Ci5I"
supabase: Client = create_client(url, key)


#TODO: Login
#-------------------------------------------------------------------------------
@api_view(['POST'])
def login_user(request):                                        #User login
    email = request.data.get('email')
    password = request.data.get('password')
    
    #Pull User info from Supabase DB
    result = supabase.table('users').select('*').eq('email', email).execute()
    
    if result.data:
        user = result.data[0]
        password_hash = user['password_hash']
        
        #If password matches hashed password in DB, return User object
        if check_password(password, password_hash):
            print("Login successful")
            return Response(user, status=status.HTTP_200_OK)
        #Else, return error to React
        else:
            print("Wrong password")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
    else:
        print("User not found.")
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


#TODO: Modular Functions
#-------------------------------------------------------------------------------
def create_object(request, table_name):                         #Create a new Object from data provided
    #Create a data object of data besides the table_name to be inserted into DB
    data = {key: value for key,value in request.data.items() if key != 'table_name'}

    #Handle exception if table_name or data isn't provided
    if not table_name or not data:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    #For creating Users, Hash passwords using Django's built-in PBKDF2 hashing algorithm
    if table_name == "users":
        password_hash = make_password(request.data.get('password_hash'))
        data["password_hash"] = password_hash
    
    #Insert data into Supabase DB
    result = supabase.table(table_name).insert(data).execute()

    #If the insert was successful, return Object to React
    if result.data:
        object = result.data[0]
        return Response(object, status=status.HTTP_201_CREATED)
    #Else, return error to React
    else:
        return Response({"error": "Insert failed"}, status=status.HTTP_400_BAD_REQUEST)


#Database Primary Key dictionary
primary_key_dict = {
    "users": "user_id",
    "courses": "course_id",
    "applications": "application_id",
    "assignments": "assignment_id",
    "notifications": "notification_id",
    "reviews": "review_id"
}


def get_objects(request, table_name):                           #Get a list of all Objects from DB
    #Set primary key to the correct table in Supabase DB
    primary_key = primary_key_dict.get(table_name, 'id')

    #Pull Objects from Supabase DB and sort in ascending order by primary key
    result = supabase.table(table_name).select("*").order(primary_key, desc=False).execute()
    
    #If valid Objects, return Object to React
    if result.data:
        objects = result.data
        return Response(objects, status=status.HTTP_200_OK)
    #Else, return error to React
    else:
        print("Objects not found")
        return Response({"error": "Objects not found"}, status=status.HTTP_404_NOT_FOUND)


def object_info(request, table_name, object_id):                #Get/Edit/Delete a single Object
    #Set primary key to the correct table in Supabase DB
    primary_key = primary_key_dict.get(table_name, 'id')

    #Pull Object from Supabase DB
    result = supabase.table(table_name).select('*').eq(primary_key, object_id).execute()

    #If valid Object, return Object to React
    if result.data:
        object = result.data[0]
    #Else, return error to React
    else:
        print("Object not found")
        return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
    
    #Get Object
    if request.method == 'GET':
        return Response(object, status=status.HTTP_200_OK)
    
    #Update Object
    elif request.method == 'PUT':
        updated_data = request.data

        try:
            #Update Object in Supabase DB with newly provided data
            update_response = supabase.table(table_name).update(updated_data).eq(primary_key, object_id).execute()

            #If update was successful, return newly updated Object to React
            if update_response.data:
                return Response(update_response.data[0], status=status.HTTP_200_OK)
            #Else, return error to React
            else:
                return Response({"error": "Failed to update object"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": f"An error occured during update: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    
    #Delete Object
    elif request.method == 'DELETE':
        try:
            #Delete Object in Supabase DB
            delete_response = supabase.table(table_name).delete().eq(primary_key, object_id).execute()

            #If delete was successful, return OK message to React
            if delete_response.data:
                return Response({"error": "Object successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
            #Else, return error to React
            else:
                return Response({"error": "Failed to delete object"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": f"An error occurred during deletion: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


#TODO: User
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_user(request):
    return create_object(request, 'users')

@api_view(['GET'])
def get_users(request):
    return get_objects(request, 'users')

@api_view(['GET', 'PUT', 'DELETE'])
def user_info(request, user_id):
    return object_info(request, 'users', user_id)


#TODO: Course
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_course(request):
    return create_object(request, 'courses')

@api_view(['GET'])
def get_courses(request):
    return get_objects(request, 'courses')

@api_view(['GET', 'PUT', 'DELETE'])
def course_info(request, course_id):
    return object_info(request, 'courses', course_id)


#TODO: Application
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_application(request):
    return create_object(request, 'applications')

@api_view(['GET'])
def get_applications(request):
    return get_objects(request, 'applications')

@api_view(['GET', 'PUT', 'DELETE'])
def application_info(request, application_id):
    return object_info(request, 'applications', application_id)


#TODO: Assignment
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_assignment(request):
    return create_object(request, 'assignments')

@api_view(['GET'])
def get_assignments(request):
    return get_objects(request, 'assignments')

@api_view(['GET', 'PUT', 'DELETE'])
def assignment_info(request, assignment_id):
    return object_info(request, 'assignments', assignment_id)


#TODO: Notification
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_notification(request):
    return create_object(request, 'notifications')

@api_view(['GET'])
def get_notifications(request):
    return get_objects(request, 'notifications')

@api_view(['GET', 'PUT', 'DELETE'])
def notification_info(request, notification_id):
    return object_info(request, 'notifications', notification_id)


#TODO: Review
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_review(request):
    return create_object(request, 'reviews')

@api_view(['GET'])
def get_reviews(request):
    return get_objects(request, 'reviews')

@api_view(['GET', 'PUT', 'DELETE'])
def review_info(request, review_id):
    return object_info(request, 'reviews', review_id)





# @api_view(['GET'])
# def retrieve(request):                  #Get a list of all Objects from DB
#     table_name = "users"
#     #Set the Primary key depending on the table_name selected to sort the results in ascending order
#     primary_key = primary_key_dict.get(table_name, 'id')

#     #Pull Objects from Supabase DB in ascending order
#     result = supabase.table(table_name).select("*").order(primary_key, desc=False).execute()
    
#     if result.data:
#         objects = result.data
#         return Response(objects, status=status.HTTP_200_OK)
#     else:
#         print("No Users")
#         return Response(None, status=status.HTTP_404_NOT_FOUND)

# @api_view(['POST'])
# def register(request):                #Create a new Object from data provided
#     #Store data from React into variables
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password_hash')
#     role = request.data.get('role')

#     #Hash password (Uses Django's built-in PBKDF2 hashing algorithm)
#     password_hash = make_password(password)

#     if not username or not email or not password or not role:
#         return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
    
#     #Insert new user data into DB
#     response = supabase.table('users').insert({
#         "username": username, 
#         "password_hash": password_hash, 
#         "role": role, 
#         "email": email
#     }).execute()

#     #If the data provided is valid, return User object and OK response
#     if response.data:  # If insert is successful
#         user = response.data[0]
#         return Response(user, status=status.HTTP_201_CREATED)
#     else:
#         return Response(response.error, status=status.HTTP_400_BAD_REQUEST)

'''
#TODO: Modular Functions
#-------------------------------------------------------------------------------
def create_object(request, model, serializer_class):                #Create a new Object from data provided
    #Data provided by Object
    serializer = serializer_class(data=request.data)

    #If the data provided is valid, save the data to the DB
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_objects(request, model, serializer_class):                  #Get a list of all Users and their attributes from DB
    #Get all objects and their attributes from DB
    objects = model.objects.all()

    # Serialize the user data
    serializer = serializer_class(objects, many=True)

    return Response(serializer.data)

def object_info(request, model, serializer_class, object_id, pk_field='id'):       #Get/Edit/Delete a single User
    #Check if the user exists
    try:
        object = model.objects.get(**{pk_field: object_id})
    #If user doesn't exist, return error
    except model.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    #Get user information
    if request.method == 'GET':
        serializer = serializer_class(object)
        return Response(serializer.data)
    
    #Edit user information with newly provided data 
    elif request.method == 'PUT':
        serializer = serializer_class(object, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    #Delete user
    elif request.method == 'DELETE':
        object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#TODO: User
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_user(request):
    return create_object(request, User, UserSerializer)

@api_view(['GET'])
def get_users(request):
    return get_objects(request, User, UserSerializer)

@api_view(['GET', 'PUT', 'DELETE'])
def user_info(request, user_id):
    return object_info(request, User, UserSerializer, user_id, pk_field='user_id')


#TODO: Course
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_course(request):
    return create_object(request, Course, CourseSerializer)

@api_view(['GET'])
def get_courses(request):
    return get_objects(request, Course, CourseSerializer)

@api_view(['GET', 'PUT', 'DELETE'])
def course_info(request, course_id):
    return object_info(request, Course, CourseSerializer, course_id, pk_field='course_id')


#TODO: Application
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_application(request):
    return create_object(request, Application, ApplicationSerializer)

@api_view(['GET'])
def get_applications(request):
    return get_objects(request, Application, ApplicationSerializer)

@api_view(['GET', 'PUT', 'DELETE'])
def application_info(request, application_id):
    return object_info(request, Application, ApplicationSerializer, application_id, pk_field='application_id')


#TODO: Assignment
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_assignment(request):
    return create_object(request, Assignment, AssignmentSerializer)

@api_view(['GET'])
def get_assignments(request):
    return get_objects(request, Assignment, AssignmentSerializer)

@api_view(['GET', 'PUT', 'DELETE'])
def assignment_info(request, assignment_id):
    return object_info(request, Assignment, AssignmentSerializer, assignment_id, pk_field='assignment_id')


#TODO: Notification
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_notification(request):
    return create_object(request, Notification, NotificationSerializer)

@api_view(['GET'])
def get_notifications(request):
    return get_objects(request, Notification, NotificationSerializer)

@api_view(['GET', 'PUT', 'DELETE'])
def notification_info(request, notification_id):
    return object_info(request, Notification, NotificationSerializer, notification_id, pk_field='notification_id')


#TODO: Review
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_review(request):
    return create_object(request, Review, ReviewSerializer)

@api_view(['GET'])
def get_reviews(request):
    return get_objects(request, Review, ReviewSerializer)

@api_view(['GET', 'PUT', 'DELETE'])
def review_info(request, review_id):
    return object_info(request, Review, ReviewSerializer, review_id, pk_field='review_id')
'''

'''
#TODO: User
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_user(request):                                   #Create a new User from data provided
    #Data provided by user
    serializer = UserSerializer(data=request.data)

    #If the data provided is valid, save the data to the DB
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_users(request):                                     #Get a list of all Users and their attributes from DB
    #Get all users and their attributes from DB
    users = User.objects.all()

    # Serialize the user data
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def user_info(request, user_id):                            #Get/Edit/Delete a single User
    #Check if the user exists
    try:
        user = User.objects.get(user_id=user_id)
    #If user doesn't exist, return error
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    #Get user information
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    #Edit user information with newly provided data 
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    #Delete user
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#TODO: Course
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_course(request):                                 #Create a new Course from data provided
    serializer = CourseSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_courses(request):                                   #Get a list of all Courses and their attributes from DB
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)

    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def course_info(request, course_id):                        #Get/Edit/Delete a single Course
    try:
        course = Course.objects.get(course_id=course_id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#TODO: Application
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_application(request):                            #Create a new Application from data provided
    serializer = ApplicationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_applications(request):                              #Get a list of all Applications and their attributes from DB
    applications = Application.objects.all()
    serializer = ApplicationSerializer(applications, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_applications_by_user(request, applicant_id):        #Get a list of all Applications filtered by user_id from DB
    try:
        applications = Application.objects.filter(applicant_id=applicant_id)
        if not applications:
            return Response(
                {"message": f"No applications found for applicant ID {applicant_id}"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)
    
    except Application.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_applications_by_course(request, course_id):         #Get a list of all Applications filtered by course_id from DB
    try:
        applications = Application.objects.filter(course_id=course_id)
        if not applications:
            return Response(
                {"message": f"No applications found for course ID {course_id}"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)
    
    except Application.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT', 'DELETE'])
def application_info(request, application_id):              #Get/Edit/Delete a single Application
    try:
        application = Application.objects.get(application_id=application_id)
    except Application.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ApplicationSerializer(application)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ApplicationSerializer(application, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#TODO: Assignment
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_assignment(request):                             #Create a new Application from data provided
    serializer = AssignmentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_assignments(request):                               #Get a list of all Assignments and their attributes from DB
    assignments = Assignment.objects.all()
    serializer = AssignmentSerializer(assignments, many=True)

    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def assignment_info(request, assignment_id):                #Get/Edit/Delete a single Application
    try:
        assignment = Assignment.objects.get(assignment_id=assignment_id)
    except Notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = AssignmentSerializer(assignment, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#TODO: Notification
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_notification(request):                           #Create a new Notification from data provided
    serializer = NotificationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_notifications(request):                             #Get a list of all Notification and their attributes from DB
    notifications = Notification.objects.all()
    serializer = NotificationSerializer(notifications, many=True)

    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def notification_info(request, notification_id):            #Get/Edit/Delete a single Notification
    try:
        notification = Notification.objects.get(notification_id=notification_id)
    except Notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = NotificationSerializer(notification, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#TODO: Review
#-------------------------------------------------------------------------------
@api_view(['POST'])
def create_review(request):                                 #Create a new Application from data provided
    serializer = ReviewSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_reviews(request):                                   #Get a list of all Assignments and their attributes from DB
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def review_info(request, review_id):                        #Get/Edit/Delete a single Application
    try:
        review = Review.objects.get(review_id=review_id)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
'''