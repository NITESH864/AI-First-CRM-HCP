import sys
import os

# Add current folder to path
sys.path.append(os.getcwd())

print("Attempting to import app.main...")
try:
    from app import main
    print("Success! app.main imported correctly.")
except Exception as e:
    print("\n!!! ERROR FOUND !!!")
    print(f"The error is: {e}")
    print("!!! Fix the error above and try running uvicorn again. !!!\n")