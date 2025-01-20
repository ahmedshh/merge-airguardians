# Dockerfile for Python Backend
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the Python files and dependencies
COPY app.py get_arduino_data.py requirements.txt ./

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose the port Flask will run on
EXPOSE 5000

# Command to run the Python app
CMD ["python", "app.py"]
