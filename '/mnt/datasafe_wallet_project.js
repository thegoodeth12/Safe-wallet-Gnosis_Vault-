import os
import zipfile

# Define the folder structure and empty files to include
file_structure = [
    "backend/fix-structure.js",
    "backend/safe-proposals.js",
    "backend/slack-webhook-handler.js",
    "backend/config.js",
    ".github/workflows/run-fix-structure.yml",
    ".github/workflows/sync-safe-to-slack.yml",
    "scripts/setup-readme-update.ts"
]

# Create the directories and files in a temporary folder
base_dir = "/mnt/data/safe_wallet_project"
os.makedirs(base_dir, exist_ok=True)

for filepath in file_structure:
    full_path = os.path.join(base_dir, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write("// Placeholder for {}\n".format(os.path.basename(filepath)))

# Create a zip file of the project structure
zip_path = "/mnt/data/safe_wallet_project.zip"
with zipfile.ZipFile(zip_path, 'w') as zipf:
    for foldername, subfolders, filenames in os.walk(base_dir):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            arcname = os.path.relpath(file_path, base_dir)
            zipf.write(file_path, arcname=arcname)

zip_path
