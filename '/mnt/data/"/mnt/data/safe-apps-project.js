import shutil
import os

# Define project directory
project_path = "/mnt/data/safe-apps-project"

# Check if the project directory exists and list its contents
project_exists = os.path.exists(project_path)
project_contents = os.listdir(project_path) if project_exists else []

project_exists, project_contents[:10]  # Show only the first 10 items for brevity
