import psycopg2
from psycopg2 import OperationalError

def test_connection():
    connection = None  # Initialize connection variable outside the try block
    try:
        # Connect to your Supabase PostgreSQL database
        connection = psycopg2.connect(
            host="aws-0-us-east-1.pooler.supabase.com",
            port="6543",
            user='postgres.qguyqnambotnqensjyku',
            password='KjzHVeAdc8vbBj9K',
            database="postgres"
        )

        # Check if connection is successful
        print("Connection successful!")
        return connection
    
    except OperationalError as e:
        print(f"Error: {e}")
        return None
    finally:
        if connection:
            connection.close()

# Run the test
test_connection()