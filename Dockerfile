# Use an official Python runtime as a parent image
FROM python:3

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Continuously write the outputs to the JSON file every 5 seconds
CMD [ "python", "app.py" ]
