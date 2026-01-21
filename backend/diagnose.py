import sys
import os

# Add current directory to path
sys.path.append(os.getcwd())

print("--- STARTING DIAGNOSTIC ---")
try:
    print("1. Looking for app folder...")
    if not os.path.exists("app"):
        print("FAIL: 'app' folder not found!")
        sys.exit(1)

    print("2. Looking for app/main.py...")
    if not os.path.exists("app/main.py"):
        print("FAIL: 'app/main.py' file not found!")
        sys.exit(1)

    print("3. Attempting to import app.main...")
    from app import main
    print("SUCCESS! The module imported correctly.")

except ImportError as e:
    print("\n!!! IMPORT ERROR DETECTED !!!")
    print(f"Error details: {e}")
    print("This usually means a library is missing or a file name is wrong.")

except SyntaxError as e:
    print("\n!!! SYNTAX ERROR DETECTED !!!")
    print(f"Error details: {e}")
    print(f"Check line {e.lineno} in {e.filename}")

except Exception as e:
    print("\n!!! UNKNOWN ERROR !!!")
    print(f"Error details: {e}")

print("--- END DIAGNOSTIC ---") 