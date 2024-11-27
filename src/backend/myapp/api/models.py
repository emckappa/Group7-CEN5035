from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password_hash = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=[
        ('TA Applicant', 'TA Applicant'),
        ('Administrator', 'Administrator'),
        ('TA Committee Member', 'TA Committee Member'),
        ('Instructor', 'Instructor')
    ], default='TA Applicant')
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'users'


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_code = models.CharField(max_length=50, unique=True)
    course_name = models.CharField(max_length=100)
    instructor_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses_taught', db_column='instructor_id')
    term = models.CharField(max_length=50, choices=[
        ('Fall', 'Fall'),
        ('Spring', 'Spring'),
        ('Summer', 'Summer'),
    ], default='Fall', null=True, blank=True)
    year = models.IntegerField()

    def __str__(self):
        return f"Course {self.course_code}: {self.course_name} ({self.term} {self.year})"
    
    class Meta:
        db_table = 'courses'

def validate_cv_link(value):
    # If the URL starts with "www.", prepend "http://"
    if value.startswith('www.'):
        value = 'http://' + value

    # Use Django's built-in URLValidator for additional validation
    validator = URLValidator()
    try:
        validator(value)  # This will raise a ValidationError if the URL is invalid
    except ValidationError:
        raise ValidationError(f"Invalid URL: {value}")

class Application(models.Model):
    application_id = models.AutoField(primary_key=True)
    applicant_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications', db_column='applicant_id')
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='applications', db_column='course_id')
    status = models.CharField(max_length=50, choices=[
        ('Submitted', 'Submitted'),
        ('Rreviewed', 'Reviewed'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected')
    ], default='Submitted')
    submission_date = models.DateTimeField(auto_now_add=True)
    cv_link = models.URLField(max_length=255, null=False)
    cv_link = models.CharField(max_length=255, validators=[validate_cv_link])
    statement = models.TextField()

    def __str__(self):
        return f"Application {self.application_id} for {self.applicant_id.username}"
    
    class Meta:
        db_table = 'applications'


class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='assignments', db_column='application_id')
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments', db_column='course_id')
    assigned_ta_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ta_assignments', db_column='assigned_ta_id')
    assignment_date = models.DateTimeField(auto_now_add=True)
    assignment_status = models.CharField(max_length=50, choices=[
        ('Assigned', 'Assigned'),
        ('Withdrawn', 'Withdrawn'),
        ('Completed', 'Completed'),
    ], default='Assigned')

    def __str__(self):
        return f"{self.assigned_ta_id.username} assigned to ({self.course_id.course_code}: {self.course_id.course_name}) for ({self.course_id.term} {self.course_id.year})"
    
    class Meta:
        db_table = 'assignments'


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', db_column='user_id')
    message = models.TextField()
    notification_date = models.DateTimeField(auto_now_add=True)
    read_status = models.BooleanField(default=False)

    def __str__(self):
        read_status = 'Read' if self.read_status else 'Unread'
        return f"Notification {self.notification_id} for {self.user.username}: {read_status}"

    class Meta:
        db_table = 'notifications'


class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    application_id = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='reviews', db_column='application_id')
    reviewer_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_made', db_column='reviewer_id')
    review_date = models.DateTimeField(auto_now_add=True)
    comments = models.TextField()
    decision = models.CharField(max_length=50, choices=[
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Further Review', 'Further Review'),
    ], default='Further Review')

    class Meta:
        db_table = 'reviews'