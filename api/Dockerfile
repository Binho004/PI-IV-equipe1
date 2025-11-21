FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies (if needed) and build deps
RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	gcc \
 && rm -rf /var/lib/apt/lists/*

# Copy only requirements first to leverage Docker cache
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r /app/requirements.txt

# Copy app source
COPY . /app

EXPOSE 5000

# Run the app with gunicorn using the factory pattern app:create_app()
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "app:create_app()"]
