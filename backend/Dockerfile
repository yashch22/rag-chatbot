FROM python:3.10-slim

# Install the required dependencies for psycopg2 and libpq
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the requirements.txt file into the container and install the Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app/

# Start the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
